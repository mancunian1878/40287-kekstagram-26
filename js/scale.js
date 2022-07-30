const MIN_VALUE = 25;
const MAX_VALUE = 100;

const scaleInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');

let currentValue = MAX_VALUE;
scaleInputElement.value = `${currentValue}%`;

const onDecreaseScalingButtonClick = () => {
  if (currentValue > MIN_VALUE) {
    currentValue -= MIN_VALUE;
    scaleInputElement.value = `${currentValue}%`;
    imagePreviewElement.style.transform = `scale(${currentValue * 0.01})`;
  }
};

const onIncreaseScalingButtonClick = () => {
  if (currentValue < MAX_VALUE) {
    currentValue += MIN_VALUE;
    scaleInputElement.value = `${currentValue}%`;
    imagePreviewElement.style.transform = `scale(${currentValue * 0.01})`;
  }
};

const resetScaling  = () => {
  scaleInputElement.value = `${MAX_VALUE}%`;
  imagePreviewElement.style.transform = '';
  currentValue = MAX_VALUE;
};

const addScalingHandlers = () => {
  controlSmaller.addEventListener('click', onDecreaseScalingButtonClick);
  controlBigger.addEventListener('click', onIncreaseScalingButtonClick);
};

const removeScalingHandlers = () => {
  controlSmaller.removeEventListener('click', onDecreaseScalingButtonClick);
  controlBigger.removeEventListener('click', onIncreaseScalingButtonClick);
};

export {addScalingHandlers, removeScalingHandlers, resetScaling};
