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
const cancel = form.querySelector('.img-upload__cancel');

const description = form.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');

const text = form.querySelector('.text');
const file = form.querySelector('#upload-file');
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

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();

  if (previewImg.className === 'effects__preview--chrome') {
    previewImg.style.filter = `grayscale(${ valueElement.value })`;
  } else if (previewImg.className === 'effects__preview--sepia') {
    previewImg.style.filter = `sepia(${ valueElement.value })`;
  } else if (previewImg.className === 'effects__preview--marvin') {
    previewImg.style.filter = `invert(${ valueElement.value }%)`;
  } else if (previewImg.className === 'effects__preview--phobos') {
    previewImg.style.filter = `blur(${ valueElement.value }px)`;
  } else if (previewImg.className === 'effects__preview--heat') {
    previewImg.style.filter = `brightness(${ valueElement.value })`;
  } else {
    effectLevel.style.display = 'none';
    sliderElement.setAttribute('disabled', true);
    previewImg.style.filter = 'none';
  }
});

const setEffects = () => {
  previewImg.className = '';
  previewImg.classList.add(`effects__preview--${ form.elements.effect.value }`);

  const effectsSettings = {
    none: {
      range: {
        min: 0,
        max: 0,
      },
      step: 0,
      start: 0,
    },
    chrome: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    sepia: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    marvin: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    phobos: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    heat: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    }
  };

  effectLevel.style.display = 'block';
  sliderElement.removeAttribute('disabled');
  sliderElement.noUiSlider.updateOptions(effectsSettings[form.elements.effect.value]);
};

const setDefaultEffects = () => {
  valueElement.value = 100;
  effectLevel.style.display = 'none';
  previewImg.classList.add('effects__preview--none');
};

const changeControlSmaller = () => {
  const currentValue = parseFloat(controlValue.value);

  if (currentValue > 25) {
    controlValue.value = `${ currentValue - 25 }%`;
    previewImg.style.transform = `scale(${ (currentValue - 25)/100 })`;
  } else {
    controlValue.value = '25%';
  }
};

const changeControlBigger = () => {
  const currentValue = parseFloat(controlValue.value);

  if (currentValue < 100) {
    controlValue.value = `${ currentValue + 25 }%`;
    previewImg.style.transform = `scale(${ (currentValue + 25)/100 })`;
  } else {
    controlValue.value = '100%';
  }
};

const setControlValue = () => {
  controlValue.value = '100%';
  previewImg.style.transform = 'scale(1)';
};

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

  setControlValue();
  controlSmaller.addEventListener('click', changeControlSmaller);
  controlBigger.addEventListener('click', changeControlBigger);

  setDefaultEffects();
  effectsList.addEventListener('change', setEffects);

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

file.addEventListener('change', showImage);
