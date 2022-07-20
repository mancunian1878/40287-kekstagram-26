import { isEscapeKey, bigPicture, body, commentsLoader, hideModal  } from './utils.js';

const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const MAX_COMMENTS = 5;
let currentComments = 5;

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

  bigPicture.querySelector('.big-picture__img img').src = url;
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

closeBigPicture.addEventListener('click', () => {
  hideModal();
  document.removeEventListener('keydown', onEscKeyDown);
});

export {showBigPicture};
