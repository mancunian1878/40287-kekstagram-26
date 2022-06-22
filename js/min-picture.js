import { POSTS } from './data.js';

const TEMPLATE = document.querySelector('#picture').content;
const PIC_TEMPLATE = TEMPLATE.querySelector('a');
const pictures = document.querySelector('.pictures');

const createPicture = (url, likes, comments) => {
  const FRAGMENT = document.createDocumentFragment();
  const PICTURE = PIC_TEMPLATE.cloneNode(true);
  PICTURE.querySelector('.picture__img').src = url;
  PICTURE.querySelector('.picture__likes').textContent = likes;
  PICTURE.querySelector('.picture__comments').textContent = comments;
  FRAGMENT.appendChild(PICTURE);
  pictures.appendChild(FRAGMENT);

};

// POSTS массив с генерированными объектами

POSTS.forEach(({url, likes, comments}) => {
  createPicture({url, likes, comments});

});
/*
Отобразить фотографии других пользователей.

Заведите модуль, который будет отвечать за отрисовку миниатюр.

На основе временных данных для разработки и шаблона #picture создайте DOM-элементы,
соответствующие фотографиям, и заполните их данными:

Адрес изображения url подставьте как атрибут src изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments.
Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

Подключите модуль в проект.
*/
