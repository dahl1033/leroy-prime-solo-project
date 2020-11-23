import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './UserPage.css';
class UserPage extends Component {
  componentDidMount() {
    this.getNutItems();
    // this.props.dispatch({type: 'FETCH_PROPORTIONS', payload: {id: this.props.store.mixes.currentWorkingMix.id}});

  }
  // dispatch calls to get all the nuts from the DB based off their type of nut on page load
  getNutItems = () => {
    this.props.dispatch({type: 'FETCH_INVENTORY_ITEMS'});
    this.props.dispatch({type: 'FETCH_ALMOND_ITEMS', payload: 'almond'});
    this.props.dispatch({type: 'FETCH_PECAN_ITEMS', payload: 'pecan'});
    this.props.dispatch({type: 'FETCH_CASHEW_ITEMS', payload: 'cashew'});
    this.props.dispatch({type: 'FETCH_PISTACHIO_ITEMS', payload: 'pistachio'});
    this.getItemsInMix();
  }
  
  getItemsInMix = () => {
        console.log("FIRING!!!!!");
        this.props.dispatch({type: 'FETCH_ITEMS_IN_MIX', payload: this.props.store.mixes.currentWorkingMix.id});
    }

  addItemToMix = (item) => {
    console.log("IN addItemToMix: mixID =",this.props.store.mixes.currentWorkingMix.id, "item ID", item.id);
    this.props.dispatch({ type: 'ADD_ITEM_TO_MIX', 
                          payload: { 
                            mix_id: this.props.store.mixes.currentWorkingMix.id,
                            item_id: item.id
                          }});
    this.getItemsInMix();
  }
  deleteItemFromMix = (item) => {
    console.log('in delete', item);
    this.props.dispatch({type: 'DELETE_ITEM_IN_MIX', payload: item });
  }
  backToMixes = () =>{
    this.props.history.push(`/mixes`);
  }
  render() {
    return (
      <div className="container shadow-lg rounded">
        <header>
          <ul className="outerUl">
            <li className="outerLi">Almonds
              <ul className="innerUl" name="Almonds" >Almonds
                {this.props.store.items.almondItems.map((item) => {
                  return <>
                    <li className="innerLi" onClick={() => this.addItemToMix(item)}>
                    {item.name}
                    </li>
                        </>
                      })}
              </ul>
            </li>
          </ul>
            
          
        </header>
        <h1 id="mixBuilder">Mix Builder</h1>
        <p>Your user ID is: {this.props.store.user.id}</p>
        <p>Your order ID is: {this.props.store.order.currentOrderId}</p>
        <p>Your mix ID is: {this.props.store.mixes.currentWorkingMix.id}</p>
        <h1>Almonds:</h1>
        <ul>
          {this.props.store.items.almondItems.map((item) => {
                      return <>
                        <li onClick={() => this.addItemToMix(item)}>
                          {item.name}
                        </li>
                            </>
          })}
        </ul>
        <h1>Items in Mix:</h1>
        <ul className="ordersul shadow-lg rounded">
          {this.props.store.mixes.itemsInCurrentMix.map((item) => {
                      return <>
                        <li className="ordersli shadow-lg rounded" onClick={() => this.deleteItemFromMix(item)}>
                          {item.name}
                        </li>
                            </>
          })}
        </ul>
        <button onClick={this.backToMixes}>Mixes</button>
        <img id='bg' src='https://www.shopmarketbasket.com/sites/default/files/inline-images/trail-mix-in-bowls-body_1.jpg'></img>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
