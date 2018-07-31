const INITIAL_STATE = {
  categories: [],
  isFetchingCategories: true,
  cateName: '',
  cateDesc: '',
  tempAttr: '',
  attr: [],
  checkMessage: '',
  isSavingCate: false,
  editingID: null,  
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORY_SUCCESS': 
      return { ...state, categories: action.payload, isFetchingCategories: false }
    case 'FETCH_CATEGORY_FAILED':
      return { ...state, categories: [], isFetchingCategories: false }
    case 'UPDATE_CATEGORY_PROPS':
      return { ...state, [action.payload.prop]: action.payload.value }
    case 'UPDATE_ATTR_LIST':
      return { ...state, attr: [...state.attr, action.payload] }
    case 'ADDING_NEW_CATEGORY':
      return { ...state, isSavingCate: true };
    case 'CATEGORY_SAVE_SUCCESS':
      return {
        ...state,
        editingID: null,
        cateName: '',
        cateDesc: '',
        attr: [],
        isSavingCate: false,
        checkMessage: ''
      };
    case 'CATEGORY_SAVE_FAILED':
      return { ...state, isSavingCate: false }
    case 'PARSE_VALUE_TO_EDIT_CATEGORY':
      return { ...state,
        editingID: action.payload._id,
        cateName: action.payload.name,
        cateDesc: action.payload.description,
        attr: action.payload.attributes,
      }
    default:
      return state;
  }
}
