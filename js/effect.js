import { form, previewImg, sliderElement, effectLevel, } from './form.js';

const onEffectsListChangeButton = () => {
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

export { onEffectsListChangeButton, };
