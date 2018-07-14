import React, { Component } from 'react';
import { connect } from 'react-redux';

import Summary from '../../screens/Summary';

import * as actions from './actions';

class SummaryContainer extends Component {
  async componentWillMount() {
    await this.props.calculateProductSummary(this.props.products);
    await this.props.calculateOrderSummaryByAll(this.props.orders);
    await this.props.calculateOrderSummaryByDate(this.props.orders, this.props.selectedDay);
    await this.props.calculateOrderSummaryByMonth(this.props.orders, this.props.selectedDay);
    await this.props.calculateOrderSummaryByYear(this.props.orders, this.props.selectedDay);
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.products !== nextProps.products) {
      await this.props.calculateProductSummary(nextProps.products);
    }
    if (this.props.orders !== nextProps.orders) {
      await this.props.calculateOrderSummaryByAll(nextProps.orders);
      await this.props.calculateOrderSummaryByDate(nextProps.orders, this.props.selectedDay);
      await this.props.calculateOrderSummaryByMonth(nextProps.orders, this.props.selectedDay);
      await this.props.calculateOrderSummaryByYear(nextProps.orders, this.props.selectedDay);
    }
    if (this.props.selectedDay !== nextProps.selectedDay) {
      await this.props.calculateOrderSummaryByDate(this.props.orders, nextProps.selectedDay);
      await this.props.calculateOrderSummaryByMonth(this.props.orders, nextProps.selectedDay);
      await this.props.calculateOrderSummaryByYear(this.props.orders, nextProps.selectedDay);
    }
  }

  setDate(newDate) {
    this.props.setNewDate(newDate);
  }

  render() {
    return <Summary 
      productSummary={this.props.productSummary}
      orderSummaryByAll={this.props.orderSummaryByAll}
      orderSummaryByDate={this.props.orderSummaryByDate} 
      orderSummaryByMonth={this.props.orderSummaryByMonth}
      orderSummaryByYear={this.props.orderSummaryByYear}
      setDate={newDate => this.setDate(newDate)}
    />
  }
}

const mapStateToProps = state => {
  const { products } = state.product_list;
  const { orders } = state.bill;
  const { productSummary, orderSummaryByAll, orderSummaryByDate, orderSummaryByMonth, orderSummaryByYear, selectedDay } = state.summary;

  return { products, productSummary, orderSummaryByAll, orders, selectedDay, orderSummaryByDate, orderSummaryByMonth, orderSummaryByYear }
}

export default connect(mapStateToProps, actions)(SummaryContainer);
