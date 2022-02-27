const NAMES = [
  'Иван',
  'Мария',
  'Кекс',
  'Виктор',
  'Юлия',
  'Люпита',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Пустой пляж с шезлонгами, лежаками и бассейном',
  'Дорога на пляж',
  'Берег океана',
  'Девушка на пляже с фотоаппаратом',
  'Две тарелки с супом, приправленным рисом в виде человечков',
  'Авто с открытой вертикальной дверцей',
  'Вилка и две половинки клубники в деревянной тарелке',
  'Два бокала сока и кисти винограда на столе',
  'Самолёт над пляжем с купающимися людьми',
  'Три пары обуви в лотке',
  'Деревенские улицы, огороженные забором',
  'Авто на деревенской улице',
  'Овощное блюдо из моркови и огурцов на бумаге',
  'Котёнок, завёрнутый как в гамбургере',
  'Ноги в зимних ботинках человека, лежащего на диване',
  'Самолёт, летящий над горами',
  'Выступление хора',
  'Авто в гараже',
  'Ноги в тапочках человека, стоящего у двери',
  'Двор с пальмами',
  'Тарелка с салатом и вилка',
  'Закат над океаном',
  'Краб на камне',
  'Ночная дискотека',
  'Авто на затопленной дороге и бегемот с открытой пастью в воде',
];

const SIMILAR_NAME_COUNT = NAMES.length;
const SIMILAR_PHOTO_COUNT = DESCRIPTIONS.length;

// Функция взята из интернета и доработана Кексом
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// getRandomPositiveInteger (0, 5);

function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength ('Комментарий от Кекса');

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger (0, elements.length - 1)];
}

const dataComment = [];

function createComment () {
  for (let i = 1; i <= SIMILAR_PHOTO_COUNT; i++) {
    dataComment.push({
      id: getRandomPositiveInteger (1, 999),
      avatar: 'img/avatar-' . concat (getRandomPositiveInteger (1, SIMILAR_NAME_COUNT), '.svg'),
      message: getRandomArrayElement (MESSAGES),
      name: getRandomArrayElement (NAMES),
    });
  }
  return dataComment;
}

createComment();

const dataPhoto = [];

function createPhoto () {
  for (let i = 1; i <= SIMILAR_PHOTO_COUNT; i++) {
    dataPhoto.push({
      id: i,
      url: 'photos/' . concat (i, '.jpg'),
      description: DESCRIPTIONS[i],
      likes: getRandomPositiveInteger (15, 200),
      comments: dataComment[i - 1],
    });
  }
  return dataPhoto;
}

createPhoto();
