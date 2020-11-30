import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import FormDialog from '../NewOrderForm/NewOrderForm';
import './OrderPage.css';

class OrderPage extends Component {
  
  // when page renders perform dispatch calls to retrieve order info from db
  componentDidMount() {
      this.props.dispatch({type: 'FETCH_ORDERS_COMPLETED', payload: {user_id: this.props.store.user.id}});
      this.props.dispatch({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: this.props.store.user.id}});
  }
  // when page is changed perform dispatch calles to update orders
  componentDidUpdate(prevProps) {
    if (this.props.store.user.id !== prevProps.store.user.id) {
      this.props.dispatch({type: 'FETCH_ORDERS_COMPLETED', payload: {user_id: this.props.store.user.id}});
      this.props.dispatch({type: 'FETCH_ORDERS_UNCOMPLETED', payload: {user_id: this.props.store.user.id}});
  }}
  // on click push user to mixes page 
  onClickContinueOrder = () => {
    this.props.history.push(`/mixes`)
  }
  // on click set working worker id in props and send user to mixes page
  setWorkingOrder = (orderId) => {
    this.props.dispatch({type: 'SET_CURRENT_ORDER_ID', payload: orderId})
    this.props.history.push(`/mixes`)
  }
  // delete dispatch request to delete item in junction table based on user and order id
  onClickDeleteOrder = (id) => {
    this.props.dispatch({type: 'DELETE_ORDER', payload: {id: id, user_id: this.props.store.user.id}});
  }
  render() {
    return (
      <div className="container shadow-lg rounded" >
        <h1 id="heading">My Orders</h1>
        <div className="btnForm">
        <FormDialog/>
        </div>
        <h2>Orders Uncompleted:</h2>
        <p>Select an order to continue</p>
        <ul className="ordersul shadow-lg rounded">
          {this.props.store.order.ordersUncompleted.map((item) => {
                      return <>
                        <li className="ordersli shadow-lg rounded" onClick={() => this.setWorkingOrder(item.id)}>
                          {item.name}
                        </li>
                        <button className="deleteBtn"onClick={() => this.onClickDeleteOrder(item.id)}>X</button>
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
        <button className="btns shadow-lg" id="rightBtn" onClick={this.onClickContinueOrder}>Continue</button>
        <img id='bg' src='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/nuts-in-black-and-white-tom-mc-nemar.jpg'></img>
      </div>
      // onClick={() => this.addItemToMix(item)}
      
    );
  }
}


export default connect(mapStoreToProps)(OrderPage);