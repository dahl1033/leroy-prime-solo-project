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

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MixesPage);