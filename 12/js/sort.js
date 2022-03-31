import {
  generateId,
} from './util.js';

import {
  renderThumbs,
  photosData,
} from './thumb.js';

const RANDOM_PHOTOS_COUNT = 10;

const randomIds = [];

for (let i = 0; i < RANDOM_PHOTOS_COUNT; i++) {
  randomIds[i] = generateId();
}

const clearThumbs = () => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((element) => {
    element.remove();
  });
};

const filterDefault = () => {
  clearThumbs();
  renderThumbs(photosData);
};

const getPhotoRank = (photo) => {
  const rank = photo.comments.length;

  return rank;
};

const comparePhotos = (photoA, photoB) => {
  const rankA = getPhotoRank(photoA);
  const rankB = getPhotoRank(photoB);

  return rankB - rankA;
};

const filterRandom = (value) => {
  clearThumbs();

  const picture = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < randomIds.length; i++) {
    for (let j = 0; j < value.length; j++) {

      if (randomIds[i] === j + 1) {
        const element = template.cloneNode(true);

        element.querySelector('.picture__img').src = value[j].url;
        element.querySelector('.picture__img').alt = value[j].description;
        element.querySelector('.picture__img').id = `picture-${ value[j].id + 1 }`;
        element.querySelector('.picture__comments').textContent = value[j].comments.length;
        element.querySelector('.picture__likes').textContent = value[j].likes;

        fragment.appendChild(element);
      }
    }
  }

  picture.appendChild(fragment);
};

const filterDiscussed = (value) => {
  clearThumbs();

  const picture = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  value
    .slice()
    .sort(comparePhotos)
    .forEach(({id, url, description, comments, likes}) => {
      const element = template.cloneNode(true);

      element.querySelector('.picture__img').src = url;
      element.querySelector('.picture__img').alt = description;
      element.querySelector('.picture__img').id = `picture-${ id + 1 }`;
      element.querySelector('.picture__comments').textContent = comments.length;
      element.querySelector('.picture__likes').textContent = likes;

      fragment.appendChild(element);
    });

  picture.appendChild(fragment);
};

export {
  clearThumbs,
  filterDefault,
  filterRandom,
  filterDiscussed,
};
