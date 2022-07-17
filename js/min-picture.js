import { POSTS } from './data.js';
//import {getBigPicture} from './big-picture.js';
import {showBigPicture, showComments, showMoreComments} from './big-picture.js';

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
    showComments();
    showMoreComments();
  });

  return picture;
};

/*
POSTS.forEach(({url, likes, comments}) => {
  makePicture(url, likes, comments);
});
*/
const addPictures = () => {
  const fragment = document.createDocumentFragment();
  POSTS.forEach((url, likes, comments) => {
    fragment.appendChild(makePicture(url, likes, comments ));
  });
  pictures.appendChild(fragment);
};

export {addPictures};

