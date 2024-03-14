import { PICTURE_RANDOM_COUNT } from './config';
import { getUniqueRandomArrayElement } from './utils';

const pictureState = {
  initComplete: false,
  pictures: [],
  selectedPicture: null,
  lastCommentShowItem: -1,
  selectedFilter: null,
  filters: {
    'filter-default': (pictures) => pictures,
    'filter-random': (pictures) =>
      getUniqueRandomArrayElement(pictures, PICTURE_RANDOM_COUNT),
    'filter-discussed': (pictures) =>
      pictures.slice().sort((a, b) => b.comments.length - a.comments.length),
  },
};

const defaultPictureState = { ...pictureState };

const isInitComplete = function () {
  return pictureState.initComplete;
};

const setInitComplete = function (value) {
  pictureState.initComplete = value;
};

const getPictureCount = function () {
  return pictureState.pictures.length;
};

const getPictures = function () {
  const currentFilter = pictureState.selectedFilter.id;
  const filterResult = pictureState.filters[currentFilter];
  return filterResult(pictureState.pictures);
};

const setPictures = function (value) {
  pictureState.pictures = value ? value : [];
};

const getPictureById = function (pictureId) {
  return pictureState.pictures.find((element) => element.id === pictureId);
};

const getSelectedPicture = function () {
  return pictureState.selectedPicture;
};

const setSelectedPicture = function (pictureId) {
  pictureState.selectedPicture = getPictureById(pictureId);
};

const resetSelectedPicture = function () {
  pictureState.selectedPicture = defaultPictureState.selectedPicture;
  pictureState.lastCommentShowItem = defaultPictureState.lastCommentShowItem;
};

const getComments = function () {
  return pictureState.selectedPicture.comments;
};

const getLastCommentShowItem = function () {
  return pictureState.lastCommentShowItem;
};

const setLastCommentShowItem = function (value) {
  pictureState.lastCommentShowItem = value;
};

const getSelectedFilter = function () {
  return pictureState.selectedFilter;
};

const setSelectedFilter = function (value) {
  pictureState.selectedFilter = value;
};

export {
  getComments,
  getLastCommentShowItem,
  getPictureCount,
  getPictures,
  getSelectedFilter,
  getSelectedPicture,
  isInitComplete,
  resetSelectedPicture,
  setInitComplete,
  setLastCommentShowItem,
  setPictures,
  setSelectedFilter,
  setSelectedPicture,
};
