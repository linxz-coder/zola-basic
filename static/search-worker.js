let indexPromise;

async function loadIndex() {
  if (!indexPromise) {
    indexPromise = Promise.all([
      import('./search-engine.mjs?v=20261030'),
      fetch('/search-index/', { cache: 'no-cache', signal: AbortSignal.timeout(20000) }).then(response => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.json();
      }),
    ]).then(([engine, data]) => ({ engine, documents: engine.prepareIndex(data) }))
      .catch(error => { indexPromise = undefined; throw error; });
  }
  return indexPromise;
}

let latestId = 0;
self.onmessage = async ({ data }) => {
  latestId = data.id;
  try {
    const { engine, documents } = await loadIndex();
    if (data.id !== latestId) return;
    self.postMessage({ id: data.id, ...engine.search(documents, data.query) });
  } catch {
    if (data.id === latestId) self.postMessage({ id: data.id, error: true });
  }
};
