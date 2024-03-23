const pictureUploadState = {
  pristine: null,
};

const getPristine = () => pictureUploadState.pristine;

const setPristine = (value) => {
  pictureUploadState.pristine = value;
};

export { getPristine, setPristine };
