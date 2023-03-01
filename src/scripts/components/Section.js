export default class Section {
  constructor(renderer, container) {
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

  renderItems(items, userId) {
    items.forEach(item => {
      this._renderer(item, userId);
    });
  }
}
