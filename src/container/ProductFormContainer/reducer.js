import update from 'immutability-helper'

const INITIAL_STATE = {
  image: null,
  attr: [],
  cate_id: null,
  initFormValues: {
    serial: undefined, 
    name: undefined, 
    description: undefined, 
    sell_price: undefined, 
    origin_price: undefined, 
    quantity: undefined
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PRODUCT_UPDATE':
      return { ...state, [action.payload.prop]: action.payload.value }
    case 'PRODUCT_ADD_ATTRIBUTE': 
      return { ...state, attr: [...state.attr, action.payload] }
    case 'PRODUCT_REMOVE_ATTRIBUTE':
      return { ...state, attr: [...state.attr.slice(0, action.payload), ...state.attr.slice(action.payload + 1)] }
    case 'PRODUCT_UPDATE_ATTR':
      return update(state, {
        attr: {
          [action.payload.index]: {
            [action.payload.prop]: { $set: action.payload.value }
          }
        }
      })
    case 'PARSE_INIT_FORM_VALUES':
      return { ...state, initFormValues: action.payload }
    case 'PARSE_IN_MORE_PRODUCT_VALUES':
      return { ...state, image: action.payload.image, cate_id: action.payload.cate_id, attr: action.payload.attributes }
    case 'EDIT_PRODUCT_FINISHED':
      return { ...state, 
        image: null,
        attr: [],
        cate_id: null,
        initFormValues: {
          serial: undefined, 
          name: undefined, 
          description: undefined, 
          sell_price: undefined, 
          origin_price: undefined, 
          quantity: undefined
        } };
    default: 
      return state;
  }
}