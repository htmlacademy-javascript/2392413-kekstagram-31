import { DESCRIPTION_MAX_LENGTH, HASHTAG_MAX_COUNT } from './config';
import {
  descriptionInputElement,
  hashtagInputElement,
  uploadPictureFormElement,
} from './page-elements';

const validateHashtag = (hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);

const validateStringLen = (stringValue, maxLength) => stringValue.length <= maxLength;
const initPristine = () => {
  /**
   * Инициализация Pristine для валидации формы ввода.
   * Дока: https://pristine.js.org/
   */
  const pristine = new Pristine(
    uploadPictureFormElement,
    {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'img-upload__field-wrapper--error',
    },
    true
  );

  /**
   * Функция валидации Hashtag.
   * Если вернуло не пустую строку - ошибка.
   * @param {string} hashtag
   * @returns {string}
   */
  const getHashtagErrorMessage = (hashtag) => {
    const hashtagNormalize = hashtag.trim().toLowerCase().replace(/\s+/g, ' ');

    if (hashtagNormalize === '') {
      return '';
    }

    const hashtagArray = hashtagNormalize.split(' ');
    if (hashtagArray.length === 0) {
      return '';
    }

    if (!hashtagArray.every(validateHashtag)) {
      return 'Начинается с #, до 19 символов и цифр';
    }

    if (new Set(hashtagArray).size !== hashtagArray.length) {
      return 'Есть дублирующие хэштеги';
    }

    if (hashtagArray.length > HASHTAG_MAX_COUNT) {
      return `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэштегов`;
    }

    return '';
  };

  pristine.addValidator(
    hashtagInputElement,
    (hashtag) => getHashtagErrorMessage(hashtag) === '',
    getHashtagErrorMessage
  );

  pristine.addValidator(
    descriptionInputElement,
    (description) => validateStringLen(description, DESCRIPTION_MAX_LENGTH),
    `не более ${DESCRIPTION_MAX_LENGTH} символов`
  );

  return pristine;
};

export { initPristine };
