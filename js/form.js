import {
  addBodyClass,
  removeBodyClass,
} from './modal.js';

import {
  isEscapeKey,
  stopEscPropagation,
  showAlert,
} from './util.js';

const MAXIMUM_STRING_LENGTH = 140;
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
const uploadFile = form.querySelector('#upload-file');
const uploadSubmit = form.querySelector('#upload-submit');

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
    to: (value) => (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();

  switch (previewImg.className) {
    case 'effects__preview--chrome': {
      previewImg.style.filter = `grayscale(${ valueElement.value })`;
      break;
    }
    case 'effects__preview--sepia': {
      previewImg.style.filter = `sepia(${ valueElement.value })`;
      break;
    }
    case 'effects__preview--marvin': {
      previewImg.style.filter = `invert(${ valueElement.value }%)`;
      break;
    }
    case 'effects__preview--phobos': {
      previewImg.style.filter = `blur(${ valueElement.value }px)`;
      break;
    }
    case 'effects__preview--heat': {
      previewImg.style.filter = `brightness(${ valueElement.value })`;
      break;
    }
    default: {
      effectLevel.style.display = 'none';
      sliderElement.setAttribute('disabled', true);
      previewImg.style.filter = 'none';
    }
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
  controlValue.value = '100%';
  effectLevel.style.display = 'none';
  previewImg.style.filter = 'none';
  previewImg.style.transform = 'scale(1)';
  previewImg.className = '';
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
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);

    fetch(
      'https://25.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          hideImage();

          showAlert('Форма успешно отправлена. Поздравляем!', 'green');
        } else {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз', 'red');
        }
      })
      .catch(() => {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз', 'red');
      });
  }
};

const blockSubmitButton = () => {
  uploadSubmit.classList.add('.img-upload__submit--disabled');
  uploadSubmit.disabled = true;
};

const unblockSubmitButton = () => {
  uploadSubmit.classList.remove('.img-upload__submit--disabled');
  uploadSubmit.disabled = false;
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

  previewImg.onload = () => {
    URL.revokeObjectURL(previewImg.src);
  };
  previewImg.src = URL.createObjectURL(uploadFile.files[0]);

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

  previewImg.src = 'img/upload-default-image.jpg';

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

uploadFile.addEventListener('change', showImage);
