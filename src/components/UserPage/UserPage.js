import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

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
          {/* <div className="topnav" id="myTopnav">
            <div className="dropdown">
              <button className="dropbtn">Almonds</button>
              <div className="dropdown-content" >
                <a>Almonds</a>
                {this.props.store.items.almondItems.map((item) => {
                  return <>
                    <a onClick={() => this.addItemToMix(item)}>
                    {item.name}
                    </a>
                        </>
                      })}
              </div>
            </div>
          </div> */}
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Nuts</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="heading">Almonds</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {this.props.store.items.almondItems.map((item) => {
                  return <>
                    <Typography onClick={() => this.addItemToMix(item)}>
                    {item.name}
                    </Typography>
                        </>
                      })}
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
          
        </header>
        <h1 id="mixBuilder">Mix Builder</h1>
        <p>Your user ID is: {this.props.store.user.id}</p>
        <p>Your order ID is: {this.props.store.order.currentOrderId}</p>
        <p>Your mix ID is: {this.props.store.mixes.currentWorkingMix.id}</p>
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
