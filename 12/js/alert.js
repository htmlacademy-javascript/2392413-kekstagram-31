const ALERT_SHOW_TIME = 5000;

const alertTemplate = document.querySelector('#data-error').content;
const alertContainer = alertTemplate
  .querySelector('.data-error')
  .cloneNode(true);
const errorTitle = alertContainer.querySelector('.data-error__title');

alertContainer.classList.add('hidden');

document.body.appendChild(alertContainer);

const showAlert = function (alertText) {
  errorTitle.textContent = alertText;
  alertContainer.classList.remove('hidden');
  setTimeout(() => {
    alertContainer.classList.add('hidden');
  }, ALERT_SHOW_TIME);
};

export { showAlert };
