const INITIAL_STATE = {
  categories: [],
  isFetchingCategories: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORY_SUCCESS': 
      return { ...state, categories: action.payload, isFetchingCategories: false }
    case 'FETCH_CATEGORY_FAILED':
      return { ...state, categories: [], isFetchingCategories: false }
    default:
      return state;
  }
}
