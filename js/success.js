import { bodyElement, } from './modal.js';
import { isEscapeKey, } from './util.js';

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    clearSuccess();
  }
};

const onSuccessClickButton = (evt) => {
  evt.preventDefault();

  if (evt.target.className === 'success' || evt.target.className === 'success__button') {
    clearSuccess();
  }
};

function clearSuccess () {
  bodyElement.removeEventListener('keydown', onSuccessEscKeydown);
  bodyElement.removeEventListener('click', onSuccessClickButton);

  const successElement = bodyElement.querySelector('.success');
  successElement.remove();
}

const openSuccess = () => {
  bodyElement.addEventListener('keydown', onSuccessEscKeydown);
  bodyElement.addEventListener('click', onSuccessClickButton);
};

const showSuccess = () => {
  const templateFragment = document.querySelector('#success').content;
  const template = templateFragment.querySelector('.success');
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);

  fragment.appendChild(element);

  bodyElement.appendChild(fragment);

  openSuccess();
};

export { showSuccess, };
