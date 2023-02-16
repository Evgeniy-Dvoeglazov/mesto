// Импортируем данные и соответствующих модулей

import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Сard.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { initialCards, inputName, inputInfo, profileEditBtn, placeAddBtn, profileName, profileInfo, elementsContainer, validationConfig } from '../scripts/utils/constants.js';
import './index.css';

// cобмраем экземпляры класса FormValidator в объект

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// Создаем экземпляр класса Section со слабым связыванием с классом Сard
// Section отвечвет за отрисовку карточек.

const cardList = new Section({
  items: initialCards,
  // Через функцию-колбек получаем разметку отдельной карточки
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, elementsContainer);

cardList.renderItems();

// Создаем эксземпляры класса PopupWithForm для формы добавления карточки
// и формы редактирования профиля

const popupWithFormAdd = new PopupWithForm('#popup_add', addPlace);
popupWithFormAdd.setEventListeners();

const popupWithFormEdit = new PopupWithForm('#popup_edit', addProfileInfo);
popupWithFormEdit.setEventListeners();

// Создаем эксземпляры класса UserInfo

const userInfo = new UserInfo({ name: profileName, info: profileInfo });

// Создаем экземпляр класса PopupWithImage

const popupWithImage = new PopupWithImage('#popup_photo');
popupWithImage.setEventListeners();

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
  formValidators['editForm'].resetValidation();
  const userDefaultInfo = userInfo.getUserInfo();
  inputName.value = userDefaultInfo.name;
  inputInfo.value = userDefaultInfo.info;
}

// Функция открытия попапа добавления карточки

function openFormAdd() {
  popupWithFormAdd.open();
  formValidators['addForm'].resetValidation();
}

// Функция открытия попапа с фотографией

function openPopupImage(image, title) {
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

  const userCard = {
    name: getInputValue.name,
    link: getInputValue.link
  };

  const newUserCard = new Section({
    items: userCard,
    renderer: (item) => {
      const cardElement = createCard(item);
      newUserCard.prependItem(cardElement);
    }
  }, elementsContainer);

  newUserCard.renderItem();
  popupWithFormAdd.close();
}

///////////////////////////////////////////////////////
// Устанавливаем слушатели событий на кнопки открытия форм

profileEditBtn.addEventListener('click', openFormEdit);
placeAddBtn.addEventListener('click', openFormAdd);
