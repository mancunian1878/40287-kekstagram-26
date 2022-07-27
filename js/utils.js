const errorTemplate = document.querySelector('#error').content;
const errorContainer = errorTemplate.querySelector('.error');
const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content;
const successContainer = successTemplate.querySelector('.success');
let alertMessage;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i --) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    alertMessage.style.display = 'none';
  }
};

const showErrorAlert = () => {
  alertMessage = errorContainer.cloneNode(true);
  alertMessage.style.zIndex = 10;
  body.appendChild(alertMessage);

  alertMessage.querySelector('.error__button').addEventListener('click', () => {
    alertMessage.style.display = 'none';

    document.removeEventListener('keydown', onEscKeyDown);
  });
  document.addEventListener('keydown', onEscKeyDown);

  document.addEventListener('click', (evt) => {
    if (evt.target.contains(alertMessage)) {
      alertMessage.style.display = 'none';
    }
  });
};

const showSuccessAlert = () => {
  alertMessage = successContainer.cloneNode(true);
  alertMessage.style.zIndex = 10;
  body.appendChild(alertMessage);

  alertMessage.querySelector('.success__button').addEventListener('click', () => {
    alertMessage.style.display = 'none';

    document.removeEventListener('keydown', onEscKeyDown);
  });
  document.addEventListener('keydown', onEscKeyDown);

  document.addEventListener('click', (evt) => {
    if (evt.target.contains(alertMessage)) {
      alertMessage.style.display = 'none';
    }
  });
};

const getDataAlert = () => {
  alertMessage = errorContainer.cloneNode(true);
  alertMessage.style.zIndex = 10;
  alertMessage.querySelector('h2').textContent = 'Ошибка загрузки данных с сервера';
  alertMessage.querySelector('button').textContent = 'Попробуйте обновить страницу';
  body.appendChild(alertMessage);

  alertMessage.querySelector('button').addEventListener('click', () => {
    alertMessage.style.display = 'none';
    document.removeEventListener('keydown', onEscKeyDown);
  });
  document.addEventListener('keydown', onEscKeyDown);

  document.addEventListener('click', (evt) => {
    if (evt.target.contains(alertMessage)) {
      alertMessage.style.display = 'none';
    }
  });

};

const debounce = (callback, delay) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

export { isEscapeKey, showErrorAlert, showSuccessAlert, getDataAlert, shuffleArray, debounce };

