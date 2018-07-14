const INITIAL_STATE = {
  branches: [],
  branch: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_BRANCHES_SUCCESS':
      return { ...state, branches: action.payload }
    case 'USER_REGISTER_UPDATE':
      return { ...state, [action.payload.prop]: action.payload.value }
    default: 
      return state;
  }
};
