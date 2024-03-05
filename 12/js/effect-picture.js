import {
  effectLevelSlider,
  effectLevelValue,
  effectList,
  imgUploadEffectLevel,
  uploadPicturePreview,
} from './const';

/**
 * В объекте хранится для каждого эффекта параметры слайдера и стиля.
 * CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
 * - Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
 * - Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
 * - Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
 * - Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
 * - Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
 * - Для эффекта «Оригинал» CSS-стили filter удаляются.
 */
const effectStyle = {
  none: {
    slider: {
      range: { min: 0, max: 0 },
      step: 0.1,
    },
    css: () => 'filter: none',
  },
  chrome: {
    slider: {
      range: { min: 0, max: 1 },
      step: 0.1,
    },
    css: (value) => `filter: grayscale(${value})`,
  },
  sepia: {
    slider: {
      range: { min: 0, max: 1 },
      step: 0.1,
    },
    css: (value) => `filter: sepia(${value})`,
  },
  marvin: {
    slider: {
      range: { min: 0, max: 100 },
      step: 1,
    },
    css: (value) => `filter: invert(${value}%)`,
  },
  phobos: {
    slider: {
      range: { min: 0, max: 3 },
      step: 0.1,
    },
    css: (value) => `filter: blur(${value}px)`,
  },
  heat: {
    slider: {
      range: { min: 1, max: 3 },
      step: 0.1,
    },
    css: (value) => `filter: brightness(${value})`,
  },
};

/**
 * Создание слайдера
 */
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
});

/**
 * Получение выбранного эффекта
 */
const getSelectedEffect = function () {
  return effectList.querySelector('input[type="radio"][name="effect"]:checked')
    .value;
};

const setSelectedEffect = function (value) {
  effectList.querySelector(
    `input[type="radio"][value="${value}"]`
  ).checked = true;
};

/**
 * Обработчик изменения ползунка слайдера.
 * По выбранному эффеку получаем строку с css, добавляем ее в текущий стиль.
 * Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется
 * сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в
 * поле .effect-level__value в виде числа. При изменении уровня интенсивности эффекта
 * (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются
 * следующим образом (см. effectStyle).
 */
effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  const curentEffect = getSelectedEffect();
  const newStyleEffect = effectStyle[curentEffect]?.css(effectLevelValue.value);

  uploadPicturePreview.style.cssText += newStyleEffect;
});

/**
 * Обработчик переключателя эффекта.
 * При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
 * слайдер, CSS-стиль изображения и значение поля должны обновляться.
 *
 * Проблема: точно сбрасывать до 100%? Страшно же.
 */
const onEffectItemClick = function (evt) {
  if (
    evt.target !== effectList &&
    !evt.target.classList.contains('effects__radio')
  ) {
    return;
  }
  const curentEffect = getSelectedEffect();
  const filterStyle = effectStyle[curentEffect];

  effectLevelSlider.noUiSlider.updateOptions(filterStyle.slider);
  effectLevelSlider.noUiSlider.set(0);

  if (curentEffect === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
};

//Навешиваем событие на весь список. В обработчике будем ловить evt.target.
effectList.addEventListener('click', onEffectItemClick);

/**
 * Это для того чтобы при открытии формы слайдер и его контейнер (элемент
 * .img-upload__effect-level) скрывались.
 */
const initEffectPicture = function () {
  setSelectedEffect('none');
  effectList.dispatchEvent(new Event('click'));
};

export { initEffectPicture };
