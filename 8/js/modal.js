import {
  renderPicture,
  clearPicture,
  addNewComments,
  commentsLoader,
  COMMENTS_LOADING_STEP,
} from './picture.js';

import {
  isEscapeKey,
} from './util.js';

const bodyElement = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');
const modalOpenElement = document.querySelector('.pictures');
const modalCloseElement = modalElement.querySelector('#picture-cancel');

renderPicture(modalElement);

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const addBodyClass = () => {
  bodyElement.classList.add('modal-open');
};

const removeBodyClass = () => {
  bodyElement.classList.remove('modal-open');
};

const openModal = () => {
  modalElement.classList.remove('hidden');
  addBodyClass();

  document.addEventListener('keydown', onModalEscKeydown);

  if (document.querySelector('.comments-count').textContent > COMMENTS_LOADING_STEP) {
    commentsLoader.addEventListener('click', addNewComments);
  }
};

function closeModal () {
  modalElement.classList.add('hidden');
  removeBodyClass();

  document.removeEventListener('keydown', onModalEscKeydown);

  if (document.querySelector('.comments-count').textContent > COMMENTS_LOADING_STEP) {
    commentsLoader.removeEventListener('click', addNewComments);
  }
}

modalOpenElement.addEventListener('click', (evt) => {
  if (evt.target.className === 'picture__img') {
    openModal();
  }
});

modalCloseElement.addEventListener('click', () => {
  clearPicture(modalElement);
  closeModal();
});

export {
  addBodyClass,
  removeBodyClass,
};
