import { isEscapeKey } from './utils.js';

const imgUploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const description = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');
const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_QUANTITY = 5;
const HASHTAG_LENGTH = 20;
let hashtagArray = [];


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

const uploadFormClose = () => {
  closeButton.addEventListener('click', () => {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};

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
    //hashtag.classList.add('validation__error');
  } else {
    //hashtag.classList.remove('validation__error');
  }
  hashtag.reportValidity();
});


export {uploadFormOpen, uploadFormClose};
