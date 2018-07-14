const INITIAL_STATE = {
  isCreatingProduct: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT_START':
      return { ...state, isCreatingProduct: true }
    case 'CREATE_PRODUCT_SUCCESS':
      return { ...state, isCreatingProduct: false }
    case 'CREATE_PRODUCT_FAILED': 
      return { ...state, isCreatingProduct: false }
    case 'SAVE_PRODUCT_FINISHED':
      return { ...state, isCreatingProduct: false }
    default: 
      return state;
  }
}
