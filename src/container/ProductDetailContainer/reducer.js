const INITIAL_STATE = {
  product: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_IN_DETAIL': 
      return { ...state, product: action.payload }
    default:
      return state;
  }
}
