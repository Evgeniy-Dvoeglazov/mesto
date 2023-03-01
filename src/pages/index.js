// Импортируем данные и соответствующих модулей

import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Сard.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupCardDelete from '../scripts/components/PopupCardDelete.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import { initialCards, inputName, inputInfo, profileEditBtn, placeAddBtn, profileName, profileInfo, elementsContainer, validationConfig, avatar } from '../scripts/utils/constants.js';
import './index.css';
//////////////////////////

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '0071e523-0a93-4518-84fa-22ae645aeded',
    'Content-Type': 'application/json'
  }
}

// Создаем экземпляр класса Section со слабым связыванием с классом Сard
// Section отвечвет за отрисовку карточек.

const cardList = new Section({
  items: [],
  // Через функцию-колбек получаем разметку отдельной карточки
  renderer: (item, userId) => {
    const cardElement = createCard(item, userId);
    cardList.addItem(cardElement);
  }
}, elementsContainer);

const api = new Api(apiConfig);

api.getInitialCards()
  .then((res) => {
    cardList.renderItems(res, user.id);
  });

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

// Создаем эксземпляры класса PopupWithForm для формы добавления карточки
// и формы редактирования профиля

const popupWithFormAdd = new PopupWithForm('#popup_add', addPlace);
popupWithFormAdd.setEventListeners();

const popupWithFormEdit = new PopupWithForm('#popup_edit', addProfileInfo);
popupWithFormEdit.setEventListeners();

// Создаем эксземпляры класса UserInfo

const user = new UserInfo({ name: profileName, info: profileInfo });

// Создаем экземпляр класса PopupWithImage

const popupWithImage = new PopupWithImage('#popup_photo');
popupWithImage.setEventListeners();

// Создаем экземпляр класса PopupCardDelete

const popupCardDelete = new PopupCardDelete('#popup_delete', deletePlace);
popupCardDelete.setEventListeners();

///////////////////////////////////////////////////////

// const userDefaultInfo = userInfo.getUserInfo();

api.getUserInfo()
  .then((res) => {
    user.setUserInfo(res)
    avatar.src = res.avatar;
    user.id = res._id;
  });


// Функция создания карточки
// Создает экземпляр класса Card

function createCard(cardConfig, userId) {
  const card = new Card(cardConfig, '.element-template', openPopupImage, openPopupDelete, userId);
  return card.generateCard();
}

// Функция открытия попапа редактирования профиля

function openFormEdit() {
  popupWithFormEdit.open();
  formValidators['editForm'].resetValidation();

  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
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

// Функция открытия попапа удаления карточки

function openPopupDelete(cardId, cardElement) {
  popupCardDelete.open(cardId, cardElement);
}

///////////////////////////////////////////////////////
// Функции изменения информации в профиле и добавления
// новой карточки (с созданием экземпляра класса Card) при нажатии на submit

function addProfileInfo(getInputValue) {

  api.setUserInfo(getInputValue)
    .then((res) => {
      user.setUserInfo(res);
    });

  popupWithFormEdit.close();
}

function addPlace(getInputValue) {

  const userCard = {
    name: getInputValue.name,
    link: getInputValue.link
  };

  api.addCard(userCard)
    .then((post) => {
      const cardElement = createCard(post, user.id);
      cardList.prependItem(cardElement);
    });

  // const cardElement = createCard(userCard);
  // cardList.prependItem(cardElement);

  popupWithFormAdd.close();
}

function deletePlace(cardId, cardElement) {
api.deleteCard(cardId)
  .then(() => {
    cardElement.remove();
    popupCardDelete.close();
  })
}

///////////////////////////////////////////////////////
// Устанавливаем слушатели событий на кнопки открытия форм

profileEditBtn.addEventListener('click', openFormEdit);
placeAddBtn.addEventListener('click', openFormAdd);
