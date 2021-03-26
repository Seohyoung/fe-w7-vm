import _ from './util';
import Observable from './observable';

class VendingModel extends Observable {
  constructor(data, walletModel) {
    super();
    this.wallet = walletModel;
    this.itemList = data.productInfo;
    this.account = 0;
    this.timer = undefined;
  }

  inputMoney(money) {
    this.account += money;
    this.changeMoneyEvent();
    this.notify({
      type: 'INPUT_MONEY',
      value: money,
    });
  }

  getPurchasableList(money) {
    return this.itemList.filter((e) => e.price <= money && e.stock > 0);
  }

  changeMoneyEvent() {
    this.notify({
      type: 'PURCHASABLE_LIST',
      value: this.getPurchasableList(this.account),
    });
    this.notify({
      type: 'ACCOUNT_CHANGE',
      value: this.account,
    });
    this.resetTimer();
  }

  resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.returnMoney.bind(this), 5000);
  }

  returnMoney() {
    if (this.account === 0) return;
    this.wallet.addAccount(this.account);
    this.notify({
      type: 'RETURN_MONEY',
      value: this.account,
    });
    this.account = 0;
    this.changeMoneyEvent();
  }

  sell(itemName) {
    const targetItem = this.itemList.find(({ name }) => name === itemName);
    if (targetItem.stock === 0) return;
    targetItem.stock--;
    this.account -= targetItem.price;
    this.changeMoneyEvent();
    this.notify({
      type: 'SELL',
      value: itemName,
    });
  }
}

export default VendingModel;
