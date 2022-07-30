import {renderPhotoElement} from './big-picture.js';

const renderThumbnails = (thumbnails) => {
  const userPhotoTemplate = document.querySelector('#picture').content;
  const userPhotosContainer = document.querySelector('.pictures');
  const photoListFragment = document.createDocumentFragment();

  thumbnails.forEach(({url, likes, comments}) => {
    const photoProperty = userPhotoTemplate.cloneNode(true);
    photoProperty.querySelector('.picture__img').src = url;
    photoProperty.querySelector('.picture__likes').textContent = likes;
    photoProperty.querySelector('.picture__comments').textContent = comments.length;
    photoListFragment.append(photoProperty);
  });

  userPhotosContainer.append(photoListFragment);

  //Функция для связки миниатюр и больших фото

  const previews = userPhotosContainer.querySelectorAll('.picture');

  const initBigPicture = (item, dataPicture) => {
    item.addEventListener('click', () => {
      renderPhotoElement(dataPicture);
    });
  };

  for (let i = 0; i < thumbnails.length; i++) {
    initBigPicture(previews[i], thumbnails[i]);
  }
};

export {renderThumbnails};
