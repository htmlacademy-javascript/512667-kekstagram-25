import { previewImg, sliderElement, valueElement, effectLevel, } from './form.js';

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
