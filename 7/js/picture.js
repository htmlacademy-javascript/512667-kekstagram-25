import {
  createThumbs,
  photosData,
} from './thumb.js';

createThumbs();

const pictures = document.querySelectorAll('.picture');

const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

commentsCounter.classList.add('hidden');
commentsLoader.classList.add('hidden');

const renderPicture = (element) => {

  for (let i = 0; i < photosData.length; i++) {

    pictures[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      element.querySelector('.big-picture__img').children[0].src = photosData[i].url;
      element.querySelector('.big-picture__img').children[0].alt = photosData[i].description;
      element.querySelector('.social__caption').textContent = photosData[i].description;
      element.querySelector('.likes-count').textContent = photosData[i].likes;
      element.querySelector('.comments-count').textContent = photosData[i].comments.length;

      element.querySelector('.social__comments').innerHTML = '';

      for (let j = 0; j < photosData[i].comments.length; j++) {
        element.querySelector('.social__comments').innerHTML += `
        <li class="social__comment">
          <img
              class="social__picture"
              src="${ photosData[i].comments[j].avatar }"
              alt="${ photosData[i].comments[j].name }"
              width="35" height="35">
          <p class="social__text">${ photosData[i].comments[j].message }</p>
        </li>
        `;
      }
    });

  }

};

const clearPicture = (element) => {

  element.querySelector('.big-picture__img').children[0].src = 'img/logo-background-3.jpg';
  element.querySelector('.big-picture__img').children[0].alt = 'Девушка в купальнике';
  element.querySelector('.social__caption').textContent = 'Тестим новую камеру! =)';
  element.querySelector('.likes-count').textContent = '356';
  element.querySelector('.comments-count').textContent = '125';

  element.querySelector('.social__comments').innerHTML = '';

  element.querySelector('.social__comments').innerHTML += `
  <li class="social__comment">
    <img
        class="social__picture"
        src="img/avatar-4.svg"
        alt="Аватар комментатора фотографии"
        width="35" height="35">
    <p class="social__text">Мега фото! Просто обалдеть. Как вам так удалось?</p>
  </li>
  `;

  element.querySelector('.social__comments').innerHTML += `
  <li class="social__comment">
    <img
        class="social__picture"
        src="img/avatar-3.svg"
        alt="Аватар комментатора фотографии"
        width="35" height="35">
    <p class="social__text">Да это фоташоп!!!!!!!!</p>
  </li>
  `;

};

export {
  renderPicture,
  clearPicture,
};
