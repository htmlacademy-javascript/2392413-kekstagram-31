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

const COMMENT_COUNT = 5;
let HandlerCommentLoaderClick;

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

const onClickPictureClose = function (evt) {
  if (
    (evt.type === 'keydown' && evt.key === 'Escape') ||
    evt.type === 'click'
  ) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onClickPictureClose);
    commentLoader.removeEventListener('click', HandlerCommentLoaderClick);
  }
};

const initCommentBlock = function (comments) {
  commentsTotalCount.textContent = comments.length;
  commentCount.classList.remove('hidden');
  if (comments.length > 0) {
    commentLoader.classList.remove('hidden');
  } else {
    commentLoader.classList.add('hidden');
  }
  pictureComments.replaceChildren();
  let lastCommentShowItem = 0;

  HandlerCommentLoaderClick = function () {
    for (let i = 0; i < COMMENT_COUNT; i++) {
      if (!comments[lastCommentShowItem]) {
        break;
      }

      pictureComments.appendChild(
        prepareComment(comments[lastCommentShowItem])
      );
      lastCommentShowItem++;
    }
    commentsShowCount.textContent = lastCommentShowItem;

    if (lastCommentShowItem >= comments.length) {
      commentLoader.classList.add('hidden');
    }
  };
  commentLoader.addEventListener('click', HandlerCommentLoaderClick);
  commentLoader.dispatchEvent(new Event('click'));
};

const onClickPicture = function (picture) {
  bigPictureImgTag.src = picture.url;
  likesCount.textContent = picture.likes;
  pictureDescription.textContent = picture.description;
  initCommentBlock(picture.comments);
  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onClickPictureClose);
  document.addEventListener('keydown', onClickPictureClose);
  document.body.classList.add('modal-open');
};

export { onClickPicture };
