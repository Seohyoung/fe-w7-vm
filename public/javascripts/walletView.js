import _ from './util';

class WalletView {
  constructor(selectors, vendingModel, walletModel) {
    this.$ = selectors;
    this.walletModel = walletModel;
    this.vendingModel = vendingModel;
    this.init();
  }

  init() {
    this.render();
    this.addEvent();
    this.walletModel.subscribe(this.updateWallet.bind(this));
  }

  render() {
    this.$.$wallet.innerHTML = this.makeWalletHTML();
  }

  addEvent() {
    const $currencyUnits = _.$('.wallet__currency-unit');
    const $walletInput = _.$('.wallet__total input');
    _.on($currencyUnits, 'click', this.clickMoney.bind(this));
    _.on($walletInput, 'keyup', _.debounce(this.inputMoney.bind(this), 1000));
  }

  makeWalletHTML() {
    const currencyUnits = [10, 50, 100, 500, 1000, 5000, 10000];
    return `<ul class="wallet__currency-unit"> 
                ${this.makeUnitHTML(currencyUnits)} 
              </ul>
              <ul class="wallet__total__wrapper">
                <li class="wallet__total"><input type="text"><span>원</span></li>
              </ul>`;
  }

  makeUnitHTML(unitList) {
    const template = (acc, unit) =>
      acc +
      `<li class="currency-unit__${unit}">
        <div>${unit}<span>원</span></div>
        <div class="currency-unit__count">0<span>개</span></div>
      </li>`;
    return unitList.reduce(template, '');
  }

  updateWallet({ currencyUnits, account }) {
    this.updateUnit(currencyUnits);
    this.updateAccount(account);
  }

  updateUnit(units) {
    units.forEach(
      (v) =>
        (_.$(
          `.currency-unit__${v.currencyUnit} .currency-unit__count`
        ).innerHTML = `${v.count}개`)
    );
  }

  updateAccount(account) {
    _.$('.wallet__total input').value = account;
  }

  clickMoney({ target }) {
    const unit = parseInt(
      target.parentNode.className.replace('currency-unit__', '')
    );
    this.walletModel.deductAccount(unit);
    this.vendingModel.inputMoney(unit);
  }

  inputMoney() {
    this.walletModel.setAccount(_.$('.wallet__total input').value);
  }
}

export default WalletView;
