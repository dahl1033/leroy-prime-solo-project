import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
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
      this.props.dispatch({type: 'FETCH_ORDERS_COMPLETED'});
      this.props.dispatch({type: 'FETCH_ORDERS_UNCOMPLETED'});
  }

  onClickNewOrder = (id) => {
    this.props.dispatch({type: 'ADD_NEW_ORDER', payload: {id: id}})
    this.props.history.push(`/mixes`)
  }
  onClickContinueOrder = () => {
    this.props.history.push(`/mixes`)
  }
  setWorkingOrder = (item) => {
    this.props.dispatch({type: 'SET_CURRENT_ORDER_ID', payload: item.id})
    this.props.history.push(`/mixes`)
  }
  onClickDeleteOrder = (id) => {
    this.props.dispatch({type: 'DELETE_ORDER', payload: {id: id}});
  }
  render() {
    return (
      <div className="container shadow-lg rounded" >
        <button onClick={() => this.onClickNewOrder(this.props.store.user.id)}>New Order</button>
        <h1 id="heading">My Orders</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <p>Your Working Order ID is: {this.props.store.order.currentOrderId}</p>
        <h1>Orders Uncompleted:</h1>
        <ul className="ordersul shadow-lg rounded">
          {this.props.store.order.ordersUncompleted.map((item) => {
                      return <>
                        <li className="ordersli shadow-lg rounded" onClick={() => this.setWorkingOrder(item)}>
                          {item.id}
                          
                        </li>
                        <button onClick={() => this.onClickDeleteOrder(item.id)}>Delete</button>
                            </>
          })}
        </ul>
        <h1>Orders Completed:</h1>
        <ul className="ordersul shadow-lg rounded">
          {this.props.store.order.ordersCompleted.map((item) => {
                      return <>
                        <li className="ordersli shadow-lg rounded">
                          {item.id}
                        </li>
                            </>
          })}
        </ul>
        <button onClick={this.onClickContinueOrder}>Continue</button>
        <img id='bg' src='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/nuts-in-black-and-white-tom-mc-nemar.jpg'></img>
      </div>
      // onClick={() => this.addItemToMix(item)}
      
    );
  }
}


export default connect(mapStoreToProps)(OrderPage);