const getRandomInteger = function (firstNumber, secondNumber) {
  const lower = Math.ceil(Math.min(firstNumber, secondNumber));
  const upper = Math.floor(Math.max(firstNumber, secondNumber));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUniqueRandomArrayElement = (elements, maxCount) => {
  const uniqueueIndex = new Set();
  while (uniqueueIndex.size !== Math.min(maxCount, elements.length)) {
    uniqueueIndex.add(getRandomInteger(0, elements.length - 1));
  }

  const uniqueElements = [];
  uniqueueIndex.forEach((value) => uniqueElements.push(elements[value]));
  return uniqueElements;
};

const renderTemplate = (templateId, selector) => {
  const template = document.querySelector(templateId).content;
  return (selector ? template.querySelector(selector) : template).cloneNode(
    true
  );
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId = 0;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, rest);
    }, timeoutDelay);
  };
};

const addOrRemoveClass = (element, className, condition) => {
  if (condition) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  addOrRemoveClass, debounce, getRandomArrayElement,
  getRandomInteger,
  getUniqueRandomArrayElement,
  isEscapeKey,
  renderTemplate
};

