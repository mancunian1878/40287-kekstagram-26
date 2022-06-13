// Генерирование случайного числа в диапазоне

const getPositiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

};

const MESSAGES = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра', 'В конце концов это просто непрофессионально.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = ['Идрак', 'Санёк', 'Гарик', 'Лёха'];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getPositiveInteger(1, 6)}.svg`,
  message: MESSAGES[getPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getPositiveInteger(0, NAMES.length - 1)],
});

const createObject = (id) => {
  const comments = [];
  const commentsCount = getPositiveInteger(0, 7);

  for (let comment = 1; comment <= commentsCount; comment++) {
    comments.push(createComment(comment));
  }

  return {
    id,
    url: `photos/${id}.jpg`,
    description: 'Мой первый опыт в фотографии',
    likes: getPositiveInteger(15, 200),
    comments,
  };
};

const generateObjects = (count) => {
  const objects = [];
  for (let object = 1; object <= count; object++) {
    objects.push(createObject(object));
  }
  return objects;
};

generateObjects(25);


// Вычисление длины комментария

const checkStringLength = (string, stringLengthMax) => {
  return string.length <= stringLengthMax;
};
