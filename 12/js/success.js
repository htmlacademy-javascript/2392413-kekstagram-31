import { onClickUploadClose } from './upload-picture';

const templateSuccess = document.querySelector('#success').content;
const successContainer = templateSuccess
  .querySelector('.success')
  .cloneNode(true);
successContainer.classList.add('hidden');
const successButton = successContainer.querySelector('.success__button');

document.body.appendChild(successContainer);

const onKeyDownSuccessButton = function (evt) {
  if (
    (evt.type === 'keydown' && evt.key === 'Escape') ||
    evt.type === 'click'
  ) {
    successContainer.classList.add('hidden');
    document.removeEventListener('keydown', onKeyDownSuccessButton);
    onClickUploadClose(evt);
  }
};

const showSuccess = function () {
  document.addEventListener('keydown', onKeyDownSuccessButton);
  successContainer.classList.remove('hidden');
};

successButton.addEventListener('click', onKeyDownSuccessButton);

export { showSuccess };
