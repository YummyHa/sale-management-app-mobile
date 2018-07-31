import _ from 'lodash';

export const setNewDate = (newDate) => async dispatch => {
  dispatch({ type: 'SET_NEW_DATE', payload: newDate })
}

export const calculateProductSummary = (products) => async dispatch => {
  var totalProduct = 0;
  var totalProductQuantity = 0;
  var totalOriginPrice = 0;
  var totalSellPrice = 0;

  _.forEach(products, (product) => {
    totalProduct++;
    totalProductQuantity += product.quantity;
    totalOriginPrice += product.origin_price*product.quantity;
    totalSellPrice += product.sell_price*product.quantity;
  })

  dispatch({ type: 'CALCULATE_PRODUCT_PRICE', payload: { 
    totalProduct, 
    totalProductQuantity, 
    totalOriginPrice, 
    totalSellPrice 
  } });
}

export const calculateOrderSummaryByAll = (orders) => async dispatch => {
  var allProduct = [];
  var totalProductSelled = 0;
  var totalProductQuantitySelled = 0;
  var totalAmount = 0;
  var totalEarned = 0;

  _.forEach(orders, order => {
    _.forEach(order.products, prod => {
      if (prod._product !== null) {
        let result = _.find(allProduct, { '_id': prod._product._id });
        if (result === undefined) {
          allProduct.push({ _id: prod._product._id });
          totalProductSelled++;
        }  
      }
      totalProductQuantitySelled += prod.qty;
      totalAmount += prod.price * prod.qty;
      totalEarned += prod.price * prod.qty - prod.price_origin * prod.qty;
    })
  });

  dispatch({ type: 'CALCULATE_ORDER_BY_ALL', payload: { 
    totalProductSelled, 
    totalProductQuantitySelled, 
    totalAmount, 
    totalEarned 
  } });
}

export const calculateOrderSummaryByDate = (orders, date) => async dispatch => {
  var allProduct = [];
  var totalProductSelled = 0;
  var totalProductQuantitySelled = 0;
  var totalAmount = 0;
  var totalEarned = 0;

  _.forEach(orders, order => {
    var orderDate = new Date(order.time);
    if (orderDate.getDate() === date.getDate() && orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear()) {
      _.forEach(order.products, prod => {
        if (prod._product !== null) {
          let result = _.find(allProduct, { '_id': prod._product._id });
          if (result === undefined) {
            allProduct.push({ _id: prod._product._id });
            totalProductSelled++;
          }  
        }

        totalProductQuantitySelled += prod.qty;
        totalAmount += prod.price * prod.qty;
        totalEarned += prod.price * prod.qty - prod.price_origin * prod.qty;
      })
    }
  });

  dispatch({ type: 'CALCULATE_ORDER_BY_DATE', payload: { 
    totalProductSelled, 
    totalProductQuantitySelled, 
    totalAmount, 
    totalEarned 
  } });
}

export const calculateOrderSummaryByMonth = (orders, date) => async dispatch => {
  var allProduct = [];
  var totalProductSelled = 0;
  var totalProductQuantitySelled = 0;
  var totalAmount = 0;
  var totalEarned = 0;

  _.forEach(orders, order => {
    var orderDate = new Date(order.time);
    if (orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear()) {
      _.forEach(order.products, prod => {
        if (prod._product !== null) {
          let result = _.find(allProduct, { '_id': prod._product._id });
          if (result === undefined) {
            allProduct.push({ _id: prod._product._id });
            totalProductSelled++;
          }  
        }

        totalProductQuantitySelled += prod.qty;
        totalAmount += prod.price * prod.qty;
        totalEarned += prod.price * prod.qty - prod.price_origin * prod.qty;
      })
    }
  });

  dispatch({ type: 'CALCULATE_ORDER_BY_MONTH', payload: { 
    totalProductSelled, 
    totalProductQuantitySelled, 
    totalAmount, 
    totalEarned 
  } });
}

export const calculateOrderSummaryByYear = (orders, date) => async dispatch => {
  var allProduct = [];
  var totalProductSelled = 0;
  var totalProductQuantitySelled = 0;
  var totalAmount = 0;
  var totalEarned = 0;

  _.forEach(orders, order => {
    var orderDate = new Date(order.time);
    if (orderDate.getFullYear() === date.getFullYear()) {
      _.forEach(order.products, prod => {
        if (prod._product !== null) {
          let result = _.find(allProduct, { '_id': prod._product._id });
          if (result === undefined) {
            allProduct.push({ _id: prod._product._id });
            totalProductSelled++;
          }  
        }
        
        totalProductQuantitySelled += prod.qty;
        totalAmount += prod.price * prod.qty;
        totalEarned += prod.price * prod.qty - prod.price_origin * prod.qty;
      })
    }
  });

  dispatch({ type: 'CALCULATE_ORDER_BY_YEAR', payload: { 
    totalProductSelled, 
    totalProductQuantitySelled, 
    totalAmount, 
    totalEarned 
  } });
}
