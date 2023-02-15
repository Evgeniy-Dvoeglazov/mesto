export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Добавляем DOM-элементы в конетйнер

  addItem(element) {
    this._container.append(element);
  }

  // Публичный метод, отвечающий за отрисовку всех карточек

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
