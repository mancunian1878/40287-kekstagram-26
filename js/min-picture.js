import { POSTS } from './data.js';
import {showBigPicture} from './big-picture.js';

const template = document.querySelector('#picture').content;

const pictureTemplate  = template.querySelector('a');
const pictures = document.querySelector('.pictures');

const makePicture = ({url, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picture.addEventListener('click', () => {
    showBigPicture({url, likes, comments});
  });

  return picture;
};

const addPictures = () => {
  const fragment = document.createDocumentFragment();
  POSTS.forEach((url, likes, comments) => {
    fragment.appendChild(makePicture(url, likes, comments ));
  });
  pictures.appendChild(fragment);
};

export {addPictures};

