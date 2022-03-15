import {
  addBodyClass,
  removeBodyClass,
} from './modal.js';

import {
  stopEscPropagation,
} from './util.js';

import {
  MAXIMUM_STRING_LENGTH,
} from './data.js';

const form = document.querySelector('.img-upload__form');
form.action = 'https://25.javascript.pages.academy/kekstagram';

const overlay = form.querySelector('.img-upload__overlay');
const control = form.querySelector('.img-upload__control');
const cancel = form.querySelector('.img-upload__cancel');

const description = form.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');

description.addEventListener('keydown', stopEscPropagation);
hashtags.addEventListener('keydown', stopEscPropagation);

const showImage = () => {
  addBodyClass();
  overlay.classList.remove('hidden');

  cancel.addEventListener('click', hideImage);
};

function hideImage () {
  removeBodyClass();
  overlay.classList.add('hidden');
}

control.addEventListener('click', showImage);

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, true);

function checkDescriptionLength (value) {
  return value.length <= MAXIMUM_STRING_LENGTH;
}

pristine.addValidator(
  description,
  checkDescriptionLength,
  `До ${ MAXIMUM_STRING_LENGTH } символов`
);

const splitStrings = (string) => (
  string.trim().toLowerCase().split(' ').filter((tag) => (tag !== ''))
);

const checkFirstSymbol = (value) => (
  splitStrings(value).every((tag) => (tag.startsWith('#')))
);

pristine.addValidator(hashtags, checkFirstSymbol, 'Хэштег начинается с #');

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});
