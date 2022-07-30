import {onEditClose} from './upload-form.js';

const ALERT_SHOW_TIME = 5000;

const successContainer = document.querySelector('#success').content.querySelector('.success');
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

function onMessageEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    this.style.display = 'none';
  }
}

function onContains(evt) {
  if (evt.target.contains(this)) {
    this.style.display = 'none';
  }
}

const showForm = (success = true) => {
  const message = success ? successContainer.cloneNode(true) : errorContainer.cloneNode(true);
  body.appendChild(message);
  message.style.zIndex = 5;
  const button = message.querySelector('button');
  const keydownFunc = onMessageEscKeydown.bind(message);

  button.addEventListener('click', () => {
    message.style.display = 'none';
    document.removeEventListener('keydown', keydownFunc);
  });
  document.removeEventListener('keydown', onEditClose);
  document.addEventListener('keydown', keydownFunc);
  document.addEventListener('click', onContains.bind(message));
};

// Сообщение об ошибке загрузки фото с сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.zIndex = 100;
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.fontSize = '20px';
  alertContainer.style.lineHeight = '27px';
  alertContainer.style.fontWeight = '600';
  alertContainer.style.padding = '20px';
  alertContainer.style.borderRadius = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#232321';
  alertContainer.style.color = '#ff0000';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showForm};
