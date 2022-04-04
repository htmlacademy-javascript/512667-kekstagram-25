import { COMMENTS_LOADING_STEP, renderPicture, clearPicture, addNewComments, commentsLoader, } from './picture.js';
import { isEscapeKey, } from './util.js';

const bodyElement = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');
const modalOpenElement = document.querySelector('.pictures');
const modalCloseElement = modalElement.querySelector('#picture-cancel');

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
  modalCloseElement.addEventListener('click', closeModal);

  if (document.querySelector('.comments-count').textContent > COMMENTS_LOADING_STEP) {
    commentsLoader.addEventListener('click', addNewComments);
  }
};

function closeModal () {
  modalElement.classList.add('hidden');
  removeBodyClass();

  clearPicture(modalElement);
  modalCloseElement.removeEventListener('click', closeModal);

  document.removeEventListener('keydown', onModalEscKeydown);

  if (document.querySelector('.comments-count').textContent > COMMENTS_LOADING_STEP) {
    commentsLoader.removeEventListener('click', addNewComments);
  }
}

const openModalElement = (evt) => {
  if (evt.target.className.match('picture__img')) {
    evt.preventDefault();

    const targetId = evt.target.id;
    const pictureId = parseFloat(targetId.slice('picture-'.length)).toFixed(0) - 1;
    renderPicture(modalElement, pictureId);

    openModal();
  }
};

const showModal = () => {
  modalOpenElement.addEventListener('click', openModalElement);
};

const hideModal = () => {
  modalOpenElement.removeEventListener('click', openModalElement);
};

export { bodyElement, addBodyClass, removeBodyClass, showModal, hideModal, };
