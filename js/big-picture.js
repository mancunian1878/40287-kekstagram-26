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

  bigPicture.querySelector('.full-photo').src = url;
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


/*
Реализовать сценарий просмотра фотографий в полноразмерном режиме.
В таком режиме пользователь получает несколько дополнительных возможностей:
 детально рассмотреть изображение, поставить «лайк», почитать комментарии, оставленные другими пользователями.

1.Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.

2. Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять
его данными о конкретной фотографии:

 - Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

 - Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

 - Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

 - Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
 - Описание фотографии description вставьте строкой в блок .social__caption.

3. После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

4. После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

5. Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

6. Подключите модуль в проект.

Как связать модули миниатюр и полноразмерного режима?
Задача не имеет одного верного решения, поэтому будет правильным как использование третьего модуля для связки двух других,
 так и импорт модуля полноразмерных изображений в модуль миниатюр и дальнейшая работа с интерфейсом этого модуля, addEventListener и замыканиями.
Последнее решение похоже на демонстрацию по учебному проекту. А первое — с третьим модулем — более сложное из-за отсутствия примера, но самостоятельное.
В качестве третьего модуля можно выбрать точку входа, а можно завести отдельный модуль, например «Галерея». Решение за вами.

*/

/*import { isEscapeKey } from './util.js';


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

  bigPicture.querySelector('.full-photo').src = url;
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
*/
