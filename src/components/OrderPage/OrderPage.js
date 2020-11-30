import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import FormDialog from '../NewOrderForm/NewOrderForm';
import './OrderPage.css';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class OrderPage extends Component {
  state = {
    heading: 'Class Component',
  };
  componentDidMount() {
      this.props.dispatch({type: 'FETCH_ORDERS_COMPLETED', payload: {user_id: this.props.store.user.id}});
      this.props.dispatch({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: this.props.store.user.id}});
  }
  componentDidUpdate(prevProps) {
    if (this.props.store.user.id !== prevProps.store.user.id) {
      this.props.dispatch({type: 'FETCH_ORDERS_COMPLETED', payload: {user_id: this.props.store.user.id}});
      this.props.dispatch({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: this.props.store.user.id}});
  }}
  onClickContinueOrder = () => {
    this.props.history.push(`/mixes`)
  }
  setWorkingOrder = (orderId) => {
    this.props.dispatch({type: 'SET_CURRENT_ORDER_ID', payload: orderId})
    this.props.history.push(`/mixes`)
  }
  onClickDeleteOrder = (id) => {
    this.props.dispatch({type: 'DELETE_ORDER', payload: {id: id, user_id: this.props.store.user.id}});
  }
  render() {
    return (
      <div className="container shadow-lg rounded" >
        <h1 id="heading">My Orders</h1>
        <FormDialog/>
        <h2>Orders Uncompleted:</h2>
        <ul className="ordersul shadow-lg rounded">
          {this.props.store.order.ordersUncompleted.map((item) => {
                      return <>
                        <li className="ordersli shadow-lg rounded" onClick={() => this.setWorkingOrder(item.id)}>
                          {item.name}
                        </li>
                        <button onClick={() => this.onClickDeleteOrder(item.id)}>Delete</button>
                            </>
          })}
        </ul>
        <h2>Orders Completed:</h2>
        <ul className="ordersul shadow-lg rounded">
          {this.props.store.order.ordersCompleted.map((item) => {
                      return <>
                        <li className="ordersli shadow-lg rounded">
                          {item.name}
                        </li>
                            </>
          })}
        </ul>
        <button className="btns shadow-lg" onClick={this.onClickContinueOrder}>Continue</button>
        <img id='bg' src='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/nuts-in-black-and-white-tom-mc-nemar.jpg'></img>
      </div>
      // onClick={() => this.addItemToMix(item)}
      
    );
  }
}


export default connect(mapStoreToProps)(OrderPage);