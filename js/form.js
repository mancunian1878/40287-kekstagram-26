import { isEscapeKey, showErrorAlert, showSuccessAlert } from './utils.js';
import {request} from './api.js';


const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_QUANTITY = 5;
const HASHTAG_LENGTH = 20;
const SCALE_EDGES = {
  min: 25,
  max: 100,
};
const SCALE_STEP = 25;
const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const imgUploadFile = uploadForm.querySelector('#upload-file');
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const description = uploadForm.querySelector('.text__description');
const hashtag = uploadForm.querySelector('.text__hashtags');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const valueInput = uploadForm.querySelector('.effect-level__value');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');
const Effect = {NONE: 'none', MARVIN: 'marvin', CHROME: 'chrome', SEPIA:'sepia', PHOBOS:'phobos', HEAT:'heat' };
let hashtagArray = [];
let currentValue = 100;
let currentEffect = 'none';

const setEffect = (currentEffectPhoto, value) => {
  switch(currentEffectPhoto) {
    case Effect.NONE: imagePreview.style.filter = 'none';
      break;
    case Effect.CHROME: imagePreview.style.filter = `grayscale(${value})`;
      break;
    case Effect.SEPIA: imagePreview.style.filter = `sepia(${value})`;
      break;
    case Effect.MARVIN: imagePreview.style.filter = `invert(${value}%)`;
      break;
    case Effect.PHOBOS: imagePreview.style.filter = `blur(${value}px)`;
      break;
    case Effect.HEAT: imagePreview.style.filter = `brightness(${value})`;

  }
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    effectSlider.noUiSlider.reset();
    document.querySelector('.effect-level').classList.add('hidden');
    currentEffect = 'none';
    uploadForm.reset();
  }
};
const uploadFormOpen = () => {
  imgUploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    currentEffect = 'none';
    effectSlider.noUiSlider.reset();
    currentValue = 100;
    scaleControlValue.value = `${currentValue}%`;
    imagePreview.style.transform = `scale(${currentValue/100})`;

    document.addEventListener('keydown', onEscKeyDown);
  });
};

const uploadFormClose = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  effectSlider.noUiSlider.reset();
  document.querySelector('.effect-level').classList.add('hidden');
  currentEffect = 'none';

  document.removeEventListener('keydown', onEscKeyDown);
};

closeButton.addEventListener('click', () => {
  uploadFormClose();
});

description.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
hashtag.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


hashtag.addEventListener('input', () => {
  const invalidHashtag = [];

  hashtag.setCustomValidity('');

  const inputText = hashtag.value.toLowerCase().trim();
  if (!inputText) {
    return;
  }

  hashtagArray = inputText.split(/\s+/);

  if (hashtagArray.length === 0) {
    return;
  }

  const isStartNotLattice = hashtagArray.some((item) => item[0] !== '#');
  if (isStartNotLattice) {
    invalidHashtag.push('Хэш-тег должен начинаться с символа #');
  }

  const isOnlyLattice = hashtagArray.some((item) => item === '#');
  if (isOnlyLattice) {
    invalidHashtag.push('Хэш-тег не может состоять из одного символа #');
  }

  const isSplitBySpace = hashtagArray.some((item) => item.indexOf('#', 1) >= 1);
  if (isSplitBySpace) {
    invalidHashtag.push('Хэш-теги разделяются пробелами');
  }

  const isRepeatHashtag = hashtagArray.some((item, i, arr) => arr.indexOf(item, i + 1) >= i + 1);
  if (isRepeatHashtag) {
    invalidHashtag.push('Один и тот же хэш-тег не может быть использован дважды');
  }

  const isLongHashtag = hashtagArray.some((item) => item.length > HASHTAG_LENGTH);
  if (isLongHashtag) {
    invalidHashtag.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  }

  if (hashtagArray.length > HASHTAG_QUANTITY) {
    invalidHashtag.push('Хэш-тегов не должно быть больше 5');
  }

  const isNotPattern = hashtagArray.some((item) => HASHTAG_PATTERN.test(item) === false);
  if (isNotPattern) {
    invalidHashtag.push('Хэш-тег не соответсвует шаблону');
  }

  if (invalidHashtag.length > 0) {
    hashtag.setCustomValidity(invalidHashtag.join('. \n'));
    hashtag.style.borderColor = 'red';
  } else {
    hashtag.style.borderColor = 'lightgrey';
  }
  hashtag.reportValidity();
});

scaleControlValue.value = `${currentValue}%`;

const minimizePhoto = () => {
  scaleControlSmaller.addEventListener('click', () => {
    if (currentValue !== SCALE_EDGES.min) {
      scaleControlValue.value = `${currentValue - SCALE_STEP}%`;
      currentValue -= SCALE_STEP;
      imagePreview.style.transform = `scale(${currentValue/100})`;
    }

  });
};

const maximizePhoto = () => {
  scaleControlBigger.addEventListener('click', () => {
    if (currentValue !== SCALE_EDGES.max) {
      scaleControlValue.value = `${currentValue + SCALE_STEP}%`;
      currentValue += SCALE_STEP;
      imagePreview.style.transform = `scale(${currentValue/100})`;
    }
  });
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const applyEffect = () => {
  effectsList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('effects__preview')) {
      currentEffect = evt.target.classList[1].replace('effects__preview--', '');
      setEffect(currentEffect, valueInput.value);
    }

    document.querySelector('.effect-level').classList.remove('hidden');
    effectSlider.noUiSlider.set(100);

    switch (currentEffect) {
      case 'marvin':
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          step: 1,
          start: 100,
        });
        break;
      case 'phobos':
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });
        break;
      case 'heat':
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });
        break;
      case 'chrome':
      case 'sepia':
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        break;
      case 'none':
        document.querySelector('.effect-level').classList.add('hidden');
    }

  });
};
effectSlider.noUiSlider.on('update', (values, handle) => {
  valueInput.value = values[handle];
  setEffect(currentEffect, valueInput.value);
});

document.querySelector('.effect-level').classList.add('hidden');

const setUploadFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    request(
      showSuccessAlert,
      showErrorAlert,
      'POST',
      new FormData(evt.target),
    );

    uploadFormClose();
    uploadForm.reset();
  });
};

setUploadFormSubmit();
uploadFormOpen();
minimizePhoto();
maximizePhoto();
applyEffect();
