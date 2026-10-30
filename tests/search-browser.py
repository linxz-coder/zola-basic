"""Optional touch/browser regression check. Install Python Playwright + chromium/webkit.
Run against a Zola preview: python3 tests/search-browser.py --url http://127.0.0.1:18766/
"""
import argparse
import re
from pathlib import Path
from urllib.parse import urljoin
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:18766/')
parser.add_argument('--screenshots', default='/tmp/zola-search-mobile-qa')
args = parser.parse_args()
Path(args.screenshots).mkdir(parents=True, exist_ok=True)

def verify_batches(page, touch=False):
    field = page.get_by_role('searchbox')
    field.fill('学习')
    page.wait_for_function("document.querySelectorAll('#site-search-results a').length === 20")
    total = int(re.search(r'找到 (\d+) 篇', page.locator('#site-search-status').inner_text()).group(1))
    assert total > 40
    panel = page.locator('#site-search-panel')
    more = page.get_by_role('button', name='加载更多', exact=True)
    page.evaluate("window.firstSearchResult = document.querySelector('#site-search-results a')")
    count = 20
    while count < total:
        more.scroll_into_view_if_needed()
        before = panel.evaluate('(el) => el.scrollTop')
        more.tap() if touch else more.click()
        count = min(count + 20, total)
        page.wait_for_function("n => document.querySelectorAll('#site-search-results a').length === n", arg=count)
        page.wait_for_timeout(60)
        assert abs(panel.evaluate('(el) => el.scrollTop') - before) <= 1
        assert page.evaluate("window.firstSearchResult === document.querySelector('#site-search-results a')")
    urls = page.locator('#site-search-results a').evaluate_all('(links) => links.map(link => link.href)')
    assert len(urls) == len(set(urls)) == total
    assert more.is_hidden()
    assert page.locator('#site-search-end').inner_text() == f'已显示全部 {total} 篇'
    # A changed query starts over. Double-clicking cannot append the same batch twice.
    field.fill('AI')
    page.wait_for_function("document.querySelectorAll('#site-search-results a').length === 20")
    assert panel.evaluate('(el) => el.scrollTop') == 0
    page.evaluate("document.getElementById('site-search-more').click(); document.getElementById('site-search-more').click()")
    page.wait_for_function("document.querySelectorAll('#site-search-results a').length === 40")
    page.wait_for_timeout(100)
    assert page.locator('#site-search-results a').count() == 40
    # An in-flight next batch must not contaminate a different query.
    page.evaluate("""() => {
      document.getElementById('site-search-more').click();
      const input = document.getElementById('search-bar-input');
      input.value = '胡适'; input.dispatchEvent(new Event('input', {bubbles:true}));
    }""")
    page.wait_for_function("document.getElementById('site-search-status').textContent.includes('找到 1 篇')")
    assert page.locator('#site-search-results a').count() == 1
    assert more.is_hidden()
    field.fill('学习')
    page.wait_for_function("document.querySelectorAll('#site-search-results a').length === 20")


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
        verify_batches(page, touch=True)
        assert sum('search-index/' in url for url in requests) == 1
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
        print(f'{browser_type.name}: batching/scroll/deduplication/query reset, lazy load, single-tap article/anchor navigation, compact rows, cancel/scroll restoration, small viewport passed', flush=True)
        browser.close()

    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 900})
    page.goto(args.url)
    field = page.get_by_role('searchbox')
    verify_batches(page)
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
