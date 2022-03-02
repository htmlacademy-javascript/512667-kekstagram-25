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

const MAXIMUM_STRING_LENGTH = 140;

const MAXIMUM_COMMENTS = 2;
const MINIMUM_COMMENTS = 1;

const MAXIMUM_LIKES = 200;
const MINIMUM_LIKES = 15;

const MAXIMUM_PHOTOS = DESCRIPTIONS.length; // 25

const MAXIMUM_NAMES = NAMES.length; // 6
const MINIMUM_NAMES = 1;

const checkStringLength = (string, length) => string.length <= length;

checkStringLength('Комментарий от Кекса', MAXIMUM_STRING_LENGTH);

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// getRandomPositiveInteger(0, 5);

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generatePhotoId = createIdGenerator();
const generatePhotoUrl = createIdGenerator();
const generatePhotoDescription = createIdGenerator();

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateCommentId = createRandomIdFromRangeGenerator(MINIMUM_COMMENTS, MAXIMUM_COMMENTS * MAXIMUM_PHOTOS);

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createCommentData = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomPositiveInteger(MINIMUM_NAMES, MAXIMUM_NAMES) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createRandomArrayFromRangeGenerator = (minValue, maxValue, callback) => Array.from({ length: getRandomPositiveInteger(minValue, maxValue) }, callback);

const createPhotoData = () => ({
  id: generatePhotoId(),
  url: `photos/${ generatePhotoUrl() }.jpg`,
  description: DESCRIPTIONS[generatePhotoDescription() - 1],
  likes: getRandomPositiveInteger(MINIMUM_LIKES, MAXIMUM_LIKES),
  comments: createRandomArrayFromRangeGenerator(MINIMUM_COMMENTS, MAXIMUM_COMMENTS, createCommentData),
});

const createArrayGenerator = (arrayLength, callback) => Array.from({ length: arrayLength }, callback);

const createAllPhotosData = () => createArrayGenerator(MAXIMUM_PHOTOS, createPhotoData);

createAllPhotosData();
