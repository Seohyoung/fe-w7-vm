import _ from './util';

class ProgressView {
  constructor(VendingModel, selectors) {
    this.model = VendingModel;
    this.$ = selectors;
    this.init();
  }

  // prettier-ignore
  init() {
    this.model.subscribe((accountData) => {
      if (accountData.type === 'ACCOUNT_CHANGE') this.updateAccount(accountData.value);
    });
    this.model.subscribe((logData) => {
      if (logData.type === 'INPUT_MONEY') this.updateLog(`${logData.value}원이 투입되었습니다.`);
      if (logData.type === 'SELL') this.updateLog(`${logData.value}가 팔렸습니다.`);
      if (logData.type === 'RETURN_MONEY') this.updateLog(`${logData.value}원만큼 반환되었습니다.`);
    });
    this.addEvent();
  }

  addEvent() {
    _.on(
      this.$.$returnButton,
      'click',
      this.model.returnMoney.bind(this.model)
    );
  }

  updateAccount(account) {
    this.$.$account.innerHTML = `${account}원`;
  }

  updateLog(message) {
    this.$.$display.innerHTML += `${message} <br>`;
  }
}

export default ProgressView;
