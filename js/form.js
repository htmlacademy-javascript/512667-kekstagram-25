import {
  addBodyClass,
  removeBodyClass,
} from './modal.js';

import {
  isEscapeKey,
  stopEscPropagation,
} from './util.js';

import {
  MAXIMUM_STRING_LENGTH,
} from './data.js';

const MAXIMUM_HASHTAG_LENGTH = 20;
const MAXIMUM_HASHTAGS = 5;

const REGEX_SYMBOLS = /^#[\dA-Za-zА-Яа-яЁё0-9]{1,}$/;

const form = document.querySelector('.img-upload__form');
form.action = 'https://25.javascript.pages.academy/kekstagram';

const overlay = form.querySelector('.img-upload__overlay');
const control = form.querySelector('.img-upload__control');
const cancel = form.querySelector('.img-upload__cancel');

const description = form.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');

const text = form.querySelector('.text');
const submit = form.querySelector('#upload-submit');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideImage();
  }
};

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, true);

const checkDescriptionLength = (value) => value.length <= MAXIMUM_STRING_LENGTH;

pristine.addValidator(
  description,
  checkDescriptionLength,
  `До ${ MAXIMUM_STRING_LENGTH } символов`
);

const splitStrings = (string) => string.trim().toLowerCase().split(' ').filter((tag) => (tag !== ''));

const checkFirstSymbol = (value) => splitStrings(value).every((tag) => (tag.startsWith('#')));

pristine.addValidator(
  hashtags,
  checkFirstSymbol,
  'Хэштег начинается с #'
);

const checkOnlySymbol = (value) => !(splitStrings(value).some((tag) => (tag.startsWith('#') && tag.length === 1)));

pristine.addValidator(
  hashtags,
  checkOnlySymbol,
  'Хэштег состоит не только из #'
);

const checkSymbolsLength = (value) => splitStrings(value).every((tag) => (tag.length <= MAXIMUM_HASHTAG_LENGTH));

pristine.addValidator(
  hashtags,
  checkSymbolsLength,
  `До ${ MAXIMUM_HASHTAG_LENGTH } символов, включая #`
);

const checkHashtagsCount = (value) => splitStrings(value).length <= MAXIMUM_HASHTAGS;

pristine.addValidator(
  hashtags,
  checkHashtagsCount,
  `До ${ MAXIMUM_HASHTAGS } хэштегов`
);

const checkHashtagDouble = (value) => {
  const hashtag = splitStrings(value);
  return !(hashtag.some((tag, index) => hashtag.indexOf(tag) !== index));
};

pristine.addValidator(
  hashtags,
  checkHashtagDouble,
  'Без двойных хэштегов'
);

const checkHashtagRegEx = (value) => splitStrings(value).every((tag) => (tag.match(REGEX_SYMBOLS)));

pristine.addValidator(
  hashtags,
  checkHashtagRegEx,
  'Имя хэштега включает только буквы и цифры'
);

const checkValidateForm = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
};

const checkValidateSubmit = () => {
  if (text.classList.contains('text--invalid')) {
    submit.classList.add('.img-upload__submit--disabled');
    submit.disabled = true;
  } else if (text.classList.contains('text--valid')) {
    submit.classList.remove('.img-upload__submit--disabled');
    submit.disabled = false;
  }
};

const showImage = () => {
  addBodyClass();
  overlay.classList.remove('hidden');

  cancel.addEventListener('click', hideImage);
  text.addEventListener('change', checkValidateSubmit);
  form.addEventListener('submit', checkValidateForm);
  description.addEventListener('keydown', stopEscPropagation);
  hashtags.addEventListener('keydown', stopEscPropagation);

  document.addEventListener('keydown', onPopupEscKeydown);
};

function hideImage () {
  removeBodyClass();
  overlay.classList.add('hidden');

  cancel.removeEventListener('click', hideImage);
  text.removeEventListener('change', checkValidateSubmit);
  form.removeEventListener('submit', checkValidateForm);
  description.removeEventListener('keydown', stopEscPropagation);
  hashtags.removeEventListener('keydown', stopEscPropagation);

  document.removeEventListener('keydown', onPopupEscKeydown);
}

control.addEventListener('click', showImage);