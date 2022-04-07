import { sendData, } from './api.js';
import { showLoading, clearLoading, } from './loading.js';
import { showSuccess, } from './success.js';
import { showError, } from './error.js';
import { form, description, hashtags, onCancelClickButton, blockSubmitButton, } from './form.js';
import { MAXIMUM_STRING_LENGTH, checkDescriptionLength, } from './comment.js';
import {
  MAXIMUM_HASHTAG_LENGTH, MAXIMUM_HASHTAGS,
  checkFirstSymbol, checkOnlySymbol, checkSymbolsLength,
  checkHashtagsCount, checkHashtagDouble, checkHashtagRegEx,
} from './hashtag.js';

const pristine = new Pristine(form, {
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'p',
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
          onCancelClickButton();
          clearLoading();
          showError();
        },
        new FormData(evt.target),
      );
    }
  });
};

setFormSubmit(onCancelClickButton);
