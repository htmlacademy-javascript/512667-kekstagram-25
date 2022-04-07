import { COMMENTS_LOADING_STEP, renderPicture, onCommentsLoaderClickButton, commentsLoader, } from './picture.js';
import { isEscapeKey, } from './util.js';

const bodyElement = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');
const modalOpenElement = document.querySelector('.pictures');
const modalCloseElement = modalElement.querySelector('#picture-cancel');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    onModalCloseClickButton();
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
  modalCloseElement.addEventListener('click', onModalCloseClickButton);

  if (document.querySelector('.comments-count').textContent > COMMENTS_LOADING_STEP) {
    commentsLoader.addEventListener('click', onCommentsLoaderClickButton);
  }
};

function onModalCloseClickButton () {
  modalElement.classList.add('hidden');
  removeBodyClass();

  modalCloseElement.removeEventListener('click', onModalCloseClickButton);
  document.removeEventListener('keydown', onModalEscKeydown);

  if (document.querySelector('.comments-count').textContent > COMMENTS_LOADING_STEP) {
    commentsLoader.removeEventListener('click', onCommentsLoaderClickButton);
  }
}

const onModalOpenClickButton = (evt) => {
  if (evt.target.className.match('picture__img')) {
    evt.preventDefault();

    const targetId = evt.target.id;
    const pictureId = parseFloat(targetId.slice('picture-'.length)).toFixed(0) - 1;
    renderPicture(modalElement, pictureId);

    openModal();
  }
};

const showModal = () => {
  modalOpenElement.addEventListener('click', onModalOpenClickButton);
};

const hideModal = () => {
  modalOpenElement.removeEventListener('click', onModalOpenClickButton);
};

export { bodyElement, addBodyClass, removeBodyClass, showModal, hideModal, };
