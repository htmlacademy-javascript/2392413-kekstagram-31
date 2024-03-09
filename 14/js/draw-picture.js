import {
  bigPicture,
  bigPictureCancel,
  bigPictureImgTag,
  commentCount,
  commentLoader,
  commentsShowCount,
  commentsTotalCount,
  likesCount,
  pictureComments,
  pictureDescription,
} from './const';
import {
  getComments,
  getLastCommentShowItem,
  getSelectedPicture,
  resetSelectedPicture,
  setLastCommentShowItem,
} from './picture-state';

const COMMENT_COUNT = 5;

const prepareComment = function (comment) {
  const userComment = document.createElement('li');
  userComment.classList.add('social__comment');
  const userAvatar = document.createElement('img');
  userAvatar.classList.add('social__picture');
  userAvatar.src = comment.avatar;
  userAvatar.alt = comment.name;
  userAvatar.width = '35';
  userAvatar.height = '35';
  userComment.appendChild(userAvatar);
  const userMessage = document.createElement('p');
  userMessage.classList.add('social__text');
  userMessage.textContent = comment.message;
  userComment.appendChild(userMessage);
  return userComment;
};

const onPictureCloseClick = function () {
  formClose();
};

const onPictureCloseKeydown = function (evt) {
  if (evt.key === 'Escape') {
    formClose();
  }
};

const onCommentLoaderClick = function () {
  const comments = getComments();

  const lastCommentShowItem = Math.max(getLastCommentShowItem(), 0);
  const newLastCommentShowItem = Math.min(
    lastCommentShowItem + COMMENT_COUNT,
    comments.length
  );

  comments
    .slice(lastCommentShowItem, newLastCommentShowItem)
    .forEach((comment) => {
      pictureComments.appendChild(prepareComment(comment));
    });

  commentsShowCount.textContent = newLastCommentShowItem;
  setLastCommentShowItem(newLastCommentShowItem);

  if (newLastCommentShowItem >= comments.length) {
    commentLoader.classList.add('hidden');
  }
};

function formClose() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureCloseKeydown);
  commentLoader.removeEventListener('click', onCommentLoaderClick);
  resetSelectedPicture();
}

const initCommentBlock = function () {
  const comments = getComments();
  commentsTotalCount.textContent = comments.length;
  commentCount.classList.remove('hidden');
  if (comments.length > 0) {
    commentLoader.classList.remove('hidden');
  } else {
    commentLoader.classList.add('hidden');
  }
  pictureComments.replaceChildren();
  commentLoader.addEventListener('click', onCommentLoaderClick);
  commentLoader.dispatchEvent(new Event('click'));
};

const renderBigPicture = function () {
  const picture = getSelectedPicture();
  bigPictureImgTag.src = picture.url;
  likesCount.textContent = picture.likes;
  pictureDescription.textContent = picture.description;
  initCommentBlock(picture.comments);
  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onPictureCloseClick);
  document.addEventListener('keydown', onPictureCloseKeydown);
  document.body.classList.add('modal-open');
};

export { renderBigPicture };
