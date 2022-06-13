// Генерирование случайного числа в диапазоне

const getPositiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

};

// Вычисление длины комментария

const getMaxLengthString = (stringLength, stringLengthMax) => {
  if (stringLength <= stringLengthMax) {
    true;
  }

  else {
    false;
  }
};
