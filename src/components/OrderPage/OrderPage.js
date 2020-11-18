import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class OrderPage extends Component {
  state = {
    heading: 'Class Component',
  };
  componentDidMount() {
      this.props.dispatch({type: 'FETCH_WORKING_ORDER'})
  }

  onClickNewOrder = (id) => {
    this.props.dispatch({type: 'ADD_NEW_ORDER', payload: {id: id}})
    this.props.history.push(`/mixes`)
  }
  render() {
    return (
      <div>
        <button onClick={() => this.onClickNewOrder(this.props.store.user.id)}>New Order</button>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <p>Your Working Order ID is: {this.props.store.order.currentOrderId}</p>
      </div>
      
    );
  }
}


export default connect(mapStoreToProps)(OrderPage);