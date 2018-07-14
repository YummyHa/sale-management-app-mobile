import _ from 'lodash';
import update from 'immutability-helper';

const INITIAL_STATE = {
  orderingList: [],
  orderingTotalItems: 0,
  customer: null,
  total: 0,
  discount: 0,
  paidmoney: 0,
  changeback: 0,
  realTotal: 0,
  payModalVisible: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_NEW_ORDERLIST_SUCCESS':
      return { ...state, orderingList: [...state.orderingList, action.payload], orderingTotalItems: state.orderingTotalItems + 1 }
    case 'UPDATE_ORDER_QUANTITY_PLUS':
      return update(state, {
        orderingList: {
          [action.payload]: {
            ['quantity']: { $set: state.orderingList[action.payload].quantity + 1 }
          }
        }
      });
    case 'UPDATE_ORDER_QUANTITY_MINUS':
      return update(state, {
        orderingList: {
          [action.payload]: {
            ['quantity']: { $set: state.orderingList[action.payload].quantity - 1 }
          }
        }
      });
    case 'UPDATE_ORDER_QUANTITY':
      return update(state, {
        orderingList: {
          [action.payload.index]: {
            ['quantity']: { $set: action.payload.value }
          }
        }
      })
    case 'UPDATE_ORDER_LIST':
      return { ...state, orderingList: action.payload, orderingTotalItems: state.orderingTotalItems - 1 }
    case 'UPDATE_TOTAL_ORDER_AMOUNT':
      let s = 0;
      _.forEach(state.orderingList, value => {
        s += value.sell_price * value.quantity;
      });
      return { ...state, total: s, realTotal: s }
    case 'DISCOUNT_CHANGED':
      return { ...state, discount: action.payload }
    case 'PAID_MONEY_CHANGED':
      return { ...state, paidmoney: action.payload }
    case 'DISCOUNT_TOTAL': 
      let t = state.realTotal - state.realTotal*(state.discount/100);
      t = Math.round(t);
      return { ...state, total: t }
    case 'MONEY_CHANGE_CHANGED':
      let change = state.paidmoney - state.total;
      return { ...state, changeback: change}
    case 'UPDATE_ORGIN_TOTAL':
      return { ...state, total: state.realTotal }
    case 'UPDATE_CUSTOMER_IN_CART':
      return { ...state, customer: action.payload }
    case 'ADD_ORDER_SUCCESS':
      return { ...state, 
        orderingList: [],
        orderingTotalItems: 0,
        customer: {},
        total: 0,
        discount: 0,
        paidmoney: 0,
        changeback: 0,
        realTotal: 0,
        payModalVisible: false,
      };
    default:
      return state;
  }
}
