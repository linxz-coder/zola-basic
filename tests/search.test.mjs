import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { prepareIndex, search, plainText } from '../static/search-engine.mjs';

const entry = (title, body, headings = [], url = '/' + title + '/') => ({ title, body, headings, url });
const index = pages => prepareIndex({ version: 1, root: { pages } });
const heading = (title, id, children = []) => ({ title, id, children });

test('title matches always precede headings and body, regardless of body repetition', () => {
  const docs = index([
    entry('正文文章', '学习'.repeat(1000)),
    entry('章节文章', '学习方法', [heading('学习方法', 'learn')]),
    entry('学习笔记', '内容'),
  ]);
  assert.deepEqual(search(docs, '学习').results.map(r => r.match), ['标题', '小标题', '正文']);
});

test('nested heading matches link to the actual heading anchor', () => {
  const docs = index([entry('技术笔记', '', [heading('开始', 'start', [heading('安装 Docker', 'an-zhuang-docker')])])]);
  const result = search(docs, 'docker').results[0];
  assert.equal(result.heading, '安装 Docker');
  assert.match(result.url, /#an-zhuang-docker$/);
});

test('Chinese keywords and case/width-insensitive English match; punctuation is literal', () => {
  const docs = index([entry('AI 与胡适', 'C++ 和 a.b')]);
  for (const query of ['胡适', 'ai', 'ＡＩ', 'C++', 'a.b']) assert.equal(search(docs, query).total, 1);
  assert.equal(search(docs, 'aXb').total, 0);
});

test('space-separated keywords require all terms, including across fields', () => {
  const docs = index([entry('胡适的母亲', '学习'), entry('胡适', '其他'), entry('学习', '母亲')]);
  assert.equal(search(docs, '胡适 学习').total, 1);
  assert.equal(search(docs, '胡适 学习').results[0].match, '正文');
  assert.equal(search(docs, '胡适 不存在').total, 0);
});

test('empty queries, no matches, result limits and snippets are handled', () => {
  const docs = index(Array.from({ length: 30 }, (_, n) => entry('文章' + n, '前言'.repeat(300) + '检索命中' + '后文'.repeat(300))));
  assert.equal(search(docs, '   ').total, 0);
  assert.equal(search(docs, '不存在').total, 0);
  const result = search(docs, '检索命中');
  assert.equal(result.total, 30);
  assert.equal(result.results.length, 20);
  assert.match(result.results[0].snippet, /检索命中/);
  assert.ok(result.results[0].snippet.length <= 152);
});

test('index handles nested sections and deduplicates pages; external URLs are rejected', () => {
  const doc = entry('文章', '内容');
  const docs = prepareIndex({ version: 1, root: { pages: [doc, null, entry('外链', '', [], '//evil.test/')], sections: [{ pages: [doc] }, {}] } });
  assert.equal(docs.length, 1);
  assert.equal(plainText('A &amp; B &#x4e2d;&#25991; &lt;x&gt;'), 'A & B 中文 <x>');
});

test('the real Zola index contains published content and valid page/heading URLs', { skip: !process.env.ZOLA_SEARCH_DIR }, () => {
  const root = process.env.ZOLA_SEARCH_DIR;
  const data = JSON.parse(fs.readFileSync(path.join(root, 'search-index/index.html'), 'utf8'));
  const docs = prepareIndex(data);
  assert.ok(docs.length >= 780, `Only ${docs.length} documents indexed`);
  assert.ok(!docs.some(doc => doc.url === '/search-index/'));
  assert.match(search(docs, '胡适').results[0].title, /胡适的母亲/);
  assert.ok(docs.some(doc => doc.url.startsWith('/shorts/')));
  assert.ok(docs.some(doc => doc.url.startsWith('/books/')));
  for (const doc of docs) {
    const file = path.join(root, decodeURIComponent(doc.url), 'index.html');
    const html = fs.readFileSync(file, 'utf8');
    for (const h of doc.headings) assert.ok(html.includes(`id="${h.id}"`), `${doc.url} missing #${h.id}`);
  }
});
