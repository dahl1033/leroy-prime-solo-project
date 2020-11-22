import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

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
        this.getMixesToOrder();
        this.getMixesInOrder();
    }
    getMixesInOrder = () => {
        this.props.dispatch({type: 'FETCH_MIXES_IN_ORDER', payload: this.props.store.order.currentOrderId});
    }
    getMixesToOrder = () => {
        this.props.dispatch({type: 'FETCH_MIXES_TO_ORDER'});
    }
    onClickAddMixToOrder = (mix, mix_size_id, order_id) => {
        this.props.dispatch({type: 'ADD_MIX_TO_ORDER', payload: {mix_size_id: mix_size_id,
                                                                    order_id: order_id
        }});
        this.getMixesInOrder();
    }
    onClickContinueMixToOrder = (mix) =>{
        this.props.dispatch({type: 'SET_CURRENT_WORKING_MIX', payload: mix});
        this.props.history.push(`/user`);
    }
    backToOrders = () => {
      this.props.history.push(`/order`);
    }
    completeOrder = () => {
      this.props.dispatch({type: 'SUBMIT_ORDER', payload: {id: this.props.store.order.currentOrderId}});
      this.props.history.push(`/order`);
    }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <p>Your Working Order ID is: {this.props.store.order.currentOrderId}</p>
        <h2>Current Mixes:</h2>
        <ul>
          {this.props.store.mixes.mixesInOrder.map((item) => {
                      return (
                        <li key={item.id} onClick={() => this.onClickContinueMixToOrder(item)}>
                          {item.id}
                        </li>
                      )
          })}
        </ul>
        <h2>Add New Mix</h2>
        <ul>
          {this.props.store.mixes.mixesToOrder.map((item) => {
                      return (
                        <li key={item.id} onClick={() => this.onClickAddMixToOrder(item, item.id, this.props.store.order.currentOrderId)}>
                          {item.mix_size}
                        </li>
                      )
          })}
        </ul>
        <button onClick={this.backToOrders}>Orders</button>
        <button onClick={this.completeOrder}>Submit</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MixesPage);