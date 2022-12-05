let profileEditBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let editForm = document.querySelector('.popup__form');
let closeFormBtn = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__title-text');
let profileInfo = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('.popup__text_type_name');
let inputInfo = document.querySelector('.popup__text_type_info');

function openForm() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
}

profileEditBtn.addEventListener('click', openForm);

function addInformation(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  popup.classList.remove('popup_opened');
}

editForm.addEventListener('submit', addInformation);

function closeForm() {
  popup.classList.remove('popup_opened');
}

closeFormBtn.addEventListener('click', closeForm);
