// Импортируем данные и соответствующих модулей

import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Сard.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { popupPhoto, initialCards, inputName, inputInfo, profileEditBtn, placeAddBtn, popupEdit, popupAdd, formAdd, profileName, profileInfo, elementsContainer, validationConfig } from '../scripts/utils/constants.js';
import './index.css';


///////////////////////////////////////////////////////
// Создаем экземпляры класса FormValidator для попапов

const popupEditValidation = new FormValidator(validationConfig, popupEdit);
popupEditValidation.enableValidation();

const popupAddValidation = new FormValidator(validationConfig, popupAdd);
popupAddValidation.enableValidation();

// Создаем экземпляр класса Section со слабым связыванием с классом Сard
// Section отвечвет за отрисовку карточек.

const cardList = new Section({
  items: initialCards,
  // Через функцию-колбек получаем разметку отдельной карточки
  renderer: (item) => {
    const card = new Card(item, '.element-template', openPopupImage);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elementsContainer);

cardList.renderItems();

// Создаем эксземпляры класса PopupWithForm для формы добавления карточки
// и формы редактирования профиля

const popupWithFormAdd = new PopupWithForm(popupAdd, addPlace);
popupWithFormAdd.setEventListeners();

const popupWithFormEdit = new PopupWithForm(popupEdit, addProfileInfo);
popupWithFormEdit.setEventListeners();

// Создаем эксземпляры класса UserInfo

const userInfo = new UserInfo({ name: profileName, info: profileInfo });

///////////////////////////////////////////////////////

// Функция создания карточки
// Создает экземпляр класса Card

function createCard(cardConfig) {
  const card = new Card(cardConfig, '.element-template', openPopupImage);
  return card.generateCard();
}

// Функция открытия попапа редактирования профиля

function openFormEdit() {
  popupWithFormEdit.open();
  const userDefaultInfo = userInfo.getUserInfo();
  inputName.value = userDefaultInfo.name;
  inputInfo.value = userDefaultInfo.info;
  popupEditValidation.enableSubmitButton();
}

// Функция открытия попапа добавления карточки

function openFormAdd() {
  popupWithFormAdd.open();
  formAdd.reset();
  popupAddValidation.disableSubmitButton();
}

// Функция открытия попапа с фотографией.
// Создает экземпляр класса PopupWithImage

function openPopupImage(image, title) {
  const popupWithImage = new PopupWithImage(popupPhoto);
  popupWithImage.setEventListeners();
  popupWithImage.open(image, title);
}

///////////////////////////////////////////////////////
// Функции изменения информации в профиле и добавления
// новой карточки (с созданием экземпляра класса Card) при нажатии на submit

function addProfileInfo(getInputValue) {
  userInfo.setUserInfo(getInputValue);
  popupWithFormEdit.close();
}

function addPlace(getInputValue) {
  elementsContainer.prepend(createCard(getInputValue));
  popupWithFormAdd.close();
}

///////////////////////////////////////////////////////
// Устанавливаем слушатели событий на кнопки открытия форм

profileEditBtn.addEventListener('click', openFormEdit);
placeAddBtn.addEventListener('click', openFormAdd);
