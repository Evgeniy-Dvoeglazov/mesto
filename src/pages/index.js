// Импортируем данные и соответствующих модулей

import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Сard.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupCardDelete from '../scripts/components/PopupCardDelete.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import { profileEditBtn, placeAddBtn, profileName, profileInfo, elementsContainer, validationConfig, avatar, avatarBtn, apiConfig } from '../scripts/utils/constants.js';
import './index.css';
///////////////////////////////////////////////////////////////////////
// Создаем экземпляр класса Section со слабым связыванием с классом Сard
// Section отвечвет за отрисовку карточек.

const cardList = new Section((item, userId) => {
  const cardElement = createCard(item, userId);
  cardList.addItem(cardElement);
}, elementsContainer);

const api = new Api(apiConfig);

// cобираем экземпляры класса FormValidator в объект

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

const popupWithFormAvatar = new PopupWithForm('#popup_changeAvatar', changeAvatar);
popupWithFormAvatar.setEventListeners();

// Создаем эксземпляры класса UserInfo

const user = new UserInfo({ name: profileName, info: profileInfo, avatar: avatar });

// Создаем экземпляр класса PopupWithImage

const popupWithImage = new PopupWithImage('#popup_photo');
popupWithImage.setEventListeners();

// Создаем экземпляр класса PopupCardDelete

const popupCardDelete = new PopupCardDelete('#popup_delete', removePlace);
popupCardDelete.setEventListeners();

///////////////////////////////////////////////////////
// Экземпляры класса Api для первоначального отображения карточек
// и информации о профиле с сервера

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    user.id = userData._id;

    cardList.renderItems(cards, user.id);
  })
  .catch((err) => {
    console.log(err);
  });

// Функция создания карточки
// Создает экземпляр класса Card

function createCard(cardConfig, userId) {
  const card = new Card(cardConfig, '.element-template', openPopupImage, openPopupDelete, userId, addLikeCard, removeLikeCard);
  return card.generateCard();
}

// Функция открытия попапа редактирования профиля

function openFormEdit() {
  popupWithFormEdit.open();
  formValidators['editForm'].resetValidation();

  const { name, info } = user.getUserInfo();
  popupWithFormEdit.setInputValues({ name, info });
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

// Функция открытия попапа изменения аватара

function openPopupAvatar() {
  popupWithFormAvatar.open();
  formValidators['changeAvatarForm'].resetValidation();
}

///////////////////////////////////////////////////////
// Функции изменения информации в профиле и добавления
// новой карточки (с созданием экземпляра класса Card) при нажатии на submit

function addProfileInfo(getInputValue) {
  return api.setUserInfo(getInputValue)
    .then((res) => {
      user.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
}

function addPlace(getInputValue) {
  const userCard = {
    name: getInputValue.name,
    link: getInputValue.link
  };

  return api.addCard(userCard)
    .then((res) => {
      const cardElement = createCard(res, user.id);
      cardList.prependItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
}

// Функции изменения аватара

function changeAvatar(getInputValue) {
  return api.changeAvatar(getInputValue)
    .then((res) => {
      user.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
}

// Функции удаления карточки

function removePlace(cardId, cardElement) {
  api.removeCard(cardId)
    .then(() => {
      cardElement.remove();
      popupCardDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функции добавления лайка

function addLikeCard(cardId, card) {
  api.addLike(cardId)
    .then((res) => {
      card.changeLikeQuantity(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функции удаления лайка

function removeLikeCard(cardId, card) {
  api.removeLike(cardId)
    .then((res) => {
      card.changeLikeQuantity(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

///////////////////////////////////////////////////////
// Устанавливаем слушатели событий на кнопки открытия форм

profileEditBtn.addEventListener('click', openFormEdit);
placeAddBtn.addEventListener('click', openFormAdd);
avatarBtn.addEventListener('click', openPopupAvatar);
