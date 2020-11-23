import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register
          </button>
        </center>
        <img id='bg' src='https://cdn.pixabay.com/photo/2020/09/29/08/16/mixed-nuts-5612176__340.jpg'></img>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
