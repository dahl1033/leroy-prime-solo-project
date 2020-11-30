import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MixFormDialog from '../NewMixForm/NewMixForm';
import './MixesPage.css';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

// setup mixes saga and reducers
// map through mixes table to display list of option to choose from
// go back to order page and push current working mix to mixes page
// setup junction table queries
class MixesPage extends Component {
  state = {
    heading: 'Mixes',
  };
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_MIXES_TO_ORDER'});
        this.props.dispatch({type: 'FETCH_MIXES_IN_ORDER', payload: this.props.store.order.orderId});
        this.props.dispatch({type: 'FETCH_CURRENT_ORDER_INFO', payload: {orderId: this.props.store.order.orderId}});

    }
    componentDidUpdate(prevProps) {
        if (this.props.store.mixes== prevProps.store.mixes) {
            this.props.dispatch({type: 'FETCH_MIXES_IN_ORDER', payload: this.props.store.order.orderId});
        }
    }
    onClickAddMixToOrder = (mix_size_id, order_id) => {
        this.props.dispatch({type: 'ADD_MIX_TO_ORDER', payload: {mix_size_id: mix_size_id, order_id: order_id}});
        this.props.dispatch({type: 'FETCH_MIXES_IN_ORDER', payload: this.props.store.order.orderId});
    }
    onClickContinueMixToOrder = (mix) =>{
        this.props.dispatch({type: 'SET_MIX_ID', payload: {mixId: mix.id}});
        this.props.dispatch({type: 'FETCH_CURRENT_MIX_SIZE', payload: {mix: mix}});
        this.props.history.push(`/user`);
    }
    backToOrders = () => {
      this.props.history.push(`/order`);
    }
    completeOrder = () => {
      this.props.dispatch({type: 'SUBMIT_ORDER', payload: {id: this.props.store.order.orderId, user_id: this.props.store.user.id}});
      
      this.props.history.push(`/order`);
    }

  render() {
    return (
      <div className="container shadow-lg rounded">
        <h2>{this.props.store.order.orderInfo.name}</h2>
        
        <p>Your Working Order ID is: {this.props.store.order.orderId}</p>
        <h2>Current Mixes:</h2>
        <ul className="ordersul shadow-lg rounded" xs={6}>
          {this.props.store.mixes.mixesInOrder.map((item) => {
                      return (
                        <li key={item.id} className="ordersli shadow-lg rounded" onClick={() => this.onClickContinueMixToOrder(item)}>
                          <h3>{item.name}</h3>
                        </li>
                      )
          })}
        </ul>
        
        <h2>Add New Mix</h2>
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
        <button className="btns shadow-lg" onClick={this.completeOrder}>Submit</button>
                <img id='bg' src='https://storage.needpix.com/rsynced_images/tas-de-noix-.jpg'></img>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MixesPage);