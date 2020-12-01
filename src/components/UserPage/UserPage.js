import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import SliderBar from '../SliderBar/SliderBar';

import './UserPage.css';
class UserPage extends Component {
  state = {
    name: '',
  };
  // on page load run this function
  componentDidMount() {
    this.getItems();
    this.props.dispatch({type:'FETCH_MIX_INFO', payload: {mixId: this.props.store.mixes.mixId}})
  }

  // dispatch calls to get all the items from the DB based off their type on page load
  getItems = () => {
    this.props.dispatch({type: 'FETCH_INVENTORY_ITEMS'});
    this.props.dispatch({type: 'FETCH_ALMOND_ITEMS', payload: 'almond'});
    this.props.dispatch({type: 'FETCH_PECAN_ITEMS', payload: 'pecan'});
    this.props.dispatch({type: 'FETCH_CASHEW_ITEMS', payload: 'cashew'});
    this.props.dispatch({type: 'FETCH_PISTACHIO_ITEMS', payload: 'pistachio'});
    this.props.dispatch({type: 'FETCH_DRIED_FRUIT_ITEMS', payload: 'dried'});
    this.props.dispatch({type: 'FETCH_CONFECTIONS_ITEMS'});
    this.props.dispatch({type: 'FETCH_ITEMS_IN_MIX', payload: {mixId: this.props.store.mixes.mixId}});
    this.props.dispatch({type: 'FETCH_GUMMY_ITEMS', payload: 'gummy'});
    this.props.dispatch({type: 'FETCH_BANANA_ITEMS', payload: 'chip'});
    this.props.dispatch({type: 'FETCH_PRETZEL_ITEMS', payload: 'pretzel'});

  }
  // on user input when they type change local state to their string value
  handleChange = (event) => {
     console.log(this.state.name);
    this.setState({
      name: event
    });
    if(this.state.name != ''){
      this.props.dispatch({type: 'FETCH_SEARCH_ITEMS', payload: this.state.name});
    }
  }
  // dispatch to add item to mix in DB
  addItemToMix = (item) => {
    console.log("IN addItemToMix: mixID =",this.props.store.mixes.mixId, "item ID", item.id);
    this.props.dispatch({ type: 'ADD_ITEM_TO_MIX', 
                          payload: { 
                            mix_id: this.props.store.mixes.mixId,
                            item_id: item.id
                          }});
    this.props.dispatch({type: 'FETCH_ITEMS_IN_MIX', payload: {mixId: this.props.store.mixes.mixId}});
  }
  // on click delete item from mix in DB
  deleteItemFromMix = (item) => {
    console.log('in delete', item);
    this.props.dispatch({type: 'DELETE_ITEM_IN_MIX', payload: item });
    this.props.dispatch({type: 'FETCH_ITEMS_IN_MIX', payload: {mixId: this.props.store.mixes.mixId}});

  }
  // send user back to mixes page
  backToMixes = () =>{
    this.props.history.push(`/mixes`);
  }
  saveToMixes = () =>{
    this.props.history.push(`/mixes`);
  }
  
  render() {
    return (
      <div className="container shadow-lg rounded">
        <header>
          <div class="dropdown shadow-lg">
            <button class="dropbtn1 shadow-lg">Nuts</button>
            <div class="dropdown-content1">
              <div class="dropdown-wrapper">
              <button class="dropbtn2">Almonds</button>
              <div class="dropdown-content2">
                {this.props.store.items.almondItems.map((item) => {
                    return <>
                      <a onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
                </div>
              </div>
              <div class="dropdown-wrapper">
              <button class="dropbtn2">Pecans</button>
              <div class="dropdown-content2">
                {this.props.store.items.pecanItems.map((item) => {
                    return <>
                      <a onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
                </div>
              </div>
              <div class="dropdown-wrapper">
              <button class="dropbtn2">Cashews</button>
              <div class="dropdown-content2">
                {this.props.store.items.cashewItems.map((item) => {
                    return <>
                      <a onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
                </div>
              </div>
              <div class="dropdown-wrapper">
              <button class="dropbtn2">Pistachios</button>
              <div class="dropdown-content2">
                {this.props.store.items.pistachioItems.map((item) => {
                    return <>
                      <a onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown shadow-lg">
            <button class="dropbtn1 shadow-lg">Dried Fruits</button>
            <div class="dropdown-content1">
              <div class="dropdown-wrapper">
              <button class="dropbtn2">Dried Fruits</button>
              <div class="dropdown-content2">
                {this.props.store.items.driedFruitItems.map((item) => {
                    return <>
                      <a onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
                </div>
              </div>
              </div>
            </div>
            <div class="dropdown shadow-lg">
            <button class="dropbtn1 shadow-lg">Confections</button>
            <div class="dropdown-content1">
              <div class="dropdown-wrapper">
              <button class="dropbtn2">Banana Chips</button>
              <div class="dropdown-content2">
                {this.props.store.items.bananaChipItems.map((item) => {
                    return <>
                      <a onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
                </div>
              </div>
              <div class="dropdown-wrapper">
              <button class="dropbtn2">Gummies</button>
              <div class="dropdown-content2">
                {this.props.store.items.gummyItems.map((item) => {
                    return <>
                      <a onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
                </div>
              </div>
              <div class="dropdown-wrapper">
              <button class="dropbtn2">Pretzels</button>
              <div class="dropdown-content2">
                {this.props.store.items.pretzelItems.map((item) => {
                    return <>
                      <a onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
                </div>
              </div>
              </div>
            </div>
            <div class="dropdown shadow-lg">
            <input placeholder='Search' id="searchInput" onChange={e => this.handleChange(e.target.value)}></input>
            <div class="dropdown-content1">
              <div class="dropdown-search-wrapper">
                {this.props.store.items.searchItems.map((item) => {
                    return <>
                      <a className="search-results" onClick={() => this.addItemToMix(item)}>
                      {item.name}
                      </a>
                          </>
                        })}
              </div>
              </div>
            </div>
            
        </header>
        {/* <div className="mix-main shadow-lg"></div> */}
        <h1>Items in {this.props.store.mixes.mixInfo.name} Mix</h1>
        <ul className="ordersul shadow-lg rounded">
          {this.props.store.mixes.itemsInCurrentMix.map((item) => {
                      return <>
                        <li className="ordersli shadow-lg rounded" onClick={() => this.deleteItemFromMix(item)}>
                          <p>{item.name} </p>
          <p>{item.price_per_lb-0.01}/lb</p>
                        </li>
                        <div className="proportion">
                        <Typography id="discrete-slider-always" gutterBottom>
                          Proportion of {item.name}
                        </Typography>
                        <SliderBar id= {item.id} mixId={item.mix_id} proportion={item.item_size}/>
                        {/* <Slider
                          id="slider"
                          defaultValue={50}
                          // getAriaValueText={valuetext}
                          aria-labelledby="discrete-slider-always"
                          step={10}
                          marks={[10,20,30,40,50,60,70,80,90,100]}
                          valueLabelDisplay="on"
                        /> */}
                        </div>
                            </>
          })}
        </ul>
        <button className="btns shadow-lg" onClick={this.backToMixes}>Mixes</button>
        <button className="btns shadow-lg" id="submitBtn" onClick={this.saveToMixes}>Save</button>
        <img id='bg' src='https://www.shopmarketbasket.com/sites/default/files/inline-images/trail-mix-in-bowls-body_1.jpg'></img>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
