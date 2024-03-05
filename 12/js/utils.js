const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const validateHashtag = (hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);

const allowHashtagChar = (char) => /[#a-zа-яё0-9 ]/.test(char);

const validateStringLen = (str, len) => str.length <= len;

const strLenCheck = (str, len) => str.length <= len;

export {
  allowHashtagChar,
  getRandomArrayElement,
  getRandomInteger,
  strLenCheck,
  validateHashtag,
  validateStringLen,
};
