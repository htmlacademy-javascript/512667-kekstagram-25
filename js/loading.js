import {
  form,
} from './form.js';

const showLoading = () => {
  const templateFragment = document.querySelector('#messages').content;
  const template = templateFragment.querySelector('.img-upload__message');
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);

  fragment.appendChild(element);

  form.appendChild(fragment);
};

const clearLoading = () => {
  const message = document.querySelector('.img-upload__message');

  message.remove();
};

export {
  showLoading,
  clearLoading,
};
