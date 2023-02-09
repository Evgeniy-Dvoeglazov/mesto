/* ------- Импортируем данные и соответствующих модулей --------*/

import FormValidator from '../FormValidator.js';
import Card from '../components/Сard.js';
import { popupPhoto, initialCards, largePhoto } from '../utils/constants.js';
import { openPopup, closePopup } from '../utils/utils.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Popup from '../components/Popup.js';

///////////////////////////////////////////////////////

const profileEditBtn = document.querySelector('.profile__edit-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
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
const elementsContainer = document.querySelector('.elements__list');
const buttonCloseLargePhoto = document.querySelector('#popup__close-btn_largePhoto');


///////////////////////////////////////////////////////

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

///////////////////////////////////////////////////////
/* ------- Создаем экземпляры класса FormValidator для попапов --------*/

const popupEditValidation = new FormValidator(validationConfig, popupEdit);
popupEditValidation.enableValidation();

const popupAddValidation = new FormValidator(validationConfig, popupAdd);
popupAddValidation.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-template', openPopupImage);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elementsContainer);

cardList.renderItems();

const popupAddClass = new PopupWithForm(popupAdd, addPlace);
popupAddClass.setEventListeners();

///////////////////////////////////////////////////////

function createCard(cardConfig) {
  const card = new Card(cardConfig, '.element-template', openPopupImage);
  return card.generateCard();
}

///////////////////////////////////////////////////////
/* ------- Закрытие попапа кликом на оверлей --------*/


///////////////////////////////////////////////////////
/* ------- Функции открытия попапов с информацией о профиле и добавления карточки --------*/

function openFormEdit() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  popupEditValidation.enableSubmitButton();
}

function openFormAdd() {
  popupAddClass.open();
  formAdd.reset();
  popupAddValidation.disableSubmitButton();
}

function openPopupImage(image, title, altImage) {
  const popupWithImage = new PopupWithImage(popupPhoto, { image, title, altImage });
  popupWithImage.open();
  popupWithImage.setEventListeners();
}

///////////////////////////////////////////////////////
/* ------- Функции изменения информации в профиле и добавления новой карточки (с созданием экземпляра класса Card) --------*/

function addProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  closePopup(popupEdit);
}

function addPlace() {
  const cardContent = {
    name: inputPlaceName.value,
    link: inputPlaceSrc.value
  };

  elementsContainer.prepend(createCard(cardContent));
  closePopup(popupAdd);
}

///////////////////////////////////////////////////////
/* ------- Устанавливаем слушатели событий --------*/
/*
popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupPhoto.addEventListener('click', closePopupOverlay);

buttonCloseFormEdit.addEventListener('click', () => closePopup(popupEdit));
buttonCloseFormAdd.addEventListener('click', () => closePopup(popupAdd));
buttonCloseLargePhoto.addEventListener('click', () => closePopup(popupPhoto));

*/
profileEditBtn.addEventListener('click', openFormEdit);
placeAddBtn.addEventListener('click', openFormAdd);

// formEdit.addEventListener('submit', addProfileInfo);
// formAdd.addEventListener('submit', addPlace);
