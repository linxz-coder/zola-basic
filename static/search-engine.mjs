// Pure functions shared by the search worker and the regression tests.
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

export function plainText(value = '') {
  return String(value).replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (match, entity) => {
    if (entity[0] !== '#') return entities[entity.toLowerCase()] ?? match;
    const number = entity[1].toLowerCase() === 'x'
      ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : match;
  }).replace(/\s+/g, ' ').trim();
}

export function normalize(value) {
  return String(value).normalize('NFKC').toLowerCase();
}

export function queryTerms(query) {
  return [...new Set(normalize(query).trim().split(/\s+/).filter(Boolean))].slice(0, 12);
}

function flattenHeadings(headings = []) {
  return headings.flatMap(heading => [{
    title: plainText(heading.title), id: heading.id,
    text: normalize(plainText(heading.title)),
  }, ...flattenHeadings(heading.children)]);
}

export function prepareIndex(data) {
  if (data.version !== 1 || !data.root) throw new Error('Unsupported search index');
  const documents = new Map();
  function add(entry) {
    if (!entry || !entry.title || !entry.url?.startsWith('/') || entry.url.startsWith('//')) return;
    const title = plainText(entry.title);
    const body = plainText(entry.body);
    const headings = flattenHeadings(entry.headings);
    documents.set(entry.url, {
      title, body, headings, url: entry.url, date: entry.date || '',
      titleText: normalize(title), bodyText: normalize(body),
      headingText: headings.map(item => item.text).join('\n'),
    });
  }
  function visit(section) {
    add(section.entry);
    (section.pages || []).forEach(add);
    (section.sections || []).forEach(visit);
  }
  visit(data.root);
  return [...documents.values()];
}

function snippet(text, terms, length = 90) {
  const normalized = normalize(text);
  const positions = terms.map(term => normalized.indexOf(term)).filter(position => position >= 0);
  const first = positions.length ? Math.min(...positions) : 0;
  const start = Math.max(0, first - 18);
  return (start ? '…' : '') + text.slice(start, start + length) + (start + length < text.length ? '…' : '');
}

export function search(documents, query, limit = 20, offset = 0) {
  const terms = queryTerms(query);
  if (!terms.length) return { total: 0, results: [] };
  const phrase = normalize(query).trim().replace(/\s+/g, ' ');
  const matches = [];
  for (const doc of documents) {
    // AND across space-separated keywords; each keyword can occur in a different field.
    const levels = terms.map(term => doc.titleText.includes(term) ? 0
      : doc.headingText.includes(term) ? 1 : doc.bodyText.includes(term) ? 2 : 3);
    if (levels.includes(3)) continue;
    // A title-only match always outranks headings, which always outrank body matches.
    const tier = Math.max(...levels);
    const heading = [...doc.headings].sort((a, b) =>
      terms.filter(term => b.text.includes(term)).length - terms.filter(term => a.text.includes(term)).length
    ).find(item => terms.some(term => item.text.includes(term)));
    const phraseMatch = tier === 0 ? doc.titleText.includes(phrase)
      : tier === 1 ? !!heading?.text.includes(phrase) : doc.bodyText.includes(phrase);
    matches.push({ doc, tier, heading, phraseMatch, cost: levels.reduce((sum, n) => sum + n, 0) });
  }
  matches.sort((a, b) => a.tier - b.tier
    || Number(b.phraseMatch) - Number(a.phraseMatch)
    || a.cost - b.cost
    || b.doc.date.localeCompare(a.doc.date)
    || a.doc.url.localeCompare(b.doc.url));
  return {
    total: matches.length,
    results: matches.slice(offset, offset + limit).map(({ doc, tier, heading }) => ({
      title: doc.title,
      url: doc.url + (tier === 1 && heading?.id ? '#' + encodeURIComponent(heading.id) : ''),
      heading: tier === 1 ? heading?.title || '' : '',
      snippet: snippet(doc.body, terms),
      match: ['标题', '小标题', '正文'][tier],
    })),
  };
}
