import { isEscapeKey, bigPicture, body, commentsLoader, hideModal  } from './utils.js';

const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const MAX_COMMENTS = 5;


const makeComment = ({avatar, name, message}) => {
  const commentsListItem = socialComment.cloneNode(true);

  commentsListItem.querySelector('.social__picture').src = avatar;
  commentsListItem.querySelector('.social__picture').alt = name;
  commentsListItem.querySelector('.social__text').textContent = message;

  return commentsListItem;
};

const addComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    commentFragment.append(makeComment({avatar, name, message}));
  });

  socialComments.innerHTML = '';
  socialComments.append(commentFragment);
};


const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const buttonVisibility = () => {
  const hiddenElements = socialComments.querySelectorAll('.hidden');

  if (hiddenElements.length === 0) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const showComments = () => {
  const commentsArray = Array.prototype.slice.call(socialComments.querySelectorAll('.hidden')).slice(0, MAX_COMMENTS);

  for (let i = 0; i < commentsArray.length; i ++) {
    commentsArray[i].classList.remove('hidden');
  }
  buttonVisibility();

};
const showMoreComments = () => {
  commentsLoader.addEventListener('click', () => {
    showComments();

    const commentsTotal = bigPicture.querySelectorAll('.social__comment');
    const commentsHidden = bigPicture.querySelectorAll('.social__comment .hidden');
    bigPicture.querySelector('.social__comment-count').textContent = `${(commentsTotal.length - commentsHidden.length)} из ${commentsTotal.length} комментариев`;

  });
};

const showBigPicture = ({url, likes, description, comments}) => {

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  socialComment.classList.add('hidden');

  document.addEventListener('keydown', onEscKeyDown);
  addComments(comments);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPicture.querySelector('.social__comment-count').textContent = `${MAX_COMMENTS} из ${comments.length} комментариев`;
  if (comments.length < MAX_COMMENTS) {
    bigPicture.querySelector('.social__comment-count').textContent = `${comments.length} из ${comments.length} комментариев`;
  }
};

closeBigPicture.addEventListener('click', () => {
  hideModal();
  document.removeEventListener('keydown', onEscKeyDown);
});

export {showBigPicture, showComments, showMoreComments};


//export {getBigPicture};
