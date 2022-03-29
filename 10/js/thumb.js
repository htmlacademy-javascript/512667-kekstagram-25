let photosData = [];

const renderThumbs = (value) => {
  const picture = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  value.forEach(({id, url, description, comments, likes}) => {
    const element = template.cloneNode(true);

    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__img').id = `picture-${ id }`;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;

    fragment.appendChild(element);
  });

  picture.appendChild(fragment);
};

const getPhotosData = (value) => {
  photosData = value;
};

export {
  getPhotosData,
  renderThumbs,
  photosData,
};
