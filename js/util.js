const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createRandomArrayFromRangeGenerator = (minValue, maxValue, callback) => Array.from({ length: getRandomPositiveInteger(minValue, maxValue) }, callback);

const createArrayGenerator = (arrayLength, callback) => Array.from({ length: arrayLength }, callback);

const isEscapeKey = (evt) => evt.key === 'Escape';

const stopEscPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

export {
  getRandomPositiveInteger,
  createIdGenerator,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  createRandomArrayFromRangeGenerator,
  createArrayGenerator,
  isEscapeKey,
  stopEscPropagation,
};
