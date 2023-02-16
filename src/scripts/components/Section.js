export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  // Добавляем DOM-элементы в конетйнер

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItem() {
    this._renderer(this._items);
  }

  // Публичный метод, отвечающий за отрисовку всех карточек

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
