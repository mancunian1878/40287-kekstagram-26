import { isEscapeKey } from './utils.js';


const bigPicture = document.querySelector('.big-picture');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');


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

const hideModal = () => {
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const getBigPicture = ({url, likes, description, comments}) => {

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  document.addEventListener('keydown', onEscKeyDown);

  addComments(comments);

  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
};

closeBigPicture.addEventListener('click', () => {
  hideModal();
  document.removeEventListener('keydown', onEscKeyDown);
});

export {getBigPicture};
