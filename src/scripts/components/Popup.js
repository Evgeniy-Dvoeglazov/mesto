export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  // Публичные методы открытия и закрытия попапов

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Приватный методы закрытия попапа на Escape

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Устанавливаем слушатели на закрытие попапа по кнопке и по клику на overlay

  setEventListeners() {
    this._popup.querySelector('.popup__close-btn').addEventListener('click', () => this.close());

    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}
