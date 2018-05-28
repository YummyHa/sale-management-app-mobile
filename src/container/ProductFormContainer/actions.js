export const addNewAttr = () => dispatch => {
  dispatch({
    type: 'PRODUCT_ADD_ATTRIBUTE',
    payload: { name: 'Attribute Name', value: '' }
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
