import { DEBOUNCE_TIMEOUT } from './config';
import {
  filtersButtonElement,
  filtersContainerElement,
  filtersFormElement,
} from './page-elements';
import {
  getPictureCount,
  getSelectedFilter,
  setSelectedFilter,
  setUseDebounce,
  useDebounce,
} from './picture-state';
import { createThumbnails } from './thumbnails';
import { addOrRemoveClass, debounce } from './utils';

/**
 * Устранение дребезга. Перерисовываем фото только через DEBOUNCE_TIMEOUT
 */
const getThumbnailsDebounce = debounce(createThumbnails, DEBOUNCE_TIMEOUT);

/**
 * Отрисовка выбранного фильтра
 */
const renderActiveFilter = () => {
  const currentFilter = getSelectedFilter();
  filtersButtonElement.forEach((element) => {
    addOrRemoveClass(
      element,
      'img-filters__button--active',
      element === currentFilter
    );
  });

  if (useDebounce()) {
    getThumbnailsDebounce();
  } else {
    createThumbnails();
    setUseDebounce(true);
  }
};

/**
 * Применение выбранного фильтра
 * @param {EventTarget} target
 */
const applyFilter = (target) => {
  setSelectedFilter(target);
  renderActiveFilter();
};

/**
 * Обработчик события клик по фильтру
 */
const onFilterClick = (evt) => {
  applyFilter(evt.target);
};

/**
 * Инициализация фильтров
 */
const initFilters = () => {
  filtersFormElement.addEventListener('click', onFilterClick);
  addOrRemoveClass(
    filtersContainerElement,
    'img-filters--inactive',
    getPictureCount() === 0
  );

  applyFilter(filtersFormElement.querySelector('.img-filters__button--active'));
};

export { initFilters };
