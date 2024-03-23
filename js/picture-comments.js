import { getComments } from './picture-state';

/**
 * Создание иконци аватара в списке с комментариями
 * @param {string} avatar ссылка на картинку с аватар
 * @param {string} name пользователь
 * @returns {HTMLImageElement}
 */
const getAvatarElement = (avatar, name) => {
  const userAvatar = document.createElement('img');
  userAvatar.classList.add('social__picture');
  userAvatar.src = avatar;
  userAvatar.alt = name;
  userAvatar.width = 35;
  userAvatar.height = 35;
  return userAvatar;
};

/**
 * Создание текста коммментария
 * @param {string} message текст комментария
 * @returns {HTMLParagraphElement}
 */
const getMessageElement = (message) => {
  const userMessage = document.createElement('p');
  userMessage.classList.add('social__text');
  userMessage.textContent = message;
  return userMessage;
};

/**
 * Комментарий
 * @typedef {{avatar: string, name: string, message: string}} Comment
 */

/**
 * Создание комментария
 * @param {Comment} данные комментария
 * @returns {HTMLLIElement}
 */
const getCommentElement = ({ avatar, name, message }) => {
  const userComment = document.createElement('li');
  userComment.classList.add('social__comment');
  userComment.appendChild(getAvatarElement(avatar, name));
  userComment.appendChild(getMessageElement(message));
  return userComment;
};

/**
 * Возвращает объект с комментариями
 * @param {number} fromIndex с какого индекса взять комментарии
 * @param {number} toIndex до какого индекса взять коммментарии
 * @returns {Comment[]}
 */
const getNextComments = (fromIndex, toIndex) => getComments().slice(fromIndex, toIndex);

/**
 * Возвращает фрагмент с очередным блоком с комментариями
 * @param {Comment[]} comments с какого индекса взять комментарии
 * @returns {DocumentFragment}
 */
const renderComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentFragment.appendChild(getCommentElement(comment));
  });
  return commentFragment;
};

/**
 * Возвращает объект с комментариями
 * @param {number} fromIndex с какого индекса взять комментарии
 * @param {number} toIndex до какого индекса взять коммментарии
 * @returns {DocumentFragment}
 */
const renderNextComments = (fromIndex, toIndex) => renderComments(getNextComments(fromIndex, toIndex));

export { getNextComments, renderComments, renderNextComments };
