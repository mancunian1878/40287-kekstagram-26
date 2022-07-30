const MAX_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentElement = bigPicture.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');

const buttonCloseBigPicture = bigPicture.querySelector('#picture-cancel');

const body = document.querySelector('body');
const commentListFragment = document.createDocumentFragment();

buttonCloseBigPicture.addEventListener('click', (evt) => {
  evt.preventDefault();
  hideBigPicture();
});

const onModalClose = (evt) => {
  if (evt.key === 'Escape') {
    hideBigPicture();
  }
};

function hideBigPicture(){
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalClose);
}


const renderPhotoElement = ({url, likes, comments, description}) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureComments.textContent = comments;
  bigPictureDescription.textContent = description;

  let count = 0;

  const createComments = () => {
    count += MAX_COMMENTS_COUNT;
    comments.slice(0, count).forEach(({avatar, name, message}) => {
      const commentElementCopy = commentElement.cloneNode(true);
      const commentAvatar = commentElementCopy.querySelector('.social__comment .social__picture');
      const commentMesssage = commentElementCopy.querySelector('.social__comment .social__text');

      commentAvatar.src = avatar;
      commentAvatar.alt = name;
      commentMesssage.textContent = message;

      commentListFragment.append(commentElementCopy);
    });

    commentsContainer.innerHTML = '';
    commentsContainer.append(commentListFragment);

    if(count >= comments.length) {
      commentLoader.classList.add('hidden');
      commentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      commentLoader.classList.remove('hidden');
      commentCount.textContent = `${count} из ${comments.length} комментариев`;
    }

  };
  createComments();
  document.addEventListener('keydown', onModalClose);

  commentsLoader.addEventListener('click', () => {
    createComments();
  });

};

export {renderPhotoElement};
