const INITIAL_STATE = {
  customers: [],
  isSavingCustomer: false,
  customerName: '',
  customerAddress: '',
  customerPhone: '',
  customerZalo: '',
  customerFacebook: '',
  checkMessage: '(*) là trường bắt buộc',
  editingID: '',
  isFromOrder: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CUSTOMER_SUCCESS':
      return { ...state, customers: action.payload };
    case 'UPDATE_CUSTOMER_PROPS':
      return { ...state, [action.payload.prop]: action.payload.value };
    case 'ADDING_NEW_CUSTOMER':
      return { ...state, isSavingCustomer: true };
    case 'CUSTOMER_SAVE_SUCCESS':
      return {
        ...state,
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        customerFacebook: '',
        customerZalo: '',
        isSavingCustomer: false,
        checkMessage: '(*) là trường bắt buộc'
      };
    case 'CHECK_CUSTOMER_INFO':
      return { ...state, checkMessage: `${action.payload} không được để trống` }
    case 'CUSTOMER_SAVE_FAILED':
      return { ...state, isSavingCustomer: false }
    case 'CUSTOMERS_DELETE':
      return { ...state, customers: action.payload }
    case 'CANCEL_EDIT_CUSTOMER':
      return { ...state, 
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        customerFacebook: '',
        customerZalo: ''
      };
    case 'PARSE_VALUE_TO_EDIT':
      return { ...state,
        editingID: action.payload._id,
        customerName: action.payload.name,
        customerAddress: action.payload.address,
        customerPhone: action.payload.phone,
        customerFacebook: action.payload.fb,
        customerZalo: action.payload.zalo
      }
    case 'SELECT_CUSTOMER_FROM_ORDER':
      return { ...state, isFromOrder: true }
    case 'CLEAR_CHECK_FROM_CART':
      return { ...state, isFromOrder: false }
    default:
      return state;
  }
};