const FILTERS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const SLIDER_PARAMETERS = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => `${value}%`,
      from: (value) => Number(value.replace('%', '')),
    },
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => `${value}px`,
      from: (value) => Number(value.replace('px', '')),
    },
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
};

const effectLevel = document.querySelector('.effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const resetFilter = () => {
  imageUploadPreview.style.filter = '';
  imageUploadPreview.className = '';
  effectLevel.classList.add('hidden');
};

const addEffect = (evt) => {
  const currentEffectValue = evt.target.value;
  effectLevel.classList.remove('hidden');
  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
  if (currentEffectValue === 'none') {
    resetFilter();
  } else {
    noUiSlider.create(effectSlider, SLIDER_PARAMETERS[currentEffectValue]);
    imageUploadPreview.className = `effects__preview--${currentEffectValue}`;
    effectSlider.noUiSlider.on('update', (value) => {
      imageUploadPreview.style.filter = `${FILTERS[currentEffectValue]}(${value})`;
      effectValue.value = parseFloat(value);
    });
  }

};

export {resetFilter, addEffect };
