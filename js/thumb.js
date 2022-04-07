let photosData = [];

const renderThumbs = (values) => {
  const picture = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  values.forEach(({id, url, comments, likes}) => {
    const element = template.cloneNode(true);

    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = `Фотография № ${ parseFloat(id) + 1 }`;
    element.querySelector('.picture__img').id = `picture-${ parseFloat(id) + 1 }`;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;

    fragment.appendChild(element);
  });

  picture.appendChild(fragment);
};

const getPhotosData = (values) => {
  photosData = values;
};

export { photosData, getPhotosData, renderThumbs, };
