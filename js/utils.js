// Генерирование случайного числа в диапазоне

const getPositiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

};

const isEscapeKey  = (esc) => esc.key === 'Escape';

export {getPositiveInteger, isEscapeKey};

/* Вычисление длины комментария

const checkStringLength = (string, stringLengthMax) => {
  return string.length <= stringLengthMax;
};
*/
