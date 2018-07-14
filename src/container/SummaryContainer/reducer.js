const INITIAL_STATE = {
  productSummary: {
    totalProduct: 0,
    totalOriginPrice: 0,
    totalSellPrice: 0,
    totalProductQuantity: 0
  },
  orderSummaryByAll: {
    totalProductSelled: 0,
    totalProductQuantitySelled: 0,
    totalAmount: 0,
    totalEarned: 0
  },
  orderSummaryByDate: {
    totalProductSelled: 0,
    totalProductQuantitySelled: 0,
    totalAmount: 0,
    totalEarned: 0
  },
  orderSummaryByMonth: {
    totalProductSelled: 0,
    totalProductQuantitySelled: 0,
    totalAmount: 0,
    totalEarned: 0
  },
  orderSummaryByYear: {
    totalProductSelled: 0,
    totalProductQuantitySelled: 0,
    totalAmount: 0,
    totalEarned: 0
  },
  selectedDay: new Date()
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CALCULATE_PRODUCT_PRICE':
      const product = action.payload;
      return { ...state, productSummary: {
        totalProduct: product.totalProduct,
        totalOriginPrice: product.totalOriginPrice,
        totalSellPrice: product.totalSellPrice,
        totalProductQuantity: product.totalProductQuantity
      }}
    case 'CALCULATE_ORDER_BY_ALL':
      let orderByAll = action.payload;
      return { ...state, orderSummaryByAll: {
        totalProductSelled: orderByAll.totalProductSelled,
        totalProductQuantitySelled: orderByAll.totalProductQuantitySelled,
        totalAmount: orderByAll.totalAmount,
        totalEarned: orderByAll.totalEarned
      }}
    case 'CALCULATE_ORDER_BY_DATE':
      let orderByDate = action.payload;
      return { ...state, orderSummaryByDate: {
        totalProductSelled: orderByDate.totalProductSelled,
        totalProductQuantitySelled: orderByDate.totalProductQuantitySelled,
        totalAmount: orderByDate.totalAmount,
        totalEarned: orderByDate.totalEarned
      }}
    case 'CALCULATE_ORDER_BY_MONTH':
      let orderByMonth = action.payload;
      return { ...state, orderSummaryByMonth: {
        totalProductSelled: orderByMonth.totalProductSelled,
        totalProductQuantitySelled: orderByMonth.totalProductQuantitySelled,
        totalAmount: orderByMonth.totalAmount,
        totalEarned: orderByMonth.totalEarned
      }}
    case 'CALCULATE_ORDER_BY_YEAR':
      let orderByYear = action.payload;
      return { ...state, orderSummaryByYear: {
        totalProductSelled: orderByYear.totalProductSelled,
        totalProductQuantitySelled: orderByYear.totalProductQuantitySelled,
        totalAmount: orderByYear.totalAmount,
        totalEarned: orderByYear.totalEarned
      }}
    case 'SET_NEW_DATE':
      return { ...state, selectedDay: action.payload }
    default: 
      return state;
  }
};
