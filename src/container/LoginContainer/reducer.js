const INITIAL_STATE = {
  branches: [],
  branch: null,
  isLoggingIn: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_BRANCHES_SUCCESS':
      return { ...state, branches: action.payload }
    case 'USER_REGISTER_UPDATE':
      return { ...state, [action.payload.prop]: action.payload.value }
    case 'START_LOGGING_IN':
      return { ...state, isLoggingIn: true }
    case 'STOP_LOGGING_IN':
      return { ...state, isLoggingIn: false }
    default: 
      return state;
  }
};
