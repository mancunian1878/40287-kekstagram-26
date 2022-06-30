import { POSTS } from './data.js'; import {getBigPicture} from './big-picture.js';

const TEMPLATE = document.querySelector('#picture').content;
const PIC_TEMPLATE = TEMPLATE.querySelector('a');
const pictures = document.querySelector('.pictures');

const makePicture = (photo) => {
  const picture = PIC_TEMPLATE.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments;

  picture.addEventListener('click', () => {
    getBigPicture(photo);
  });

  return picture;
};

const addPictures = () => {
  const fragment = document.createDocumentFragment();
  POSTS.forEach((item) => {
    fragment.appendChild(makePicture(item));
  });
  pictures.appendChild(fragment);
};

export {addPictures};

/*import { POSTS } from './data.js'; //import {getBigPicture} from './big-picture.js';

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
  createPicture(url, likes, comments);

});
*/

/*PICTURE.addEventListener('click', () => {
    getBigPicture(photo);
  });

  return PICTURE;
  */
// POSTS массив с генерированными объектами


//export {pictures};
/*const addPictures = () => {
  const FRAGMENT = document.createDocumentFragment();
  POSTS.forEach((item) => {
    FRAGMENT.appendChild(createPicture(item));
  });
  pictures.appendChild(FRAGMENT);

};
export { addPictures };
*/

