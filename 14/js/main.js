import { showAlert } from './alert';
import { getData } from './api';
import { drawThumbnails } from './draw-thumbnails';
import { initFilters } from './filter-picture';
import { setPictures } from './picture-state';
import { initUploadPicture } from './upload-picture';

getData()
  .then((pictures) => {
    setPictures(pictures);
    initFilters();
    drawThumbnails();
  })
  .catch((err) => {
    showAlert(err.message);
  });

initUploadPicture();
