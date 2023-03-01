export default class Card {
  constructor(cardData, templateSelector, handleCardClick, handleCardDelete, userId) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._likes = cardData.likes.length;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._userId = userId;
    this._altImage = "фотография " + cardData.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  // Получаем разметку из template-элемента и клониурем ее

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return elementTemplate;
  }

  // Публичный метод подготовки карточки к публикации

  generateCard() {
    this._element = this._getTemplate();

    if (this._userId === this._ownerId) {
      this._element.querySelector('.element__delete-btn').classList.add('element__delete-btn_visible');
    }

    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._element.querySelector('.element__text').textContent = this._title;
    this._element.querySelector('.element__like-quantity').textContent = this._likes;
    this._elementImage.src = this._image;
    this._elementImage.alt = this._altImage;

    return this._element;
  }

  // Метод открытия попапа с развернутой фотографией

  _openPopupImage() {
    this._handleCardClick(this._image, this._title);
  }

  // Метод открытия попапа удаления карточки

  _openPopupDelete() {
    this._handleCardDelete(this._cardId, this._element);
  }

  // Метод удаления карточки

  // _removeCard() {
  //   this._element.remove();
  // }

  // Метод лайка карточки

  _likeCard(evt) {
    evt.target.classList.toggle('element__btn-like_active');
  }

  // Метод установки слушателей событий

  _setEventListeners() {

    this._elementImage.addEventListener('click', () => {
      this._openPopupImage();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._openPopupDelete();
    });

    this._element.querySelector('.element__btn-like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
  }
}
