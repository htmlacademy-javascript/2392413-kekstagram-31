import { effectStyle } from './config';
import {
  effectLevelSliderElement,
  effectLevelValueElement,
  effectsListElement,
  imgUploadEffectLevelElement,
  picturePreviewElement,
} from './page-elements';
import { addOrRemoveClass } from './utils';

/**
 * Получение выбранного эффекта
 */
const getSelectedEffect = () => effectsListElement.querySelector(
  'input[type="radio"][name="effect"]:checked'
).value;

/**
 * Установить эффект
 * @param {string} value код эффекта none|chrome|sepia|marvin|phobos|heat
 */
const setSelectedEffect = (value) => {
  effectsListElement.querySelector(
    `input[type="radio"][value="${value}"]`
  ).checked = true;
};

/**
 * Применить эффект
 */
const applyEffect = () => {
  effectLevelValueElement.value = Number(effectLevelSliderElement.noUiSlider.get());
  const curentEffect = getSelectedEffect();
  const newStyleEffect = effectStyle[curentEffect]?.css(
    effectLevelValueElement.value
  );
  Object.assign(picturePreviewElement.style, newStyleEffect);
};

/**
 * Создание слайдера
 */
const initUISlider = () => {
  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
  });

  effectLevelSliderElement.noUiSlider.on('slide', applyEffect);
};

/**
 * Сброс состояния эффектов.
 * При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
 * слайдер, CSS-стиль изображения и значение поля должны обновляться.
 */
const resetEffect = () => {
  const curentEffect = getSelectedEffect();
  const sliderOption = effectStyle[curentEffect].slider;
  effectLevelSliderElement.noUiSlider.updateOptions(sliderOption);
  effectLevelSliderElement.noUiSlider.set(sliderOption.range.max);
  applyEffect();
  addOrRemoveClass(
    imgUploadEffectLevelElement,
    'hidden',
    curentEffect === 'none'
  );
};

/**
 * Обработчик переключателя эффекта.
 */
const onEffectItemClick = (evt) => {
  evt.preventDefault();
  if (evt.target !== effectsListElement &&
    !evt.target.classList.contains('effects__radio')) {
    return;
  }
  resetEffect();
};

/**
 * Инициализация эффектов.
 */
const initEffectPicture = () => {
  if (!effectLevelSliderElement.noUiSlider) {
    initUISlider();
  }
  effectsListElement.addEventListener('change', onEffectItemClick);
  setSelectedEffect('none');
  resetEffect();
};

export { initEffectPicture, resetEffect };
