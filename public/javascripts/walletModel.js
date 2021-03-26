import Observable from './observable';

class WalletModel extends Observable {
  constructor() {
    super();
    this.wallet = {
      currencyUnits: [
        { currencyUnit: 10000, count: 0 },
        { currencyUnit: 5000, count: 0 },
        { currencyUnit: 1000, count: 0 },
        { currencyUnit: 500, count: 0 },
        { currencyUnit: 100, count: 0 },
        { currencyUnit: 50, count: 0 },
        { currencyUnit: 10, count: 0 },
      ],
      account: 0,
    };
  }

  setAccount(money) {
    this.wallet.account = money;
    this.distributeAccount();
    this.notify(this.wallet);
  }

  distributeAccount() {
    let amount = this.wallet.account;
    this.wallet.currencyUnits.forEach(({ currencyUnit, count }) => {
      count = ~~(amount / currencyUnit);
      amount -= count * currencyUnit;
    });
  }

  deductAccount(money) {
    if (this.wallet.account <= 0) return;
    this.setAccount(this.wallet.account - money);
  }

  addAccount(money) {
    this.setAccount(this.wallet.account + money);
    this.notify(this.wallet);
  }
}

export default WalletModel;
