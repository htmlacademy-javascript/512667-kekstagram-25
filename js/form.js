import {
  addBodyClass,
  removeBodyClass,
} from './modal.js';

import {
  isEscapeKey,
  stopEscPropagation,
} from './util.js';

import {
  chooseFileImg,
} from './choose.js';

import {
  changeControlSmaller,
  changeControlBigger,
} from './control.js';

import {
  setEffects,
  setDefaultEffects,
} from './effect.js';

import {
  checkValidateForm,
} from './pristine.js';

const form = document.querySelector('.img-upload__form');

const overlay = form.querySelector('.img-upload__overlay');
const cancel = form.querySelector('.img-upload__cancel');

const description = form.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');

const text = form.querySelector('.text');
const fileChooser = form.querySelector('#upload-file');
const submit = form.querySelector('#upload-submit');

const scale = form.querySelector('.scale');
const controlSmaller = scale.querySelector('.scale__control--smaller');
const controlBigger = scale.querySelector('.scale__control--bigger');
const controlValue = scale.querySelector('.scale__control--value');

const previewImg = form.querySelector('.img-upload__preview > img');
const effectsList = form.querySelector('.effects__list');

const effectLevel = form.querySelector('.effect-level');
const sliderElement = effectLevel.querySelector('.effect-level__slider');
const valueElement = effectLevel.querySelector('.effect-level__value');

form.action = 'https://25.javascript.pages.academy/kekstagram';
fileChooser.accept='image/png, image/jpeg';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideImage();
  }
};

const blockSubmitButton = () => {
  submit.classList.add('.img-upload__submit--disabled');
  submit.disabled = true;
};

const unblockSubmitButton = () => {
  submit.classList.remove('.img-upload__submit--disabled');
  submit.disabled = false;
};

const checkValidateSubmit = () => {
  if (text.classList.contains('text--invalid')) {
    blockSubmitButton();
  } else if (text.classList.contains('text--valid')) {
    unblockSubmitButton();
  }
};

const showImage = () => {
  unblockSubmitButton();

  addBodyClass();
  overlay.classList.remove('hidden');

  setDefaultEffects();
  controlSmaller.addEventListener('click', changeControlSmaller);
  controlBigger.addEventListener('click', changeControlBigger);
  effectsList.addEventListener('change', setEffects);

  cancel.addEventListener('click', hideImage);
  text.addEventListener('change', checkValidateSubmit);
  form.addEventListener('submit', checkValidateForm);
  description.addEventListener('keydown', stopEscPropagation);
  hashtags.addEventListener('keydown', stopEscPropagation);

  document.addEventListener('keydown', onPopupEscKeydown);
};

function hideImage () {
  blockSubmitButton();

  removeBodyClass();
  overlay.classList.add('hidden');

  setDefaultEffects();
  controlSmaller.removeEventListener('click', changeControlSmaller);
  controlBigger.removeEventListener('click', changeControlBigger);
  effectsList.removeEventListener('change', setEffects);

  cancel.removeEventListener('click', hideImage);
  text.removeEventListener('change', checkValidateSubmit);
  form.removeEventListener('submit', checkValidateForm);
  description.removeEventListener('keydown', stopEscPropagation);
  hashtags.removeEventListener('keydown', stopEscPropagation);

  document.removeEventListener('keydown', onPopupEscKeydown);
}

fileChooser.addEventListener('change', chooseFileImg);

export {
  form,
  fileChooser,
  previewImg,
  controlValue,
  sliderElement,
  valueElement,
  effectLevel,
  description,
  hashtags,
  showImage,
  hideImage,
};
