import { renderMarkup } from './render-functions';
const form = document.querySelector('.form');
const listImages = document.querySelector('.list');
form.addEventListener('submit', event => {
  event.preventDefault();
  const loader = document.querySelector('.loader-container');
  loader.style.display = 'flex';
  return fetch(
    `https://pixabay.com/api/?key=42464755-f7d199d1a91f6070a7f813e04&image_type=photo&orientation=horizontal&q=${event.target.elements.search.value}&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(images => {
      form.search.value = '';
      renderMarkup(images.hits, listImages);
      loader.style.display = 'none';
    });
});
