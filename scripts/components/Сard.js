/* ------- Импортируем данные --------*/

import { openPopup, closePopup } from '../utils/utils.js';
import { popupPhoto, largePhoto, caption } from '../utils/constants.js';

///////////////////////////////////////////////////////
/* ------- Создаем класс карточки места --------*/

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._altImage = "фотография " + data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  /* ------- Получаем разметку из template-элемента и клониурем ее --------*/

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return elementTemplate;
  }

  /* ------- Публичный метод подготовки карточки к публикации --------*/

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._element.querySelector('.element__text').textContent = this._title;
    this._elementImage.src = this._image;
    this._elementImage.alt = this._altImage;

    return this._element;
  }

  /* ------- Методы открытия и закрытия попапа с развернутой фотографией --------*/


  _openPopupImage() {
    this._handleCardClick(this._image, this._title, this._altImage);
  }

  /* ------- Метод удаления карточки --------*/

  _removeCard() {
    this._element.remove();
  }

  /* ------- Метод лайка карточки --------*/

  _likeCard(evt) {
    evt.target.classList.toggle('element__btn-like_active');
  }

  /* ------- Метод установки слушателей событий --------*/

  _setEventListeners() {


    this._elementImage.addEventListener('click', () => {
      this._openPopupImage();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._removeCard();
    });

    this._element.querySelector('.element__btn-like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
  }
}
