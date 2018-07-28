import _ from 'lodash';
import update from 'immutability-helper';

const INITIAL_STATE = {
  receiptList: [],
  receiptTotalItems: 0,
  producer: null,
  total: 0,
  note: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_NEW_RECEIPT_LIST_SUCCESS':
      return { ...state, receiptList: [...state.receiptList, action.payload], receiptTotalItems: state.receiptTotalItems + 1 }
    case 'UPDATE_RECEIPT_QUANTITY':
      return update(state, {
        receiptList: {
          [action.payload.index]: {
            ['quantity']: { $set: action.payload.value }
          }
        }
      })
    case 'UPDATE_RECEIPT_PRICE':
      return update(state, {
        receiptList: {
          [action.payload.index]: {
            ['price']: { $set: action.payload.value }
          }
        }
      })
    case 'UPDATE_TOTAL_RECEIPT_AMOUNT':
      let s = 0;
      _.forEach(state.receiptList, value => {
        s += value.price * value.quantity;
      });
      return { ...state, total: s }
    case 'REMOVE_RECEIPT_IN_LIST':
      return { ...state, receiptList: action.payload, receiptTotalItems: state.receiptTotalItems - 1 }
    case 'UPDATE_NOTE_IN_RECEIPT_LIST':
      return { ...state, note: action.payload }
    case 'UPDATE_PRODUCER_IN_RECEIPT':
      return { ...state, producer: action.payload }
    case 'ADD_RECEIPT_SUCCESS':
      return { ...state, receiptList: [],
        receiptTotalItems: 0,
        producer: null,
        total: 0,
        note: '' }
    default:
      return state;
  }
}
