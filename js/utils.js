// Генерирование случайного числа в диапазоне

const getPositiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

};


// Закрытие модального окна
const bigPicture = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const hideModal = () => {
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i --) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

function getStringLength(string, maxStringLength) {
  return string.length <= maxStringLength;
}

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const errorTemplate = document.querySelector('#error').content;
const errorContainer = errorTemplate.querySelector('.error');
const successTemplate = document.querySelector('#success').content;
const successContainer = successTemplate.querySelector('.success');

const errorAlert = () => {
  const errorMessage = errorContainer.cloneNode(true);
  errorMessage.style.zIndex = 10;
  body.appendChild(errorMessage);

  errorMessage.querySelector('.error__button').addEventListener('click', () => {
    errorMessage.style.display = 'none';

    document.removeEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        errorMessage.style.display = 'none';
      }
    });
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessage.style.display = 'none';
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target.contains(errorMessage)) {
      errorMessage.style.display = 'none';
    }
  });
};

const successAlert = () => {
  const successMessage = successContainer.cloneNode(true);
  successMessage.style.zIndex = 10;
  body.appendChild(successMessage);

  successMessage.querySelector('.success__button').addEventListener('click', () => {
    successMessage.style.display = 'none';

    document.removeEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        successMessage.style.display = 'none';
      }
    });

  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.style.display = 'none';
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target.contains(successMessage)) {
      successMessage.style.display = 'none';
    }
  });
};

const getDataAlert = () => {
  const dataAlertMessage = errorContainer.cloneNode(true);
  dataAlertMessage.style.zIndex = 10;
  dataAlertMessage.querySelector('h2').textContent = 'Ошибка загрузки данных с сервера';
  dataAlertMessage.querySelector('button').textContent = 'Попробуйте обновить страницу';
  body.appendChild(dataAlertMessage);

  dataAlertMessage.querySelector('button').addEventListener('click', () => {
    dataAlertMessage.style.display = 'none';
    document.removeEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        dataAlertMessage.style.display = 'none';
      }
    });
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      dataAlertMessage.style.display = 'none';
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target.contains(dataAlertMessage)) {
      dataAlertMessage.style.display = 'none';
    }
  });

};

const debounce = (callback, delay) => {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

export {getPositiveInteger, hideModal,  getStringLength, isEscapeKey, errorAlert, successAlert, getDataAlert, shuffleArray, debounce,
  bigPicture,
  commentsLoader,
  body
};

