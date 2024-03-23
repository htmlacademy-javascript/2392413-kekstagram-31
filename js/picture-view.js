import { COMMENT_LOADING_COUNT } from './config';
import {
  bigPictureCancelElement,
  bigPictureContainerElement,
  bigPictureImgElement,
  commentCountContainerElement,
  commentShowCountElement,
  commentTotalCountElement,
  commentsContainerElement,
  commentsLoaderElement,
  descriptionElement,
  likesCountElement,
} from './page-elements';
import { renderNextComments } from './picture-comments';
import {
  getComments,
  getLastCommentShowItem,
  getSelectedPicture,
  resetSelectedPicture,
  setLastCommentShowItem,
} from './picture-state';
import { addOrRemoveClass, isEscapeKey } from './utils';

/**
 * Обработчик события клик на закрытие фото (крестик в правом углу)
 * Просто закрываем формыу
 */
const onPictureCloseClick = () => {
  formClose();
};

/**
 * Обработчик события keydown. Должно срабатывать только на Esc.
 * Просто закрываем формыу
 */
const onPictureCloseKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    formClose();
  }
};

/**
 * Закрытие формы просмотра фото.
 */
function formClose() {
  bigPictureContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureCloseKeydown);
  resetSelectedPicture();
}

/**
 * Обработчиск собития клик на ссылку "Загрузить еще".
 * Подгрузка комментариев. Количество комментариев для подгрузки в
 * константе COMMENT_LOADING_COUNT.
 * Если все комментарии подгружены, то скрываем ссылку.
 */
const onCommentLoaderClick = () => {
  const comments = getComments();

  const lastCommentShowItem = Math.max(getLastCommentShowItem(), 0);
  const newLastCommentShowItem = Math.min(
    lastCommentShowItem + COMMENT_LOADING_COUNT,
    comments.length
  );

  const newComments = renderNextComments(
    lastCommentShowItem,
    newLastCommentShowItem
  );
  commentsContainerElement.appendChild(newComments);

  commentShowCountElement.textContent = newLastCommentShowItem;
  setLastCommentShowItem(newLastCommentShowItem);
  addOrRemoveClass(
    commentsLoaderElement,
    'hidden',
    newLastCommentShowItem >= comments.length
  );
};

/**
 * Инициализация блока с комментариями.
 */
const initCommentBlock = () => {
  commentTotalCountElement.textContent = getComments().length;
  commentCountContainerElement.classList.remove('hidden');
};

/**
 * Отрисовка фото
 */
const renderBigPicture = () => {
  const { url, likes, description } = getSelectedPicture();
  bigPictureImgElement.src = url;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;
  commentsContainerElement.replaceChildren();
  initCommentBlock();
  onCommentLoaderClick();
  bigPictureContainerElement.classList.remove('hidden');

  document.addEventListener('keydown', onPictureCloseKeydown);
  document.body.classList.add('modal-open');
};

/**
 * Инициализация формы просмотра фото
 */
const initPictureView = () => {
  bigPictureCancelElement.addEventListener('click', onPictureCloseClick);
  commentsLoaderElement.addEventListener('click', onCommentLoaderClick);
};

export { initPictureView, renderBigPicture };
