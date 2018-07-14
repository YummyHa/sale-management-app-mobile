const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ORDER_SUCCESS':
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};