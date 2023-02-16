import JillySuImage from '../../images/Jilly-Su.jpg';
import KrasnayaPolyanaImage from '../../images/Krasnaya-Polyana.jpg';
import GelendzhikImage from '../../images/gelendzhik.jpg';
import KoktebelImage from '../../images/Koktebel.jpg';
import YoshkarOlaImage from '../../images/yoshkar-ola.jpg';
import SudakImage from '../../images/sudak.jpg';

const initialCards = [
  {
    name: 'Джилы-Су',
    link: JillySuImage
  },
  {
    name: 'Красная Поляна',
    link: KrasnayaPolyanaImage
  },
  {
    name: 'Геленджик',
    link: GelendzhikImage
  },
  {
    name: 'Коктебель',
    link: KoktebelImage
  },
  {
    name: 'Йошкар-Ола',
    link: YoshkarOlaImage
  },
  {
    name: 'Судак',
    link: SudakImage
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const largePhoto = document.querySelector('.popup__large-photo');
const caption = document.querySelector('.popup__caption');
const inputName = document.querySelector('#name-input');
const inputInfo = document.querySelector('#info-input');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__title-text');
const profileInfo = document.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements__list');

///////////////////////////////////////////////////////

export {
  largePhoto,
  caption,
  initialCards,
  inputName,
  inputInfo,
  profileEditBtn,
  placeAddBtn,
  profileName,
  profileInfo,
  elementsContainer,
  validationConfig
};
