"""Optional touch/browser regression check. Install Python Playwright + chromium/webkit.
Run against a Zola preview: python3 tests/search-browser.py --url http://127.0.0.1:18766/
"""
import argparse
from pathlib import Path
from urllib.parse import urljoin
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:18766/')
parser.add_argument('--screenshots', default='/tmp/zola-search-mobile-qa')
args = parser.parse_args()
Path(args.screenshots).mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    for browser_type in [p.webkit, p.chromium]:
        browser = browser_type.launch(headless=True)
        context = browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
        requests, errors = [], []
        context.on('request', lambda request: requests.append(request.url))
        page = context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(args.url, wait_until='networkidle')
        assert not any('search-index/' in url or 'search-worker.js' in url for url in requests)
        field = page.get_by_role('searchbox', name='搜索文章')
        field.tap()
        assert page.get_by_role('dialog', name='站内搜索').is_visible()
        assert page.get_by_role('button', name='关闭搜索').is_visible()
        assert not any('search-index/' in url for url in requests)
        field.fill('学习')
        page.locator('#site-search-results a').first.wait_for()
        panel = page.locator('#site-search-panel')
        rect = panel.bounding_box()
        assert rect['x'] == 0 and rect['width'] == 390
        assert rect['y'] + rect['height'] <= 845, rect
        assert page.locator('#site-search-results strong').first.bounding_box()['height'] <= 49
        assert page.locator('.site-search-excerpt').first.bounding_box()['height'] <= 41
        assert page.locator('#site-search-results a').first.bounding_box()['height'] <= 120
        page.screenshot(path=str(Path(args.screenshots) / f'{browser_type.name}-mobile.png'))
        # On Safari the input blurs with relatedTarget=null before the touch click.
        # This must navigate with one tap, including when the tap lands on a text span.
        target = page.locator('#site-search-results a').first.get_attribute('href')
        page.locator('#site-search-results .site-search-excerpt').first.tap()
        page.wait_for_url(urljoin(args.url, target))
        assert page.locator('h1.title').count() == 1
        page.go_back(wait_until='domcontentloaded')
        # Cancel/reopen and keyboard-reduced viewport must retain a usable results scroller.
        field = page.get_by_role('searchbox', name='搜索文章')
        field.tap()
        field.fill('安装docker')
        page.locator('.site-search-heading').first.wait_for()
        target = page.locator('#site-search-results a').first.get_attribute('href')
        assert '#an-zhuang-docker' in target
        page.locator('#site-search-results a').first.tap()
        page.wait_for_url(urljoin(args.url, target))
        assert page.locator('#an-zhuang-docker').count() == 1
        page.goto(args.url, wait_until='domcontentloaded')
        page.evaluate('window.scrollTo(0, 180)')
        # Programmatic focus must not scroll the field into view before opening the overlay.
        page.evaluate("document.getElementById('search-bar-input').focus({preventScroll: true})")
        page.get_by_role('button', name='关闭搜索').tap()
        assert page.locator('#site-search-panel').is_hidden()
        assert page.evaluate('window.scrollY') == 180
        assert not page.locator('html').get_attribute('class')
        field = page.get_by_role('searchbox')
        field.tap()
        field.fill('学习')
        page.locator('#site-search-results a').first.wait_for()
        page.set_viewport_size({'width': 390, 'height': 380})
        page.wait_for_timeout(200)
        assert page.locator('.site-search').bounding_box()['height'] <= 381
        assert page.locator('#site-search-panel').bounding_box()['height'] > 200
        page.screenshot(path=str(Path(args.screenshots) / f'{browser_type.name}-small-viewport.png'))
        page.locator('#site-search-panel').evaluate('(el) => el.scrollTop = 350')
        page.get_by_role('button', name='关闭搜索').tap()
        assert page.locator('#site-search-panel').is_hidden()
        assert not errors, errors
        print(f'{browser_type.name}: lazy load, single-tap article/anchor navigation, compact rows, cancel/scroll restoration, small viewport passed', flush=True)
        browser.close()

    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 900})
    page.goto(args.url)
    field = page.get_by_role('searchbox')
    field.fill('胡适')
    page.locator('#site-search-results a').first.wait_for()
    assert page.get_by_role('button', name='关闭搜索').is_hidden()
    field.press('ArrowDown')
    assert page.evaluate("document.activeElement.matches('#site-search-results a')")
    page.keyboard.press('Escape')
    assert page.locator('#site-search-panel').is_hidden()
    field.fill('学习')
    page.locator('#site-search-results a').first.wait_for()
    page.locator('nav').click(position={'x': 1100, 'y': 10})
    assert page.locator('#site-search-panel').is_hidden()
    print('desktop: keyboard selection, Escape and outside-click dismissal passed', flush=True)
    browser.close()
