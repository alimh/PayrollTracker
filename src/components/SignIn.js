import React from 'react';
import Axios from 'axios';
// import auth from '../auth';
// import SignOut from './SignOut';

export default class SignIn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      errMsg: props.errMsg || null,
//      authenticated: auth.isUserAuthenticated(),
      password: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    Axios.post('/auth/login', { password: this.state.password })
            .then((response) => {
//              auth.authenticateUser(response.data.token);
              if (this.props.onSuccess) {
                this.props.onSuccess();
              } else {
                this.setState({ authenticated: true });
              }
            })
            .catch((error) => {
              this.setState({ authenticated: false, errMsg: error.response.data.message });
            });
  }

  render() {
    if (this.state.authenticated) {
      return (
        <div>
          <p>Thanks for logging in</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Sign In</h2>
        <p>{this.state.errMsg}</p>
        <label htmlFor="password" />
        <input
          id="password"
          type="password"
          onChange={(e) => { this.setState({ password: e.target.value }); }}
          value={this.state.password}
        />
        <button onClick={e => this.handleSubmit(e)}>Click here to login</button>
      </div>
    );
  }
}
