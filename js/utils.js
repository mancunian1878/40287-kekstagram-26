// Генерирование случайного числа в диапазоне

const getPositiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

};

const isEscapeKey  = (esc) => esc.key === 'Escape';

// Вычисление длины комментария

//const checkStringLength = (string, stringLengthMax) => string.length <= stringLengthMax;

//checkStringLength();

export { getPositiveInteger, isEscapeKey  };
