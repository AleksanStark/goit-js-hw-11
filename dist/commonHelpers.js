import { i as c, S as u } from '../assets/vendor-5b791d57.js';
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) o(e);
  new MutationObserver(e => {
    for (const t of e)
      if (t.type === 'childList')
        for (const s of t.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && o(s);
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
  function o(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = r(e);
    fetch(e.href, t);
  }
})();
const n = document.querySelector('.form'),
  a = document.querySelector('.list');
n.addEventListener('submit', l => {
  l.preventDefault();
  const i = document.querySelector('.loader-container');
  (i.style.display = 'flex'),
    setTimeout(() => (i.style.display = 'none'), 3e3),
    setTimeout(
      () =>
        fetch(
          `https://pixabay.com/api/?key=42464755-f7d199d1a91f6070a7f813e04&image_type=photo&orientation=horizontal&q=${l.target.elements.search.value}&safesearch=true`
        )
          .then(r => {
            if (!r.ok) throw new Error(r.status);
            return r.json();
          })
          .then(r => {
            if (
              ((a.innerHTML = ''), (n.search.value = ''), r.hits.length === 0)
            )
              return c.error({
                message:
                  'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
              });
            const o = r.hits
              .map(
                s => `<li class="list-item">
          <a class="list-link" href="${s.largeImageURL}"><img class="list-img" src="${s.webformatURL}" data-original="${s.largeImageURL}" download></a>
          <ul class="list-statistic">
            <li>
              <span class="list-item-title">likes</span>
              <span class="list-item-number">${s.likes}</span>
            </li>

            <li>
              <span class="list-item-title">views</span>
              <span class="list-item-number">${s.views}</span>
            </li>
            <li>
              <span class="list-item-title">comments</span>
              <span class="list-item-number">${s.comments}</span>
            </li>
            <li>
              <span class="list-item-title">downloads</span>
              <span class="list-item-number">${s.downloads}</span>
            </li>
          </ul>
        </li>`
              )
              .join('');
            a.insertAdjacentHTML('beforeend', o);
            const e = l.target.getAttribute('data-original');
            new u('.list-link')
              .refresh()
              .create(`<img src="${e}" width="100%" height="100%"/>`)
              .show();
          }),
      2e3
    );
});
//# sourceMappingURL=commonHelpers.js.map
