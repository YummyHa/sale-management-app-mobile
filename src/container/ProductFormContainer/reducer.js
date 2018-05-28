import update from 'immutability-helper'

const INITIAL_STATE = {
  image: null,
  attr: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    default: 
      return state;
  }
}