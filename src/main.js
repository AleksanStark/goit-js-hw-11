import './js/pixaday-api.js';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { renderMarkup } from './js/render-functions.js';
import { fetchPosts } from './js/pixaday-api.js';
const form = document.querySelector('.form');
const listImages = document.querySelector('.list');
const loader = document.querySelector('.loader-container');

form.addEventListener('submit', event => {
  event.preventDefault();
  loader.style.display = 'flex';
  fetchPosts(event.target.elements.search.value)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .then(images => {
      if (images.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      form.search.value = '';
      listImages.innerHTML = '';
      renderMarkup(images.hits, listImages);
      loader.style.display = 'none';
    });
});
