import {
  form,
  description,
  hashtags,
  hideImage,
  blockSubmitButton,
} from './form.js';

import {
  MAXIMUM_STRING_LENGTH,
  checkDescriptionLength,
} from './comment.js';

import {
  MAXIMUM_HASHTAG_LENGTH,
  MAXIMUM_HASHTAGS,
  checkFirstSymbol,
  checkOnlySymbol,
  checkSymbolsLength,
  checkHashtagsCount,
  checkHashtagDouble,
  checkHashtagRegEx,
} from './hashtag.js';

import {
  sendData,
} from './api.js';

import {
  showLoading,
  clearLoading,
} from './loading.js';

import {
  showSuccess,
} from './success.js';

import {
  showError,
} from './error.js';

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, true);

pristine.addValidator(
  description,
  checkDescriptionLength,
  `До ${ MAXIMUM_STRING_LENGTH } символов`
);

pristine.addValidator(
  hashtags,
  checkFirstSymbol,
  'Хэштег начинается с #'
);

pristine.addValidator(
  hashtags,
  checkOnlySymbol,
  'Хэштег состоит не только из #'
);

pristine.addValidator(
  hashtags,
  checkSymbolsLength,
  `До ${ MAXIMUM_HASHTAG_LENGTH } символов, включая #`
);

pristine.addValidator(
  hashtags,
  checkHashtagsCount,
  `До ${ MAXIMUM_HASHTAGS } хэштегов`
);

pristine.addValidator(
  hashtags,
  checkHashtagDouble,
  'Без двойных хэштегов'
);

pristine.addValidator(
  hashtags,
  checkHashtagRegEx,
  'Имя хэштега включает только буквы и цифры'
);

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      showLoading();
      sendData(
        () => {
          onSuccess();
          clearLoading();
          showSuccess();
        },
        () => {
          hideImage();
          clearLoading();
          showError();
        },
        new FormData(evt.target),
      );
    }
  });
};

setFormSubmit(hideImage);
