
export const addMessage = (message) => async dispatch => {
  dispatch({ type: 'ADD_MESSAGE', payload: message });
}

export const updateCurrentMessage = (message) => async dispatch => {
  dispatch({ type: 'UPDATE_CURRENT_MESSAGE', payload: message })
}
