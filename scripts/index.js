/* ------- Импортируем данные и соответствующих модулей --------*/

import FormValidator from './FormValidator.js';
import { initialCards, Card } from './card.js';

///////////////////////////////////////////////////////

const profileEditBtn = document.querySelector('.profile__edit-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
export const popupPhoto = document.querySelector('#popup_photo');
const formEdit = document.querySelector('#popup__form_edit');
const formAdd = document.querySelector('#popup__form_add');
const buttonCloseFormAdd = document.querySelector('#popup__close-btn_add');
const buttonCloseFormEdit = document.querySelector('#popup__close-btn_edit');
const profileName = document.querySelector('.profile__title-text');
const profileInfo = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('#name-input');
const inputInfo = document.querySelector('#info-input');
const inputPlaceName = document.querySelector('#placename-input');
const inputPlaceSrc = document.querySelector('#placesrc-input');
const buttonSubmitPopupAdd = document.querySelector('#popupAdd__button');
const buttonSubmitPopupEdit = document.querySelector('#popupEdit__button');
export const largePhoto = document.querySelector('.popup__large-photo');
export const buttonCloseLargePhoto = document.querySelector('#popup__close-btn_largePhoto');
export const caption = document.querySelector('.popup__caption');
const elementsContainer = document.querySelector('.elements__list');

///////////////////////////////////////////////////////

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

///////////////////////////////////////////////////////
/* ------- Создаем экземпляры класса FormValidator для попапов --------*/

const popupEditValidation = new FormValidator(enableValidation, popupEdit);
popupEditValidation.enableValidation();

const popupAddValidation = new FormValidator(enableValidation, popupAdd);
popupAddValidation.enableValidation();

///////////////////////////////////////////////////////
/* ------- Создаем экземпляры карточек при загрузке страницы --------*/

initialCards.forEach((item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.generateCard();
  elementsContainer.append(cardElement);
});

///////////////////////////////////////////////////////
/* ------- Функции открытии я закрытия попапов --------*/

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

///////////////////////////////////////////////////////
/* ------- Закрытие попапа нажатием на Esc --------*/

function closePopupEscape(evt) {
  console.log('работает');
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

///////////////////////////////////////////////////////
/* ------- Закрытие попапа кликом на оверлей --------*/

function closePopupOverlay(evt) {
  if (evt.srcElement === evt.target) {
    closePopup(evt.target);
  }
}

///////////////////////////////////////////////////////
/* ------- Функции открытия попапов с информацией о профиле и добавления карточки --------*/

function openFormEdit() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  buttonSubmitPopupEdit.classList.remove('popup__button_disabled');
  buttonSubmitPopupEdit.disabled = false;
}

function openFormAdd() {
  openPopup(popupAdd);
  formAdd.reset();
  buttonSubmitPopupAdd.classList.add('popup__button_disabled');
  buttonSubmitPopupAdd.disabled = true;
}

///////////////////////////////////////////////////////
/* ------- Функции изменения информации в профиле и добавления новой карточки (с созданием экземпляра класса Card) --------*/

function addProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  closePopup(popupEdit);
}

function addPlace(evt) {
  evt.preventDefault();
  const cardContent = {
    name: inputPlaceName.value,
    link: inputPlaceSrc.value
  };

  const newCardAdd = new Card(cardContent, '.element-template');
  const newCardElement = newCardAdd.generateCard();
  elementsContainer.prepend(newCardElement);
  closePopup(popupAdd);
}

///////////////////////////////////////////////////////
/* ------- Устанавливаем слушатели событий --------*/

popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupPhoto.addEventListener('click', closePopupOverlay);

buttonCloseFormEdit.addEventListener('click', () => closePopup(popupEdit));
buttonCloseFormAdd.addEventListener('click', () => closePopup(popupAdd));
buttonCloseLargePhoto.addEventListener('click', () => closePopup(popupPhoto));

profileEditBtn.addEventListener('click', openFormEdit);
placeAddBtn.addEventListener('click', openFormAdd);

formEdit.addEventListener('submit', addProfileInfo);
formAdd.addEventListener('submit', addPlace);
