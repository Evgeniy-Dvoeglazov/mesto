export default class UserInfo {
  constructor({ name, info, avatar }) {
    this._name = name;
    this._info = info;
    this._avatar = avatar;
  }

  // Метод подставляет данные о пользователе при открытии страницы

  getUserInfo() {
    const defaultInfo = { name: this._name.textContent, info: this._info.textContent, avatar: this._avatar.src };
    return defaultInfo;
  }

  // Метод принимает новые данные с формы и добавляет их на страницу

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
  }
}
