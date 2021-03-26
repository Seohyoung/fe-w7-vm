import _ from './util';

// prettier-ignore
class ProductView {
  constructor(selectors, { productInfo }, vendingModel) {
    this.$ = selectors;
    this.model = vendingModel;
    this.itemList = productInfo;
    this.isDisabled = false;
    this.init();
  }

  init() {
    this.render();
    this.model.subscribe((productData) => {
      if (productData.type === 'PURCHASABLE_LIST') this.addHighlight(productData.value);
    });
    this.addEvent();
  }

  render() {
    this.$.$itemList.innerHTML = this.itemList.reduce((acc,{ name, price }) => {
      return acc + `<li class="product__item">
              		  <div class="product__item--name">${name}</div>
              		  <div class="product__item--price">${price}</div>
             		 </li>`;
    },'');
  }

  addHighlight(purchasableList) {
    const itemNames = _.$a('.product__item--name', this.$.$itemList);
    itemNames.forEach((e) => _.cr(e, 'highlighted'));
    purchasableList.forEach(({ id }) => _.ca(itemNames[id], 'highlighted'));
  }

  async selectProduct({ target }) {
    if (this.isDisabled && target.className !== 'product__item--name highlighted') return;
    _.ca(target, 'selected');
    this.isDisabled = true;
    await _.delay(() => this.model.sell(target.innerHTML), 2000);
    _.cr(target, 'selected');
    this.isDisabled = false;
  }

  addEvent() {
    _.on(this.$.$itemList, 'click', this.selectProduct.bind(this));
  }
}

export default ProductView;
