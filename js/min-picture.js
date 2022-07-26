import {showBigPicture} from './big-picture.js';

const template = document.querySelector('#picture').content;

const pictureTemplate  = template.querySelector('a');
const pictures = document.querySelector('.pictures');

const makePicture = (photo) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;

  picture.addEventListener('click', () => {
    showBigPicture(photo);
  });

  return picture;
};

const addPictures = (thumbnails) => {
  const fragment = document.createDocumentFragment();
  thumbnails.forEach((item) => {
    fragment.appendChild(makePicture(item));
  });
  pictures.appendChild(fragment);
};

const clearPictures = () => {
  const addedPictures = document.querySelectorAll('.picture');
  addedPictures.forEach((item) => {
    item.remove();
  });
};

export {addPictures, clearPictures};

