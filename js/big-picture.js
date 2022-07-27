import { isEscapeKey } from './utils.js';

const MAX_COMMENTS = 5;
const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const buttonCloseBigPicture = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
let currentComments = 5;

const makeComment = ({avatar, name, message}) => {
  const commentListItem = socialComment.cloneNode(true);

  commentListItem.querySelector('.social__picture').src = avatar;
  commentListItem.querySelector('.social__picture').alt = name;
  commentListItem.querySelector('.social__text').textContent = message;

  return commentListItem;
};

const addComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    commentFragment.append(makeComment({avatar, name, message}));
  });

  commentsContainer.innerHTML = '';
  commentsContainer.append(commentFragment);
};

const hideModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const showComments = (comments) => {
  const onCommentsLoaderClick = () => {
    currentComments += MAX_COMMENTS;

    showComments(comments);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  };

  const publishedComments = comments.slice(0, currentComments > comments.length ? comments.length : currentComments);

  addComments(publishedComments);

  bigPicture.querySelector('.social__comment-count').textContent = `${publishedComments.length} из ${comments.length} комментариев`;

  if (currentComments < comments.length) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  } else {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }
};

const showBigPicture = ({url, likes, description, comments}) => {
  currentComments = 5;

  bigPicture.querySelector('.full-photo').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  document.addEventListener('keydown', onEscKeyDown);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPicture.querySelector('.social__comment-count').textContent = `${MAX_COMMENTS} из ${comments.length} комментариев`;
  if (comments.length < MAX_COMMENTS) {
    bigPicture.querySelector('.social__comment-count').textContent = `${comments.length} из ${comments.length} комментариев`;
  }

  showComments(comments);
};

buttonCloseBigPicture.addEventListener('click', () => {
  hideModal();
  document.removeEventListener('keydown', onEscKeyDown);
});

export {showBigPicture};
