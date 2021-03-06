import { generateId, } from './util.js';
import { renderThumbs, } from './thumb.js';

const RANDOM_PHOTOS_COUNT = 10;
const randomIdArray = [];

while (randomIdArray.length < RANDOM_PHOTOS_COUNT) {
  randomIdArray.push(generateId());
}

const clearThumbs = () => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((element) => {
    element.remove();
  });
};

const renderFilterDefault = (photosData) => {
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

const renderFilterRandom = (values) => {
  clearThumbs();

  const picture = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  randomIdArray.forEach((randomId) => {
    values.forEach(({id, url, comments, likes}) => {
      if (randomId === id + 1) {
        const element = template.cloneNode(true);

        element.querySelector('.picture__img').src = url;
        element.querySelector('.picture__img').alt = `Фотография № ${ parseFloat(id) + 1 }`;
        element.querySelector('.picture__img').id = `picture-${ parseFloat(id) + 1 }`;
        element.querySelector('.picture__comments').textContent = comments.length;
        element.querySelector('.picture__likes').textContent = likes;

        fragment.appendChild(element);
      }
    });
  });

  picture.appendChild(fragment);
};

const renderFilterDiscussed = (values) => {
  clearThumbs();

  const picture = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  values
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

export { clearThumbs, renderFilterDefault, renderFilterRandom, renderFilterDiscussed, };
