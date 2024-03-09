import {
  scaleControlBigger,
  scaleControlSmaller,
  scaleControlValue,
  uploadPicturePreview,
} from './const';

const SCALE_STEP = 25;

/**
 * Функция получения текущего значения масштаба в процентах
 */
const getScaleValue = function () {
  return +scaleControlValue.value.replace('%', '');
};

/**
 * Обработчик клика на +/- масштаба
 * dispatchEvent тут вызываю т.к. value у scaleControlValue изменяю программно и
 * события change|input не отрабатывают. Решил искусственно вызвать чтобы отработал
 * лиснер. Ну опять же вдруг readonly уберут у scaleControlValue и тогда с клавиатуры
 * все будет работать.
 */
const setScaleValue = function (changeValue) {
  const currentScaleValue = getScaleValue();
  const newScaleValue = currentScaleValue + changeValue;

  if (newScaleValue < 0 || newScaleValue > 100) {
    return;
  }
  scaleControlValue.value = `${newScaleValue}%`;

  scaleControlValue.dispatchEvent(new Event('change'));
};

const onScaleControlSmallerClick = function () {
  setScaleValue(SCALE_STEP * -1);
};

const onScaleControlBiggerClick = function () {
  setScaleValue(SCALE_STEP);
};

/**
 * Обработчик изменения значения масштаба.
 * Тут просто стиль надо допнуть
 */
const onScaleValueChange = function () {
  const currentScaleValue = getScaleValue() / 100;
  uploadPicturePreview.style.cssText += `transform: scale(${currentScaleValue})`;
};

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
scaleControlValue.addEventListener('change', onScaleValueChange);

const initScalePicture = function () {
  scaleControlValue.value = 100;
  onScaleValueChange();
};

export { initScalePicture };
