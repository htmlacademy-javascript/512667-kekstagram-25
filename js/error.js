import {
  bodyElement,
} from './modal.js';

import {
  isEscapeKey,
} from './util.js';

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    clearError();
  }
};

const onErrorClickButton = (evt) => {
  evt.preventDefault();

  if (evt.target.className === 'error' || evt.target.className === 'error__button') {
    clearError();
  }
};

function clearError () {
  bodyElement.removeEventListener('keydown', onErrorEscKeydown);
  bodyElement.removeEventListener('click', onErrorClickButton);

  const errorElement = bodyElement.querySelector('.error');
  errorElement.remove();
}

const openError = () => {
  bodyElement.addEventListener('keydown', onErrorEscKeydown);
  bodyElement.addEventListener('click', onErrorClickButton);
};

const showError = () => {
  const templateFragment = document.querySelector('#error').content;
  const template = templateFragment.querySelector('.error');
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);

  fragment.appendChild(element);

  bodyElement.appendChild(fragment);

  openError();
};

export {
  showError,
};
