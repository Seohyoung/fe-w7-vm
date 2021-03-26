import _ from './util';
import VendingModel from './vendingModel';
import ProductView from './productView';
import WalletModel from './walletModel';
import WalletView from './walletView';
import ProgressView from './progressView';

const productData = {
  productInfo: [
    {
      id: 0,
      name: '콜라',
      price: 500,
      stock: 3,
    },
    {
      id: 1,
      name: '사이다',
      price: 1000,
      stock: 31,
    },
    {
      id: 2,
      name: '파인애플맛 환타',
      price: 400,
      stock: 4,
    },
    {
      id: 3,
      name: '포도맛 환타',
      price: 300,
      stock: 10,
    },
    {
      id: 4,
      name: '레몬에이드',
      price: 900,
      stock: 10,
    },
    {
      id: 5,
      name: '봉봉',
      price: 1200,
      stock: 10,
    },
    {
      id: 6,
      name: '코코아주스',
      price: 1000,
      stock: 10,
    },
    {
      id: 7,
      name: '콜라제로',
      price: 1000,
      stock: 10,
    },
    {
      id: 8,
      name: '파워에이드',
      price: 2000,
      stock: 10,
    },
    {
      id: 9,
      name: '초코우유',
      price: 1000,
      stock: 10,
    },
    {
      id: 10,
      name: '초코우유2',
      price: 7000,
      stock: 10,
    },
    {
      id: 11,
      name: '초코우유3',
      price: 600,
      stock: 10,
    },
    {
      id: 12,
      name: '딸바주스',
      price: 1000,
      stock: 10,
    },
    {
      id: 13,
      name: '바나나우유',
      price: 500,
      stock: 10,
    },
    {
      id: 14,
      name: '커피우유',
      price: 1000,
      stock: 10,
    },
    {
      id: 15,
      name: '알로에',
      price: 1200,
      stock: 10,
    },
    {
      id: 16,
      name: '콘칩',
      price: 1000,
      stock: 10,
    },
    {
      id: 17,
      name: '새우깡',
      price: 1000,
      stock: 10,
    },
    {
      id: 18,
      name: '감자칩',
      price: 2000,
      stock: 10,
    },
    {
      id: 19,
      name: '칸쵸',
      price: 1000,
      stock: 10,
    },
  ],
};
const selectors = {
  $walletInput: _.$('.wallet__total input'),
  $currencyUnits: _.$('.wallet__currency-unit'),
  $wallet: _.$('.wallet'),
  $account: _.$('.vending__display--money'),
  $display: _.$('.vending__display--progress'),
  $returnButton: _.$('.vending__display--return-button'),
  $itemList: _.$('.vending__product--item-list'),
};

const walletModel = new WalletModel();
const vendingModel = new VendingModel(productData, walletModel);
new WalletView(selectors, vendingModel, walletModel);
new ProductView(selectors, productData, vendingModel);
new ProgressView(vendingModel, selectors);
