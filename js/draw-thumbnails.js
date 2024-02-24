import { onClickPicture } from './draw-picture';

export const drawThumbnails = function(posts) {
  const templatePicture = document.querySelector('#picture').content;
  const picturePool = document.querySelector('.pictures');

  posts.forEach((element) => {
    const picture = templatePicture.cloneNode(true);
    const link = picture.querySelector('a');
    const img = picture.querySelector('.picture__img');
    const like = picture.querySelector('.picture__likes');
    const comment = picture.querySelector('.picture__comments');
    img.src = element.url;
    img.alt = element.description;
    like.textContent = element.likes;
    comment.textContent = element.comments.length;
    picturePool.appendChild(picture);
    link.addEventListener('click', () => {
      onClickPicture(element);
    });
  });
};
