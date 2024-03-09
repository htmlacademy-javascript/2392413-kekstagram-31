const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const getUniqueRandomArrayElement = (elements, maxCount) => {
  const uniqueueIndex = new Set();
  while (uniqueueIndex.size !== Math.min(maxCount, elements.length)) {
    uniqueueIndex.add(getRandomInteger(0, elements.length - 1));
  }

  // return elements.filter((element, index) => uniqueueIndex.has(index));
  const result = [];
  uniqueueIndex.forEach((value) => result.push(elements[value]));
  return result;
};

const validateHashtag = (hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);

const allowHashtagChar = (char) => /[#a-zа-яё0-9 ]/.test(char);

const validateStringLen = (str, len) => str.length <= len;

const strLenCheck = (str, len) => str.length <= len;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  allowHashtagChar,
  debounce,
  getRandomArrayElement,
  getRandomInteger,
  getUniqueRandomArrayElement,
  strLenCheck,
  validateHashtag,
  validateStringLen,
};
