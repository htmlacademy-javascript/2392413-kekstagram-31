import { renderTemplate } from './utils';

const templatePictureElement = document.querySelector('#picture');

const picturePoolElement = document.querySelector('.pictures');

const uploadPictureFormElement = document.querySelector('.img-upload__form');
const uploadPictureInputElement =
  uploadPictureFormElement.querySelector('.img-upload__input');
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(
  '.img-upload__overlay'
);
const uploadPictureCancelElement = uploadPictureFormElement.querySelector(
  '.img-upload__cancel'
);
const hashtagInputElement =
  uploadPictureFormElement.querySelector('.text__hashtags');
const descriptionInputElement =
  uploadPictureFormElement.querySelector('.text__description');
const submitButtonElement = uploadPictureFormElement.querySelector(
  '.img-upload__submit'
);
const inputFieldContainerElement =
  uploadPictureFormElement.querySelector('.img-upload__text');

//Форма просмотра фото
const bigPictureContainerElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureContainerElement.querySelector(
  '.big-picture__cancel'
);
const bigPictureImgElement = bigPictureContainerElement.querySelector(
  '.big-picture__img img'
);
const likesCountElement =
  bigPictureContainerElement.querySelector('.likes-count');
const commentShowCountElement = bigPictureContainerElement.querySelector(
  '.social__comment-shown-count'
);
const commentTotalCountElement = bigPictureContainerElement.querySelector(
  '.social__comment-total-count'
);
const descriptionElement =
  bigPictureContainerElement.querySelector('.social__caption');
const commentsContainerElement =
  bigPictureContainerElement.querySelector('.social__comments');
const commentCountContainerElement = bigPictureContainerElement.querySelector(
  '.social__comment-count'
);
const commentsLoaderElement =
  bigPictureContainerElement.querySelector('.comments-loader');

//Эффекты и зумм фото
const picturePreviewElement = document.querySelector(
  '.img-upload__preview img'
);
const scaleControlSmallerElement = document.querySelector(
  '.scale__control--smaller'
);
const scaleControlBiggerElement = document.querySelector(
  '.scale__control--bigger'
);
const scaleControlValueElement = document.querySelector(
  '.scale__control--value'
);
const effectLevelSliderElement = document.querySelector(
  '.effect-level__slider'
);
const effectLevelValueElement = document.querySelector('.effect-level__value');
const imgUploadEffectLevelElement = document.querySelector(
  '.img-upload__effect-level'
);
const effectsListElement = document.querySelector('.effects__list');
const effectsPreviewElement =
  effectsListElement.querySelectorAll('.effects__preview');

const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement =
  filtersContainerElement.querySelector('.img-filters__form');
const filtersButtonElement = filtersContainerElement.querySelectorAll(
  '.img-filters__button'
);

//Статусы получения/загрузки данных
const errorDataContainerElement = renderTemplate('#data-error', '.data-error');
const errorDataTitleElement =
  errorDataContainerElement.querySelector('.data-error__title');

const errorContainerElement = renderTemplate('#error', '.error');
const errorButtonElement =
  errorContainerElement.querySelector('.error__button');

const successContainerElement = renderTemplate('#success', '.success');
const successButtonElement =
  successContainerElement.querySelector('.success__button');

export {
  bigPictureCancelElement,
  bigPictureContainerElement,
  bigPictureImgElement,
  commentCountContainerElement,
  commentShowCountElement,
  commentTotalCountElement,
  commentsContainerElement,
  commentsLoaderElement,
  descriptionElement,
  descriptionInputElement,
  effectLevelSliderElement,
  effectLevelValueElement,
  effectsListElement,
  effectsPreviewElement,
  errorButtonElement,
  errorContainerElement,
  errorDataContainerElement,
  errorDataTitleElement,
  filtersButtonElement,
  filtersContainerElement,
  filtersFormElement,
  hashtagInputElement,
  imgUploadEffectLevelElement,
  inputFieldContainerElement,
  likesCountElement,
  picturePoolElement,
  picturePreviewElement,
  scaleControlBiggerElement,
  scaleControlSmallerElement,
  scaleControlValueElement,
  submitButtonElement,
  successButtonElement,
  successContainerElement,
  templatePictureElement,
  uploadPictureCancelElement,
  uploadPictureFormElement,
  uploadPictureInputElement,
  uploadPictureOverlayElement
};

