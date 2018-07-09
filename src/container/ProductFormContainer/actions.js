export const addNewAttr = (name) => dispatch => {
  dispatch({
    type: 'PRODUCT_ADD_ATTRIBUTE',
    payload: { name: name, value: '' }
  })
}

export const removeAttr = (index) => dispatch => {
  dispatch({
    type: 'PRODUCT_REMOVE_ATTRIBUTE',
    payload: index
  })
}

export const updateAttr = ({ prop, value, index }) => dispatch => {
  dispatch({
    type: 'PRODUCT_UPDATE_ATTR',
    payload: { prop, value, index }
  })
}

export const productUpdate = ({ prop, value }) => async dispatch => {
  dispatch({
    type: 'PRODUCT_UPDATE',
    payload: { prop, value }
  })
}
