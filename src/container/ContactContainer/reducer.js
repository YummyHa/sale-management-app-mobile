const INITIAL_STATE = {
  messages: [],
  message: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_MESSAGES':
      var msgs = action.payload.reverse();
      return { ...state, messages: msgs }
    case 'ADD_MESSAGE':
      return { ...state, messages: [action.payload, ...state.messages], message: '' }
    case 'UPDATE_CURRENT_MESSAGE':
      return { ...state, message: action.payload }
    default:
      return state;
  }
};