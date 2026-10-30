const input = document.getElementById('search-bar-input');
const container = document.querySelector('.site-search');
const panel = document.getElementById('site-search-panel');
const status = document.getElementById('site-search-status');
const list = document.getElementById('site-search-results');
const retry = document.getElementById('site-search-retry');
let worker;
let requestId = 0;
let timer;
let composing = false;
let links = [];

function show() {
  panel.hidden = false;
  input.setAttribute('aria-expanded', 'true');
}

function close() {
  panel.hidden = true;
  input.setAttribute('aria-expanded', 'false');
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
      worker = new Worker('/search-worker.js?v=20261030');
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
container.addEventListener('focusout', event => { if (!container.contains(event.relatedTarget)) close(); });
document.addEventListener('pointerdown', event => { if (!container.contains(event.target)) close(); });
container.addEventListener('keydown', event => {
  if (event.isComposing || composing) return;
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
