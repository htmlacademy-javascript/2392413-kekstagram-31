const ERROR_DATA_SHOW_TIME = 5000;
const DEBOUNCE_TIMEOUT = 500;
const PICTURE_RANDOM_COUNT = 10;
const COMMENT_LOADING_COUNT = 5;

const ScaleProperties = {
  STEP: 25,
  MAX_VALUE: 100,
  DEFAULT_VALUE: 100
};

const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAG_MAX_COUNT = 5;

/*
 * В объекте хранится для каждого эффекта параметры слайдера и стиля.
 */
const effectStyle = {
  none: {
    slider: {
      range: { min: 0, max: 0 },
      step: 0.1,
    },
    css: () => ({ filter: 'none' }),
  },
  chrome: {
    slider: {
      range: { min: 0, max: 1 },
      step: 0.1,
    },
    css: (value) => ({ filter: `grayscale(${value})` }),
  },
  sepia: {
    slider: {
      range: { min: 0, max: 1 },
      step: 0.1,
    },
    css: (value) => ({ filter: `sepia(${value})` }),
  },
  marvin: {
    slider: {
      range: { min: 0, max: 100 },
      step: 1,
    },
    css: (value) => ({ filter: `invert(${value}%)` }),
  },
  phobos: {
    slider: {
      range: { min: 0, max: 3 },
      step: 0.1,
    },
    css: (value) => ({ filter: `blur(${value}px)` }),
  },
  heat: {
    slider: {
      range: { min: 1, max: 3 },
      step: 0.1,
    },
    css: (value) => ({ filter: `brightness(${value})` }),
  },
};

export {
  COMMENT_LOADING_COUNT,
  DEBOUNCE_TIMEOUT,
  DESCRIPTION_MAX_LENGTH,
  ERROR_DATA_SHOW_TIME,
  HASHTAG_MAX_COUNT,
  PICTURE_RANDOM_COUNT,
  ScaleProperties, effectStyle
};

