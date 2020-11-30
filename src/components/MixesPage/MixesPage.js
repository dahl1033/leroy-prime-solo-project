import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MixFormDialog from '../NewMixForm/NewMixForm';
import './MixesPage.css';

class MixesPage extends Component {

    // when thsis page renders make these dispatch calls to fetch info from db
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_MIXES_TO_ORDER'});
        this.props.dispatch({type: 'FETCH_MIXES_IN_ORDER', payload: this.props.store.order.orderId});
        this.props.dispatch({type: 'FETCH_CURRENT_ORDER_INFO', payload: {orderId: this.props.store.order.orderId}});
    }
    // everytime something on the dom rerenders, fetch the mixes in order
    componentDidUpdate(prevProps) {
        if (this.props.store.mixes== prevProps.store.mixes) {
            this.props.dispatch({type: 'FETCH_MIXES_IN_ORDER', payload: this.props.store.order.orderId});
        }
    }
    // on click of adding new mix to order dispatch to db new item and call current mixes in order again
    onClickAddMixToOrder = (mix_size_id, order_id) => {
        this.props.dispatch({type: 'ADD_MIX_TO_ORDER', payload: {mix_size_id: mix_size_id, order_id: order_id}});
        this.props.dispatch({type: 'FETCH_MIXES_IN_ORDER', payload: this.props.store.order.orderId});
    }
    // on click continue previously selected mix and continue to mix builder
    onClickContinueMixToOrder = (mix) =>{
        this.props.dispatch({type: 'SET_MIX_ID', payload: {mixId: mix.id}});
        this.props.dispatch({type: 'FETCH_MIX_INFO', payload: {mixId: mix.id}});
        this.props.dispatch({type: 'FETCH_CURRENT_MIX_SIZE', payload: {mix: mix}});
        this.props.history.push(`/user`);
    }
    //send user back to order page
    backToOrders = () => {
      this.props.history.push(`/order`);
    }
    // dipatch call to update db of completion status when order is submitted
    completeOrder = () => {
      this.props.dispatch({type: 'SUBMIT_ORDER', payload: {id: this.props.store.order.orderId, user_id: this.props.store.user.id}}); 
      this.props.history.push(`/order`);
    }
    onClickDeleteOrder = (id) => {
      console.log('clicked', id);
      this.props.dispatch({type: 'DELETE_MIX', payload: {orderId: this.props.store.order.orderId, mixId: id
      }})
    }

  render() {
    return (
      <div className="container shadow-lg rounded">
        <h2 className="mix-name">{this.props.store.order.orderInfo.name} Order</h2>
        <h2>Current Mixes:</h2>
        <p>Select a mix to continue</p>
        <ul className="ordersul shadow-lg rounded" xs={6}>
          {this.props.store.mixes.mixesInOrder.map((item) => {
                      return (
                        <>
                        <li key={item.id} className="ordersli shadow-lg rounded" onClick={() => this.onClickContinueMixToOrder(item)}>
                          <h3>{item.name}</h3>
                        </li>
                        <button className="deleteBtn"onClick={() => this.onClickDeleteOrder(item.id)}>X</button>
                        </>
                      )
          })}
        </ul>
        
        <h2>Add New Mix to Order</h2>
        <ul className="selectMixesUl shadow-lg rounded">
          {this.props.store.mixes.mixesToOrder.map((item) => {
                      return (
                        <li className="selectMixesLi shadow-lg rounded" key={item.id}>
                          <MixFormDialog item={item.id} size={item.mix_size}/>
                        </li>
                        )
          })}
        </ul>
        <button className="btns shadow-lg" onClick={this.backToOrders}>Orders</button>
        <button className="btns shadow-lg" id="submitBtn" onClick={this.completeOrder}>Submit</button>
                <img id='bg' src='https://storage.needpix.com/rsynced_images/tas-de-noix-.jpg'></img>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MixesPage);