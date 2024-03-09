import {
  DEBOUNCE_TIMEOUT,
  filterButtons,
  filterContainer,
  filterForm,
} from './const';
import { drawThumbnails } from './draw-thumbnails';
import { getSelectedFilter, setSelectedFilter } from './picture-state';
import { debounce } from './utils';

const resetAllFilters = function () {
  filterButtons.forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });
};

const drawThumbnailsDebounce = debounce(drawThumbnails, DEBOUNCE_TIMEOUT);

const setActiveFilter = function () {
  resetAllFilters();
  const currentFilter = getSelectedFilter();
  currentFilter.classList.add('img-filters__button--active');
  drawThumbnailsDebounce();
};

const onFilterClick = function (evt) {
  evt.preventDefault();
  setSelectedFilter(evt.target);
  setActiveFilter();
};

const initFilters = function () {
  filterContainer.classList.remove('img-filters--inactive');
  setSelectedFilter(filterForm.querySelector('.img-filters__button--active'));
  filterForm.addEventListener('click', onFilterClick);
};

export { initFilters };
