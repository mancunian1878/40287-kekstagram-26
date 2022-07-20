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


const uploadFormOpen = () => {
  imgUploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        imgUploadOverlay.classList.add('hidden');
        body.classList.remove('modal-open');
      }
    });
  });
};

const closePopup = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.querySelector('.effect-level').classList.add('hidden');
};

const uploadFormClose = () => {
  closeButton.addEventListener('click', () => {
    closePopup();
  });

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
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

export {uploadFormOpen, uploadFormClose};


