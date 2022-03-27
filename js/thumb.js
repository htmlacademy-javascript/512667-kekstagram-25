import {
  createAllPhotosData,
} from './data.js';

const photosData = createAllPhotosData();

const picture = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;

const template = templateFragment.querySelector('.picture');

const fragment = document.createDocumentFragment();

photosData.forEach(({id, url, description, comments, likes}) => {
  const element = template.cloneNode(true);

  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  // element.querySelector('.picture__img').classList.add(`picture__img--${ id }`);
  element.querySelector('.picture__img').id = id;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;

  fragment.appendChild(element);
});

const createThumbs = () => picture.appendChild(fragment);

export {
  createThumbs,
  photosData,
};
