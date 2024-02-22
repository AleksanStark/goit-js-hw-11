import { S as a, i as c } from '../assets/vendor-5b791d57.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver(e => {
    for (const t of e)
      if (t.type === 'childList')
        for (const l of t.addedNodes)
          l.tagName === 'LINK' && l.rel === 'modulepreload' && n(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (t.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (t.credentials = 'omit')
        : (t.credentials = 'same-origin'),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = r(e);
    fetch(e.href, t);
  }
})();
const u = (i, s) => {
    const r = new a('.list-link');
    if (((s.innerHTML = ''), i.length === 0))
      return c.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    const n = i
      .map(
        e => `<li class="list-item">
            <a class="list-link" href="${e.largeImageURL}"><img class="list-img" src="${e.webformatURL}" data-original="${e.largeImageURL}" download></a>
            <ul class="list-statistic">
              <li>
                <span class="list-item-title">likes</span>
                <span class="list-item-number">${e.likes}</span>
              </li>
  
              <li>
                <span class="list-item-title">views</span>
                <span class="list-item-number">${e.views}</span>
              </li>
              <li>
                <span class="list-item-title">comments</span>
                <span class="list-item-number">${e.comments}</span>
              </li>
              <li>
                <span class="list-item-title">downloads</span>
                <span class="list-item-number">${e.downloads}</span>
              </li>
            </ul>
          </li>`
      )
      .join('');
    s.insertAdjacentHTML('beforeend', n), r.refresh();
  },
  o = document.querySelector('.form'),
  m = document.querySelector('.list');
o.addEventListener('submit', i => {
  i.preventDefault();
  const s = document.querySelector('.loader-container');
  return (
    (s.style.display = 'flex'),
    fetch(
      `https://pixabay.com/api/?key=42464755-f7d199d1a91f6070a7f813e04&image_type=photo&orientation=horizontal&q=${i.target.elements.search.value}&safesearch=true`
    )
      .then(r => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(r => {
        (o.search.value = ''), u(r.hits, m), (s.style.display = 'none');
      })
  );
});
//# sourceMappingURL=commonHelpers.js.map
