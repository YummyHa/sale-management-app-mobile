const INITIAL_STATE = {
  producers: [],
  isSavingProducer: false,
  name: '',
  address: '',
  phone: '',
  checkMessage: '(*) là trường bắt buộc',
  editingID: '',
  isFromReceipt: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCER_SUCCESS':
      return { ...state, producers: action.payload };
    case 'UPDATE_PRODUCER_PROPS':
      return { ...state, [action.payload.prop]: action.payload.value };
    case 'ADDING_NEW_PRODUCER':
      return { ...state, isSavingProducer: true };
    case 'PRODUCER_SAVE_SUCCESS':
      return {
        ...state,
        name: '',
        address: '',
        phone: '',
        isSavingProducer: false,
        checkMessage: '(*) là trường bắt buộc'
      };
    case 'CHECK_PRODUCER_INFO':
      return { ...state, checkMessage: `${action.payload} không được để trống` }
    case 'PRODUCER_SAVE_FAILED':
      return { ...state, isSavingProducer: false }
    case 'PRODUCER_DELETE':
      return { ...state, producers: action.payload }
    case 'CANCEL_EDIT_PRODUCER':
      return { ...state, 
        name: '',
        address: '',
        phone: ''
      };
    case 'PARSE_VALUE_TO_EDIT_PRODUCER':
      return { ...state,
        editingID: action.payload._id,
        name: action.payload.name,
        address: action.payload.address,
        phone: action.payload.phone
      }
    case 'SELECT_PRODUCER_FROM_RECEIPT':
      return { ...state, isFromReceipt: true }
    case 'CLEAR_SELECT_FROM_RECEIPT':
      return { ...state, isFromReceipt: false }
    default:
      return state;
  }
};