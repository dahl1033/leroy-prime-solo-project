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
    }
    getMixesToOrder = () => {
        this.props.dispatch({type: 'FETCH_MIXES_TO_ORDER'});
    }
    onClickAddMixToOrder = () => {

    }
  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <p>Your Working Order ID is: {this.props.store.order.currentOrderId}</p>
        <h2>Add New Mix</h2>
        <ul>
          {this.props.store.mixes.mixesToOrder.map((item) => {
                      return (
                        <li key={item.id} onClick={() => this.onClickAddMixToOrder(item.id, this.props.store.order.currentOrderId)}>
                          {item.mix_size}

                        </li>
                      )
          })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MixesPage);