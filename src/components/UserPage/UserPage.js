import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './UserPage.css';
class UserPage extends Component {
  componentDidMount() {
    this.getNutItems();
  }
  // dispatch calls to get all the nuts from the DB based off their type of nut on page load
  getNutItems = () => {
    this.props.dispatch({type: 'FETCH_INVENTORY_ITEMS'});
    this.props.dispatch({type: 'FETCH_ALMOND_ITEMS', payload: 'almond'});
    this.props.dispatch({type: 'FETCH_PECAN_ITEMS', payload: 'pecan'});
    this.props.dispatch({type: 'FETCH_CASHEW_ITEMS', payload: 'cashew'});
    this.props.dispatch({type: 'FETCH_PISTACHIO_ITEMS', payload: 'pistachio'});
  }
  onClickNewOrder = (id) => {
    this.props.dispatch({type: 'ADD_NEW_ORDER', payload: {id: id}})
  }
  backToMixes = () =>{
    this.props.history.push(`/mixes`);
  }
  render() {
    return (
      <div>
        <button onClick={() => this.onClickNewOrder(this.props.store.user.id)}>New Order</button>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        {console.log(this.props.store.items.almondItems)}
        <ul>
          {this.props.store.items.almondItems.map((item) => {
                      return <>
                        <li>
                          {item.name}
                        </li>
                            </>
          })}
        </ul>
        <button onClick={this.backToMixes}>Mixes</button>
      </div>
      
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
