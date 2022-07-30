import {sendData} from './api.js';
import {showForm} from './upload-data.js';

const MAX_HASHTAG_NUMBERS = 5;
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const imgUploadForm = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

//Функции для проверки хештегов
const validateHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.every((hashTag) => RE.test(hashTag));
};

const validateUniqueHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length === (new Set(hashTags)).size;
};

const validateNumberHashtags = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length <= MAX_HASHTAG_NUMBERS;
};


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text'
});

const isValidHashtags = () => inputHashtag.value.length === 0;

pristine.addValidator(inputHashtag, validateHashtags, 'Невалидный хештег');
pristine.addValidator(inputHashtag, validateUniqueHashtags, 'Один и тот же хештег не может быть использован дважды');
pristine.addValidator(inputHashtag, validateNumberHashtags, 'Нельзя указать больше 5 хештегов');


//Блокировка кнопки отправки данных
const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Загружаем...';
};

//Разблокировка кнопки отправки данных
const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

const reloadAfterSuccess = () => {
  showForm();
};

const reloadAfterError = () => {
  showForm(false);
};

//Отправка фото
const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid || isValidHashtags()) {
      blockSubmitButton();
      sendData(
        () => {
          reloadAfterSuccess();
          unblockSubmitButton();
          onSuccess();
        },
        () => {
          reloadAfterError();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    } else {
      pristine.validate(inputHashtag);
    }
  });
};

export {setUserFormSubmit};
