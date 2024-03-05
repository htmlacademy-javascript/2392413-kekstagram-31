const templatePicture = document.querySelector('#picture').content;
const picturePool = document.querySelector('.pictures');

const uploadPictureForm = document.querySelector('.img-upload__form');
const uploadPictureInput =
  uploadPictureForm.querySelector('.img-upload__input');
const uploadPictureOverlay = uploadPictureForm.querySelector(
  '.img-upload__overlay'
);
const uploadPictureFormCancel = uploadPictureForm.querySelector(
  '.img-upload__cancel'
);
const hashtagInput = uploadPictureForm.querySelector('.text__hashtags');
const descriptionInput = uploadPictureForm.querySelector('.text__description');
const submitButton = uploadPictureForm.querySelector('.img-upload__submit');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImgTag = bigPictureImg.querySelector('img');
const likesCount = bigPicture.querySelector('.social__likes');
const commentsShowCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const commentsTotalCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const pictureDescription = bigPicture.querySelector('.social__caption');
const pictureComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');

const uploadPicturePreview = document.querySelector('.img-upload__preview');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector(
  '.img-upload__effect-level'
);
const effectList = document.querySelector('.effects__list');

export {
  bigPicture,
  bigPictureCancel,
  bigPictureImgTag,
  commentCount,
  commentLoader,
  commentsShowCount,
  commentsTotalCount,
  descriptionInput,
  effectLevelSlider,
  effectLevelValue,
  effectList,
  hashtagInput,
  imgUploadEffectLevel,
  likesCount,
  pictureComments,
  pictureDescription,
  picturePool,
  scaleControlBigger,
  scaleControlSmaller,
  scaleControlValue,
  submitButton,
  templatePicture,
  uploadPictureForm,
  uploadPictureFormCancel,
  uploadPictureInput,
  uploadPictureOverlay,
  uploadPicturePreview,
};
