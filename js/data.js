<<<<<<< HEAD
import { getPositiveInteger } from './utils.js';
=======
import {getPositiveInteger} from './utils.js';
>>>>>>> master

const MESSAGES = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра', 'В конце концов это просто непрофессионально.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = ['Идрак', 'Санёк', 'Гарик', 'Лёха'];
<<<<<<< HEAD
const DESCRIPTIONS = ['Мой первый опыт в фотографии', 'Неудачная съёмка','Первый кадр','Тестирование перспективы','Учусь композиции'];
=======
>>>>>>> master

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getPositiveInteger(1, 6)}.svg`,
  message: MESSAGES[getPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getPositiveInteger(0, NAMES.length - 1)],
});

<<<<<<< HEAD
const createPost = (id) => {
=======
const createObject = (id) => {
>>>>>>> master
  const comments = [];
  const commentsCount = getPositiveInteger(0, 7);

  for (let comment = 1; comment <= commentsCount; comment++) {
    comments.push(createComment(comment));
  }

  return {
    id,
    url: `photos/${id}.jpg`,
<<<<<<< HEAD
    description: DESCRIPTIONS[getPositiveInteger(0, DESCRIPTIONS.length - 1)],
=======
    description: 'Мой первый опыт в фотографии',
>>>>>>> master
    likes: getPositiveInteger(15, 200),
    comments,
  };
};

<<<<<<< HEAD
const POSTS = [];
const generatePosts = (count) => {
  
  for (let post = 1; post <= count; post++) {
    POSTS.push(createPost(post));
  }
  return POSTS;
};

generatePosts(25);

export {createComment, createPost, generatePosts,
  MESSAGES,
  NAMES,
  DESCRIPTIONS,
  POSTS,
};
=======
const generateObjects = (count) => {
  const objects = [];
  for (let object = 1; object <= count; object++) {
    objects.push(createObject(object));
  }
  return objects;
};

generateObjects(25);

export {createComment, createObject, generateObjects,
  MESSAGES,
  NAMES,
};
>>>>>>> master
