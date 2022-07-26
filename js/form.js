import { isEscapeKey, errorAlert, successAlert } from './utils.js';
import {request} from './api.js';

const imgUploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const description = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');
const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_LENGTH = 20;
const  MAX_HASHTAG_NUMBERS = 5;
//const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
let hashtagArray = [];
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
let currentEffect = 'none';
const effectSlider = document.querySelector('.effect-level__slider');
const valueInput = document.querySelector('.effect-level__value');
const SCALE_EDGES = {
  min: 25,
  max: 100,
};
const SCALE_STEP = 25;
let currentValue = 100;



const Effect = {NONE: 'none', MARVIN: 'marvin', CHROME: 'chrome', SEPIA:'sepia', PHOBOS:'phobos', HEAT:'heat' };
switch (Effect) {
  case Effect.NONE: imagePreview.style.filter = 'none';
    break;
  case Effect.MARVIN: imagePreview.style.filter = 'marvin${value}';
    break;
  case Effect.CHROME(value): imagePreview.style.filter = grayscale(${value});
    break;
  case Effect.SEPIA: imagePreview.style.filter = 'sepia';
    break;
  case Effect.PHOBOS: imagePreview.style.filter = 'phobos';
    break;
  case Effect.HEAT: imagePreview.style.filter = 'heat';

}
/*
const Effects = {
  none: () => {
    imagePreview.style.filter = 'none';
  },
  chrome: (value) => {
    imagePreview.style.filter = grayscale(${value});
  },
  sepia: (value) => {
    imagePreview.style.filter = sepia(${value});
  },
  marvin: (value) => {
    imagePreview.style.filter = invert(${value}%);
  },
  phobos: (value) => {
    imagePreview.style.filter = blur(${value}px);
  },
  heat: (value) => {
    imagePreview.style.filter = brightness(${value});
  },
};
*/


const uploadFormOpen = () => {
  imgUploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    currentEffect = 'none';
    effectSlider.noUiSlider.reset();
    currentValue = 100;
    scaleControlValue.value = `${currentValue}%`;
    imagePreview.style.transform = `scale(${currentValue/100})`;

    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        imgUploadOverlay.classList.add('hidden');
        body.classList.remove('modal-open');
        effectSlider.noUiSlider.reset();
        document.querySelector('.effect-level').classList.add('hidden');
        currentEffect = 'none';
        uploadForm.reset();
      }
    });
  });
};
const closePopup = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  effectSlider.noUiSlider.reset();
  document.querySelector('.effect-level').classList.add('hidden');
  currentEffect = 'none';
};
const uploadFormClose = () => {
  closePopup();

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
      uploadForm.reset();
    }
  });
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

  if (hashtagArray.length > MAX_HASHTAG_NUMBERS) {
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
/*
const MessagesFormValidationErros = {
  INVALID_HASHTAGS: 'Хэш-тег должен начинаться с символа #',
  NOT_UNIQUE_HASHTAGS: 'Один и тот же хэш-тег не может быть использован дважды.',
  INVALID_COUNT_HASHTAGS: 'Нельзя указать больше пяти хэш-тегов.'
};

const validateHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.every((hashTag) => RE.test(hashTag));
};

const validateUniqueHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length === (new Set(hashTags)).size;
};


const validateCountHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length < MAX_HASHTAG_NUMBERS;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(hashtag, validateHashtags, MessagesFormValidationErros.INVALID_HASHTAGS);
pristine.addValidator(hashtag, validateUniqueHashtags, MessagesFormValidationErros.NOT_UNIQUE_HASHTAGS);
pristine.addValidator(hashtag, validateCountHashtags, MessagesFormValidationErros.INVALID_COUNT_HASHTAGS);
*/
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

      effects[currentEffect](valueInput.value);
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
  effects[currentEffect](valueInput.value);
});

document.querySelector('.effect-level').classList.add('hidden');

const setUploadFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    request(
      successAlert,
      errorAlert,
      'POST',
      new FormData(evt.target),
    );

    uploadFormClose();
    uploadForm.reset();
  });
};

export {uploadFormOpen, uploadFormClose, minimizePhoto, maximizePhoto, applyEffect, setUploadFormSubmit};
