import {
  photosData,
} from './thumb.js';

const bodyTag = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureAlt = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');

const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

commentsCounter.classList.add('hidden');
commentsLoader.classList.add('hidden');

window.addEventListener('keydown', (evt) => {
  evt.preventDefault();

  if (evt.keyCode === 27) {
    if (bodyTag.classList.contains('modal-open')) {
      bodyTag.classList.remove('modal-open');
    }

    if (!bigPicture.classList.contains('hidden')) {
      bigPicture.classList.add('hidden');
    }
  }
});

bigPictureCancel.addEventListener('click', () => {
  bodyTag.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
});

const pictures = document.querySelectorAll('.picture');

for (let i = 0; i < photosData.length; i++) {
  pictures[i].addEventListener('click', (evt) => {
    evt.preventDefault();

    bodyTag.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    bigPictureImg.children[0].src = photosData[i].url;
    bigPictureImg.children[0].alt = photosData[i].description;
    bigPictureAlt.textContent = photosData[i].description;
    bigPictureLikes.textContent = photosData[i].likes;
    bigPictureCommentsCount.textContent = photosData[i].comments.length;

    bigPictureComments.innerHTML = '';

    for (let j = 0; j < photosData[i].comments.length; j++) {
      bigPictureComments.innerHTML += `
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
