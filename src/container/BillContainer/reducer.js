const INITIAL_STATE = {
  orders: [],
  receipts: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ORDER_SUCCESS':
      return { ...state, orders: action.payload };
    case 'FETCH_RECEIPT_SUCCESS':
      return { ...state, receipts: action.payload }
    default:
      return state;
  }
};