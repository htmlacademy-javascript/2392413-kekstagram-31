import { showAlert } from './alert';
import { getData } from './api';
import { drawThumbnails } from './draw-thumbnails';
import { initUploadPicture } from './upload-picture';

getData()
  .then((pictures) => {
    drawThumbnails(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

initUploadPicture();
