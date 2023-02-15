export default class UserInfo {
  constructor({ name, info }) {
    this._name = name;
    this._info = info;
  }

  // Метод подставляет данные о пользователе при открытии страницы

  getUserInfo() {
    const defaultInfo = { name: this._name.textContent, info: this._info.textContent };
    return defaultInfo;
  }

  // Метод принимает новые данные с формы и добавляет их на страницу

  setUserInfo(getInputValue) {
    this._name.textContent = getInputValue.name;
    this._info.textContent = getInputValue.info;
  }
}
