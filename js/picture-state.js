import { PICTURE_RANDOM_COUNT } from './config';
import { getUniqueRandomArrayElement } from './utils';

const pictureState = {
  useDebounce: false,
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

const useDebounce = () => pictureState.useDebounce;

const setUseDebounce = (value) => {
  pictureState.useDebounce = value;
};

const getPictureCount = () => pictureState.pictures.length;

const getPictures = () => {
  const currentFilter = pictureState.selectedFilter.id;
  const filterResult = pictureState.filters[currentFilter];
  return filterResult(pictureState.pictures);
};

const setPictures = (value) => {
  pictureState.pictures = value ? value : [];
};

const getPictureById = (pictureId) => pictureState.pictures.find((element) => element.id === pictureId);

const getSelectedPicture = () => pictureState.selectedPicture;

const setSelectedPicture = (pictureId) => {
  pictureState.selectedPicture = getPictureById(pictureId);
};

const resetSelectedPicture = () => {
  pictureState.selectedPicture = defaultPictureState.selectedPicture;
  pictureState.lastCommentShowItem = defaultPictureState.lastCommentShowItem;
};

const getComments = () => pictureState.selectedPicture.comments;

const getLastCommentShowItem = () => pictureState.lastCommentShowItem;

const setLastCommentShowItem = (value) => {
  pictureState.lastCommentShowItem = value;
};

const getSelectedFilter = () => pictureState.selectedFilter;

const setSelectedFilter = (value) => {
  pictureState.selectedFilter = value;
};

export {
  getComments,
  getLastCommentShowItem,
  getPictureCount,
  getPictures,
  getSelectedFilter,
  getSelectedPicture,
  resetSelectedPicture,
  setLastCommentShowItem,
  setPictures,
  setSelectedFilter,
  setSelectedPicture,
  setUseDebounce,
  useDebounce
};

