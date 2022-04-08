import { POST_URL, } from './api.js';
import { addBodyClass, removeBodyClass, showModal, hideModal, } from './modal.js';
import { isEscapeKey, onStopPropagationEscKeydown, } from './util.js';
import { addFileChooser, } from './choose.js';
import { onControlSmallerClickButton, onControlBiggerClickButton, } from './control.js';
import { onEffectsListChangeButton } from './effect.js';

const form = document.querySelector('.img-upload__form');

const overlay = form.querySelector('.img-upload__overlay');
const cancel = form.querySelector('.img-upload__cancel');

const text = form.querySelector('.text');
const hashtags = text.querySelector('.text__hashtags');
const description = text.querySelector('.text__description');

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

form.action = POST_URL;
fileChooser.accept='image/png, image/jpeg';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    onCancelClickButton();
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

const setDefaultValues = () => {
  valueElement.value = 100;
  controlValue.value = '100%';
  effectLevel.style.display = 'none';
  previewImg.style.filter = 'none';
  previewImg.style.transform = 'scale(1)';
  previewImg.className = '';
  previewImg.classList.add('effects__preview--none');

  description.value = '';
  hashtags.value = '';

  const textErrors = text.querySelectorAll('.text__error');
  textErrors.forEach((textError) => {
    textError.textContent = '';
  });
};

const showImageModal = () => {
  unblockSubmitButton();
  hideModal();

  addBodyClass();
  overlay.classList.remove('hidden');

  setDefaultValues();

  controlSmaller.addEventListener('click', onControlSmallerClickButton);
  controlBigger.addEventListener('click', onControlBiggerClickButton);
  effectsList.addEventListener('change', onEffectsListChangeButton);

  cancel.addEventListener('click', onCancelClickButton);
  description.addEventListener('keydown', onStopPropagationEscKeydown);
  hashtags.addEventListener('keydown', onStopPropagationEscKeydown);

  document.addEventListener('keydown', onPopupEscKeydown);
};

function onCancelClickButton () {
  blockSubmitButton();
  showModal();

  removeBodyClass();
  overlay.classList.add('hidden');

  setDefaultValues();
  fileChooser.value = '';

  controlSmaller.removeEventListener('click', onControlSmallerClickButton);
  controlBigger.removeEventListener('click', onControlBiggerClickButton);
  effectsList.removeEventListener('change', onEffectsListChangeButton);

  cancel.removeEventListener('click', onCancelClickButton);
  description.removeEventListener('keydown', onStopPropagationEscKeydown);
  hashtags.removeEventListener('keydown', onStopPropagationEscKeydown);

  document.removeEventListener('keydown', onPopupEscKeydown);
}

addFileChooser();

export {
  form, fileChooser, previewImg, controlValue, sliderElement, valueElement, effectLevel, description, hashtags,
  showImageModal, onCancelClickButton, blockSubmitButton, unblockSubmitButton,
};
