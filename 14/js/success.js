import { uploadFormClose } from './upload-picture';

const templateSuccess = document.querySelector('#success').content;
const successContainer = templateSuccess
  .querySelector('.success')
  .cloneNode(true);
successContainer.classList.add('hidden');
const successButton = successContainer.querySelector('.success__button');

document.body.appendChild(successContainer);

const onSuccessButtonKeyDown = function (evt) {
  if (evt.key === 'Escape') {
    successFormClose(evt);
  }
};

const onSuccessButtonClick = function (evt) {
  successFormClose(evt);
};

function successFormClose(evt) {
  successContainer.classList.add('hidden');
  document.removeEventListener('keydown', onSuccessButtonKeyDown);
  uploadFormClose(evt);
}

successButton.addEventListener('click', onSuccessButtonClick);

const showSuccess = function () {
  document.addEventListener('keydown', onSuccessButtonKeyDown);
  successContainer.classList.remove('hidden');
};

export { showSuccess };
