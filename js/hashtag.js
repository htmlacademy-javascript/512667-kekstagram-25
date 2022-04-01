const MAXIMUM_HASHTAG_LENGTH = 20;
const MAXIMUM_HASHTAGS = 5;

const REGEX_SYMBOLS = /^#[\dA-Za-zА-Яа-яЁё0-9]{1,}$/;

const splitStrings = (string) => string.trim().toLowerCase().split(' ').filter((tag) => (tag !== ''));

const checkFirstSymbol = (value) => splitStrings(value).every((tag) => (tag.startsWith('#')));

const checkOnlySymbol = (value) => !(splitStrings(value).some((tag) => (tag.startsWith('#') && tag.length === 1)));

const checkSymbolsLength = (value) => splitStrings(value).every((tag) => (tag.length <= MAXIMUM_HASHTAG_LENGTH));

const checkHashtagsCount = (value) => splitStrings(value).length <= MAXIMUM_HASHTAGS;

const checkHashtagDouble = (value) => {
  const hashtag = splitStrings(value);
  return !(hashtag.some((tag, index) => hashtag.indexOf(tag) !== index));
};

const checkHashtagRegEx = (value) => splitStrings(value).every((tag) => (tag.match(REGEX_SYMBOLS)));

export {
  MAXIMUM_HASHTAG_LENGTH,
  MAXIMUM_HASHTAGS,
  checkFirstSymbol,
  checkOnlySymbol,
  checkSymbolsLength,
  checkHashtagsCount,
  checkHashtagDouble,
  checkHashtagRegEx,
};
