import {
  createThumbs,
  photosData,
} from './thumb.js';

const COMMENTS_LOADING_STEP = 5;

createThumbs();

const pictures = document.querySelectorAll('.picture');

const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const addNewComments = () => {

  const socialComments = document.querySelectorAll('.social__comment');
  const commentsLength = socialComments.length;

  let commentsHiddenCounter = 0;
  let commentsShownCounter = 0;

  for (let i = 0; i < commentsLength; i++) {
    if (socialComments[i].classList.contains('hidden')) {
      socialComments[i].classList.remove('hidden');
      commentsHiddenCounter += 1;
    } else {
      commentsShownCounter += 1;
    }

    if (commentsHiddenCounter >= COMMENTS_LOADING_STEP) {
      break;
    }
  }

  commentsCounter.innerHTML = '';

  if (commentsLength > commentsHiddenCounter + commentsShownCounter) {
    commentsCounter.innerHTML = `
      ${ commentsHiddenCounter + commentsShownCounter } из
      <span class="comments-count">${ commentsLength }</span>
       комментариев
    `;
  } else {
    commentsCounter.innerHTML = `
      ${ commentsLength } из
      <span class="comments-count">${ commentsLength }</span>
       комментариев
    `;

    commentsLoader.classList.add('hidden');
  }
};

const renderPicture = (element) => {

  for (let i = 0; i < photosData.length; i++) {

    pictures[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      const commentsCount = photosData[i].comments.length;

      element.querySelector('.big-picture__img').children[0].src = photosData[i].url;
      element.querySelector('.big-picture__img').children[0].alt = photosData[i].description;
      element.querySelector('.social__caption').textContent = photosData[i].description;
      element.querySelector('.likes-count').textContent = photosData[i].likes;
      element.querySelector('.comments-count').textContent = commentsCount;

      element.querySelector('.social__comments').innerHTML = '';

      if (commentsCount - 1 < COMMENTS_LOADING_STEP) {
        element.querySelector('.social__comment-count').innerHTML = '';

        element.querySelector('.social__comment-count').innerHTML = `
        ${ commentsCount } из
          <span class="comments-count">${ commentsCount }</span>
          комментариев
        `;

        commentsLoader.classList.add('hidden');
      } else {
        commentsLoader.classList.remove('hidden');
      }

      for (let j = 0; j < commentsCount; j++) {
        let socialCommentString = '';

        if (j >= COMMENTS_LOADING_STEP) {
          socialCommentString = ' hidden';
        }

        element.querySelector('.social__comments').innerHTML += `
        <li class="social__comment${ socialCommentString }">
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

  commentsLoader.addEventListener('click', addNewComments);
};

const clearPicture = (element) => {

  element.querySelector('.big-picture__img').children[0].src = 'img/logo-background-3.jpg';
  element.querySelector('.big-picture__img').children[0].alt = 'Девушка в купальнике';
  element.querySelector('.social__caption').textContent = 'Тестим новую камеру! =)';
  element.querySelector('.likes-count').textContent = '356';

  element.querySelector('.social__comment-count').innerHTML = '';

  element.querySelector('.social__comment-count').innerHTML = `
    5 из
    <span class="comments-count">125</span>
     комментариев
  `;

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
