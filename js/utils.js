// Генерирование случайного числа в диапазоне

const getPositiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

};

const isEscapeKey  = (esc) => esc.key === 'Escape';

// Закрытие модального окна
const bigPicture = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const hideModal = () => {
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
};

export {getPositiveInteger, isEscapeKey, hideModal,
  bigPicture,
  commentsLoader,
  body };

/* Вычисление длины комментария

const checkStringLength = (string, stringLengthMax) => {
  return string.length <= stringLengthMax;
};
*/
