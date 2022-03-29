import {
  getPhotosData,
  renderThumbs,
} from './thumb.js';

const createLoader = () => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      getPhotosData(photos);
      renderThumbs(photos);
    })
    .catch((err) => {
      document.querySelector('body').classList.add('overlay');
      document.querySelector('body').style.textAlign = 'center';
      document.querySelector('body').textContent = err.message;
      document.querySelector('body').textContent += ' - То есть, что-то пошло не так!';
    });
};

export {
  createLoader,
};
