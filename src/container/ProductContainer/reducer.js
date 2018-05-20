const INITIAL_STATE = {
  products: [],
  isFetchingProducts: true,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_SUCCESS': 
      return { ...state, products: action.payload, isFetchingProducts: false }
    case 'FETCH_PRODUCT_FAILED':
      return { ...state, products: [], isFetchingProducts: false }
    default: 
      return state;
  }
};
