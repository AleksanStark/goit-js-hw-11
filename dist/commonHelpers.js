import { S as u, i as m } from '../assets/vendor-5b791d57.js';
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver(e => {
    for (const s of e)
      if (s.type === 'childList')
        for (const n of s.addedNodes)
          n.tagName === 'LINK' && n.rel === 'modulepreload' && r(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(e) {
    const s = {};
    return (
      e.integrity && (s.integrity = e.integrity),
      e.referrerPolicy && (s.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const s = l(e);
    fetch(e.href, s);
  }
})();
const p = i =>
    fetch(
      `https://pixabay.com/api/?key=42464755-f7d199d1a91f6070a7f813e04&image_type=photo&orientation=horizontal&q=${i}&safesearch=true`
    ),
  d = new u('.list-link'),
  f = (i, t) => {
    const l = i
      .map(
        r => `<li class="list-item">
            <a class="list-link" href="${r.largeImageURL}"><img class="list-img" src="${r.webformatURL}" data-original="${r.largeImageURL}" download></a>
            <ul class="list-statistic">
              <li>
                <span class="list-item-title">likes</span>
                <span class="list-item-number">${r.likes}</span>
              </li>
  
              <li>
                <span class="list-item-title">views</span>
                <span class="list-item-number">${r.views}</span>
              </li>
              <li>
                <span class="list-item-title">comments</span>
                <span class="list-item-number">${r.comments}</span>
              </li>
              <li>
                <span class="list-item-title">downloads</span>
                <span class="list-item-number">${r.downloads}</span>
              </li>
            </ul>
          </li>`
      )
      .join('');
    t.insertAdjacentHTML('beforeend', l), d.refresh();
  },
  o = document.querySelector('.form'),
  a = document.querySelector('.list'),
  c = document.querySelector('.loader-container');
o.addEventListener('submit', i => {
  i.preventDefault(),
    (c.style.display = 'flex'),
    p(i.target.elements.search.value)
      .then(t => {
        if (t.ok) return t.json();
        throw new Error(t.status);
      })
      .then(t => {
        t.hits.length === 0 &&
          m.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          }),
          (o.search.value = ''),
          (a.innerHTML = ''),
          f(t.hits, a),
          (c.style.display = 'none');
      });
});
//# sourceMappingURL=commonHelpers.js.map
