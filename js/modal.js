import {
  renderPicture,
  clearPicture,
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

const openModal = () => {
  modalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
};

function closeModal () {
  modalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
}

modalOpenElement.addEventListener('click', () => {
  openModal();
});

modalCloseElement.addEventListener('click', () => {
  clearPicture(modalElement);
  closeModal();
});
