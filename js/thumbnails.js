import { picturePoolElement, templatePictureElement } from './page-elements';
import { getPictures, setSelectedPicture } from './picture-state';
import { renderBigPicture } from './picture-view';

/**
 * Очистка миниатюр
 */
const clearThumbnails = () => {
  picturePoolElement.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

/**
 * Обработчик события клик на миниатюре
 */
const onThumbnailClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (!pictureElement) {
    return;
  }

  evt.preventDefault();
  setSelectedPicture(Number(pictureElement.dataset.pictureId));
  renderBigPicture();
};

/**
 * Создание миниатюры
 * @param {{id: number, url: string, description: string, likes: number, comments: string}} данные миниатюры
 * @returns {DocumentFragment}
 */
const getThumbnailElement = ({ id, url, description, likes, comments }) => {
  const pictureElement = templatePictureElement.content.cloneNode(true);
  const imgElement = pictureElement.querySelector('.picture__img');
  const likeElement = pictureElement.querySelector('.picture__likes');
  const commentElement = pictureElement.querySelector('.picture__comments');
  const linkElement = pictureElement.querySelector('a');

  linkElement.dataset.pictureId = id;
  imgElement.src = url;
  imgElement.alt = description;
  likeElement.textContent = likes;
  commentElement.textContent = comments.length;

  return pictureElement;
};

/**
 * Создание миниатюр
 */
const createThumbnails = () => {
  clearThumbnails();
  const pictures = getPictures();
  pictures.forEach((picture) => picturePoolElement.appendChild(getThumbnailElement(picture))
  );
  picturePoolElement.addEventListener('click', onThumbnailClick);
};

export { createThumbnails };
