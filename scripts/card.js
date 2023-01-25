/* ------- Импортируем данные --------*/

import { largePhoto, buttonCloseLargePhoto, openPopup, closePopup, popupPhoto, caption } from './index.js';

///////////////////////////////////////////////////////

export const initialCards = [
  {
    name: 'Джилы-Су',
    link: './images/Jilly-Su.jpg'
  },
  {
    name: 'Красная Поляна',
    link: './images/Krasnaya-Polyana.jpg'
  },
  {
    name: 'Геленджик',
    link: './images/gelendzhik.jpg'
  },
  {
    name: 'Коктебель',
    link: './images/Koktebel.jpg'
  },
  {
    name: 'Йошкар-Ола',
    link: './images/yoshkar-ola.jpg'
  },
  {
    name: 'Судак',
    link: './images/sudak.jpg'
  }
];

///////////////////////////////////////////////////////
/* ------- Создаем класс карточки места --------*/

export class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._altImage = "фотография " + data.name;
    this._templateSelector = templateSelector;
  }

  /* ------- Получаем разметку из template-элемента и клониурем ее --------*/

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return elementTemplate;
  }

  /* ------- Публичный метод подготовки карточки к публикации --------*/

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__text').textContent = this._title;
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._altImage;

    return this._element;
  }

  /* ------- Методы открытия и закрытия попапа с развернутой фотографией --------*/

  _handleOpenPopup() {
    openPopup(popupPhoto);
    largePhoto.src = this._image;
    largePhoto.alt = this._altImage;
    caption.textContent = this._title;
  }

  _handleClosePopup() {
    closePopup(popupPhoto);
    largePhoto.src = '';
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
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    buttonCloseLargePhoto.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._removeCard();
    });

    this._element.querySelector('.element__btn-like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
  }
}
