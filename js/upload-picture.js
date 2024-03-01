import { allowHashtagChar, validateHashtag, validateStringLen } from './utils';

import {
  descriptionInput,
  hashtagInput,
  uploadPictureForm,
  uploadPictureFormCancel,
  uploadPictureInput,
  uploadPictureOverlay,
} from './const';
import { effectPicture } from './effect-picture';
import { scalePicture } from './scale-picture';

export const initUploadPicture = function () {
  /**
   * Инициализация Pristine для валидации формы ввода.
   * Дока: https://pristine.js.org/
   */
  const pristine = new Pristine(
    uploadPictureForm,
    {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'img-upload__field-wrapper--error',
    },
    true
  );

  /**
   * Функция для валидации Hashtag.
   * Если вернуло не пустую строку - ошибка.
   *
   * Правила:
   * - хэштег начинается с символа # (решётка);
   * - строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
   * - хеш-тег не может состоять только из одной решётки;
   * - максимальная длина одного хэштега 20 символов, включая решётку;
   * - хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
   * - хэштеги разделяются пробелами;
   * - один и тот же хэштег не может быть использован дважды;
   * - нельзя указать больше пяти хэштегов;
   * - хэштеги необязательны.
   */
  const getHashtagErrorMessage = function (hashtag) {
    const hashtagNormalize = hashtag.trim();
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

    if (hashtagArray.length > 5) {
      return 'Нельзя указать больше пяти хэштегов';
    }

    return '';
  };

  /**
   * Добавляем валидатор для поля с HashTag.
   *
   * Проблема: не понятно как можно обойтись одним вызовом getHashtagErrorMessage!!!
   */
  pristine.addValidator(
    hashtagInput,
    (hashtag) => getHashtagErrorMessage(hashtag) === '',
    getHashtagErrorMessage
  );

  /**
   * Добавляем валидатор для поля с комментарием.
   *
   * Правила:
   * - комментарий не обязателен;
   * - длина комментария не может составлять больше 140 символов;
   */
  pristine.addValidator(
    descriptionInput,
    (description) => validateStringLen(description, 140),
    'не более 140 символов'
  );

  /**
   * Добавляем слушателя на событие submit (отправка формы).
   * Если Pristine возвращает false, значит где-то есть ошибка и
   * необходимо прервать поводение браузера по умолчанию.
   */
  uploadPictureForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

  /**
   * Обработчик события закрытия формы. Срабатывает на Esc и Click
   * по иконке на форме.
   * Необходимо:
   * - вернуть класс hidden;
   * - у элемента body удаляется класс modal-open;
   * - у элемента с выбранным файлом необходимо сбросить value чтобы повторно можно
   * было загрузить одит и тот же файл.
   *
   * Нюанс: если фокус находится в поле ввода хэштега или комментария, нажатие на
   * Esc не должно приводить к закрытию формы редактирования изображения.
   *
   *
   * Проблема: определить что фокус находится в элементах ввода смог опредлелить только
   * через evt.target. Мне кажется можно как-то по другому.
   */
  const onClickClose = function (evt) {
    if (
      (evt.type === 'keydown' &&
        evt.key === 'Escape' &&
        evt.target !== hashtagInput &&
        evt.target !== descriptionInput) ||
      evt.type === 'click'
    ) {
      uploadPictureOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadPictureInput.value = '';
      document.removeEventListener('keydown', onClickClose);
    }
  };

  /**
   * Дополнительные правила для хештега:
   *  - запретил двойной пробел;
   *  - вводить можно только буквы/цифры и #.
   *
   * Проблемы: не удалось сделать автоподстановку # если последний символ пробел
   */
  const onKeyDownHashtagInput = function (evt) {
    const elementValue = evt.target.value;
    const lastChar = elementValue[elementValue.length - 1];
    const charEnter = evt.key;

    if (!allowHashtagChar(charEnter)) {
      evt.preventDefault();
    } else if (
      charEnter === ' ' &&
      (lastChar === charEnter || lastChar === undefined)
    ) {
      evt.preventDefault();
    }
  };

  /**
   * Добавляем слушателя на событие change поля выбора файла.
   * После выбора файла должна появиться модальная форма. Для этого
   * удаляется класс hidden, а для body задаётся класс modal-open.
   * Для закрытия формы добавляем слушателя на событие
   * keydown на документ и событие click на иконку.
   */
  uploadPictureInput.addEventListener('change', () => {
    uploadPictureOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onClickClose);
    uploadPictureFormCancel.addEventListener('click', onClickClose);
  });

  /**
   * Добавляем слушателя на событие keydown на поле ввода хэштега
   */
  hashtagInput.addEventListener('keydown', onKeyDownHashtagInput);

  scalePicture();
  effectPicture();
};
