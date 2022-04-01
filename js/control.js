import {
  previewImg,
  controlValue,
} from './form.js';

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

export {
  changeControlSmaller,
  changeControlBigger,
};
