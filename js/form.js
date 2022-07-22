import { isEscapeKey, body } from './utils.js';

const imgUploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');
const description = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');

const MessagesFormValidationErros = {
  INVALID_HASHTAGS: `Невалидный хэш-тег. Хэш-тег должен начинаться с символа # (решётка), состоять из букв и чисел,
  не содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д..
  Хеш-тег не может состоять только из одной решётки. Максимальная длина одного хэш-тега 20 символов, включая решётку.`,
  NOT_UNIQUE_HASHTAGS: 'Один и тот же хэш-тег не может быть использован дважды.',
  INVALID_COUNT_HASHTAGS: 'Нельзя указать больше пяти хэш-тегов.'
};

const  MAX_HASHTAG_NUMBERS = 5;
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
let currentEffect = 'none';
const effectSlider = document.querySelector('.effect-level__slider');
const valueInput = document.querySelector('.effect-level__value');

let currentValue = 100;
const SCALE_EDGES = {
  min: 25,
  max: 100,
};
const SCALE_STEP = 25;
const effects = {
  none: () => {
    imagePreview.style.filter = 'none';
  },
  chrome: (value) => {
    imagePreview.style.filter = `grayscale(${value})`;
  },
  sepia: (value) => {
    imagePreview.style.filter = `sepia(${value})`;
  },
  marvin: (value) => {
    imagePreview.style.filter = `invert(${value}%)`;
  },
  phobos: (value) => {
    imagePreview.style.filter = `blur(${value}px)`;
  },
  heat: (value) => {
    imagePreview.style.filter = `brightness(${value})`;
  },
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

    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        imgUploadOverlay.classList.add('hidden');
        body.classList.remove('modal-open');
        effectSlider.noUiSlider.reset();
        document.querySelector('.effect-level').classList.add('hidden');
        currentEffect = 'none';
      }
    });
  });
};

/*const closePopup = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.querySelector('.effect-level').classList.add('hidden');
  effectSlider.noUiSlider.reset();
  currentEffect = 'none';
};
*/
const uploadFormClose = () => {
  closeButton.addEventListener('click', () => {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    effectSlider.noUiSlider.reset();
    document.querySelector('.effect-level').classList.add('hidden');
    currentEffect = 'none';
  });

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      effectSlider.noUiSlider.reset();
      document.querySelector('.effect-level').classList.add('hidden');
      currentEffect = 'none';
    }
  });
};

description.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
hashtag.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

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

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(hashtag, validateHashtags, MessagesFormValidationErros.INVALID_HASHTAGS);
pristine.addValidator(hashtag, validateUniqueHashtags, MessagesFormValidationErros.NOT_UNIQUE_HASHTAGS);
pristine.addValidator(hashtag, validateCountHashtags, MessagesFormValidationErros.INVALID_COUNT_HASHTAGS);

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

export {uploadFormOpen, uploadFormClose, minimizePhoto, maximizePhoto, applyEffect};


