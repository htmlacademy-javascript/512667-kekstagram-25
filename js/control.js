import { previewImg, controlValue, } from './form.js';

const SCALE_STEP_SIZE = 25;
const SCALE_FULL_SIZE = 100;

const onControlSmallerClickButton = () => {
  const currentValue = parseFloat(controlValue.value);

  if (currentValue > SCALE_STEP_SIZE) {
    controlValue.value = `${ currentValue - SCALE_STEP_SIZE }%`;
    previewImg.style.transform = `scale(${ (currentValue - SCALE_STEP_SIZE)/SCALE_FULL_SIZE })`;
  } else {
    controlValue.value = `${ SCALE_STEP_SIZE }%`;
  }
};

const onControlBiggerClickButton = () => {
  const currentValue = parseFloat(controlValue.value);

  if (currentValue < SCALE_FULL_SIZE) {
    controlValue.value = `${ currentValue + SCALE_STEP_SIZE }%`;
    previewImg.style.transform = `scale(${ (currentValue + SCALE_STEP_SIZE)/SCALE_FULL_SIZE })`;
  } else {
    controlValue.value = `${ SCALE_FULL_SIZE }%`;
  }
};

export { onControlSmallerClickButton, onControlBiggerClickButton, };
