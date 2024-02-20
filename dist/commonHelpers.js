import { i as c, S as u } from '../assets/vendor-5b791d57.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) i(t);
  new MutationObserver(t => {
    for (const e of t)
      if (e.type === 'childList')
        for (const n of e.addedNodes)
          n.tagName === 'LINK' && n.rel === 'modulepreload' && i(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(t) {
    const e = {};
    return (
      t.integrity && (e.integrity = t.integrity),
      t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (e.credentials = 'include')
        : t.crossOrigin === 'anonymous'
        ? (e.credentials = 'omit')
        : (e.credentials = 'same-origin'),
      e
    );
  }
  function i(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = l(t);
    fetch(t.href, e);
  }
})();
const a = document.querySelector('.form'),
  o = document.querySelector('.list');
a.addEventListener(
  'submit',
  r => (
    r.preventDefault(),
    fetch(
      `https://pixabay.com/api/?key=42464755-f7d199d1a91f6070a7f813e04&image_type=photo&orientation=horizontal&q=${r.target.elements.search.value}&safesearch=true`
    )
      .then(s => {
        if (!s.ok) throw new Error(s.status);
        return s.json();
      })
      .then(s => {
        if (((o.innerHTML = ''), (a.search.value = ''), s.hits.length === 0))
          return c.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        const l = s.hits
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
        o.insertAdjacentHTML('beforeend', l);
        const i = r.target.getAttribute('data-original');
        new u('.list-link')
          .refresh()
          .create(`<img src="${i}" width="100%" height="100%"/>`)
          .show();
      })
  )
);
//# sourceMappingURL=commonHelpers.js.map
