const input = document.getElementById('search-bar-input');
const container = document.querySelector('.site-search');
const panel = document.getElementById('site-search-panel');
const status = document.getElementById('site-search-status');
const list = document.getElementById('site-search-results');
const retry = document.getElementById('site-search-retry');
const closeButton = document.getElementById('site-search-close');
const mobile = window.matchMedia('(max-width: 600px)');
let worker;
let requestId = 0;
let timer;
let composing = false;
let links = [];
let savedScroll = null;

function fitViewport() {
  if (panel.hidden || !mobile.matches) return;
  const viewport = window.visualViewport;
  container.style.setProperty('--search-viewport-height', `${viewport?.height || window.innerHeight}px`);
  container.style.setProperty('--search-viewport-top', `${viewport?.offsetTop || 0}px`);
}

function syncMobileLayout() {
  const expanded = !panel.hidden && mobile.matches;
  if (expanded && savedScroll === null) {
    savedScroll = window.scrollY;
    document.body.style.setProperty('--search-scroll-top', `${-savedScroll}px`);
    document.documentElement.classList.add('mobile-search-open');
  } else if (!expanded && savedScroll !== null) {
    const scroll = savedScroll;
    savedScroll = null;
    document.documentElement.classList.remove('mobile-search-open');
    document.body.style.removeProperty('--search-scroll-top');
    window.scrollTo(0, scroll);
  }
  container.setAttribute('role', expanded ? 'dialog' : 'search');
  if (expanded) container.setAttribute('aria-modal', 'true');
  else container.removeAttribute('aria-modal');
  fitViewport();
}

function show() {
  panel.hidden = false;
  container.classList.add('is-open');
  input.setAttribute('aria-expanded', 'true');
  syncMobileLayout();
}

function close() {
  if (mobile.matches && container.contains(document.activeElement)) document.activeElement.blur();
  panel.hidden = true;
  container.classList.remove('is-open');
  input.setAttribute('aria-expanded', 'false');
  syncMobileLayout();
}

// Use text nodes, including for article titles and snippets; indexed HTML is never executed.
function highlight(element, text, query) {
  const terms = query.trim().split(/\s+/).filter(Boolean).sort((a, b) => b.length - a.length);
  if (!terms.length) { element.textContent = text; return; }
  const pattern = new RegExp(terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'giu');
  let end = 0;
  for (const match of text.matchAll(pattern)) {
    element.append(document.createTextNode(text.slice(end, match.index)));
    const mark = document.createElement('mark');
    mark.textContent = match[0];
    element.append(mark);
    end = match.index + match[0].length;
  }
  element.append(document.createTextNode(text.slice(end)));
}

function clearResults() {
  list.replaceChildren();
  links = [];
  retry.hidden = true;
}

function failed() {
  clearResults();
  status.textContent = '搜索暂时无法加载，请重试。';
  retry.hidden = false;
}

function render(data) {
  if (data.id !== requestId) return;
  clearResults();
  if (data.error) { failed(); return; }
  if (!input.value.trim()) { status.textContent = '输入关键词，查找文章'; return; }
  status.textContent = data.total
    ? `找到 ${data.total} 篇${data.total > data.results.length ? `，显示前 ${data.results.length} 篇` : ''}`
    : '没有找到相关文章，换个关键词试试。';
  for (const result of data.results) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = result.url;
    const title = document.createElement('strong');
    highlight(title, result.title, input.value);
    const meta = document.createElement('span');
    meta.className = 'site-search-match';
    meta.textContent = result.match + '匹配';
    link.append(title, meta);
    if (result.heading) {
      const heading = document.createElement('span');
      heading.className = 'site-search-heading';
      highlight(heading, result.heading, input.value);
      link.append(heading);
    }
    const excerpt = document.createElement('span');
    excerpt.className = 'site-search-excerpt';
    highlight(excerpt, result.snippet, input.value);
    link.append(excerpt);
    li.append(link);
    list.append(li);
  }
  links = [...list.querySelectorAll('a')];
}

function run() {
  clearTimeout(timer);
  if (composing) return;
  const query = input.value.trim();
  if (!query) {
    clearResults();
    status.textContent = '输入关键词，查找文章';
    return;
  }
  status.textContent = '正在搜索…';
  try {
    if (!worker) {
      // No worker, engine, or index request occurs until the visitor actually searches.
      worker = new Worker('/search-worker.js?v=20261030-2');
      worker.onmessage = event => render(event.data);
      worker.onerror = () => { worker.terminate(); worker = undefined; failed(); };
    }
    worker.postMessage({ id: requestId, query });
  } catch { failed(); }
}

function changed() {
  requestId += 1; // Invalidate old responses immediately, including during IME composition.
  clearTimeout(timer);
  clearResults();
  show();
  if (!input.value.trim()) { status.textContent = '输入关键词，查找文章'; return; }
  status.textContent = '正在搜索…';
  if (!composing) timer = setTimeout(run, 120);
}

input.addEventListener('input', changed);
input.addEventListener('compositionstart', () => { composing = true; requestId += 1; clearTimeout(timer); });
input.addEventListener('compositionend', () => { composing = false; changed(); });
input.addEventListener('focus', show);
retry.addEventListener('click', () => { input.focus(); requestId += 1; run(); });
closeButton.addEventListener('click', close);
container.addEventListener('focusout', event => {
  // Safari touch taps blur the input with relatedTarget=null before firing click.
  // Keep the link in place; only a known outside focus target closes the panel.
  if (event.relatedTarget && !container.contains(event.relatedTarget)) close();
});
document.addEventListener('pointerdown', event => { if (!container.contains(event.target)) close(); });
window.visualViewport?.addEventListener('resize', fitViewport);
window.visualViewport?.addEventListener('scroll', fitViewport);
mobile.addEventListener('change', syncMobileLayout);
window.addEventListener('pageshow', event => { if (event.persisted) close(); });
container.addEventListener('keydown', event => {
  if (event.isComposing || composing) return;
  if (event.key === 'Tab' && mobile.matches && !panel.hidden) {
    const controls = [input, closeButton, ...links, ...(!retry.hidden ? [retry] : [])];
    const current = controls.indexOf(document.activeElement);
    if (event.shiftKey && current <= 0) { event.preventDefault(); controls.at(-1).focus(); }
    else if (!event.shiftKey && current === controls.length - 1) { event.preventDefault(); input.focus(); }
    return;
  }
  if (event.key === 'Escape') { event.preventDefault(); input.focus(); close(); return; }
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    show();
    if (!links.length) return;
    const current = links.indexOf(document.activeElement);
    const selected = event.key === 'ArrowDown' ? (current + 1) % links.length
      : current <= 0 ? links.length - 1 : current - 1;
    links[selected].focus();
  } else if (event.key === 'Enter' && event.target === input && links.length && !panel.hidden) {
    event.preventDefault();
    links[0].click();
  }
});
