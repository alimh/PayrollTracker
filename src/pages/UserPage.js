import React from 'react';
import Axios from 'axios';
import { InputBox } from '../components/FormComponents';
import Auth from '../static/js/Auth';

export class UserPage extends React.Component {
  constructor(props) {
    super();
    this.state = { userName: '', password: '', errMsg: props.errMsg || '' };
  }

  componentDidMount() {
    const authenticated = Auth.isUserAuthenticated();
    if (authenticated) {
      const tokens = Auth.getToken();
      console.log(tokens);
      // check server to see if token is valid.
      //  if yes, this.props.updateTokens...
      //  if no, ?
      this.props.updateTokens(tokens);
    }
  }

  componentWillReceiveProps() {
    console.log('receiving props');
    this.setState({ errMsg: this.props.errMsg });
  }

  handleLogin() {
    const payload = { userName: this.state.userName, password: this.state.password };
    Axios.post('/api/user/login', payload)
      .then((res) => {
        if (res.data.success) {
          const tokens = { Api: res.data.tokenAPI, Refresh: res.data.tokenRefresh };
          Auth.authenticateUser(tokens);
          this.props.updateTokens(tokens);
        } else {
          const errMsg = res.data.errMsg;
          this.setState({ errMsg });
        }
      })
      .catch((res) => {
        const errMsg = res.toString();
        this.setState({ errMsg });
      });
  }

  handleLogout() {
    Auth.deauthenticateUser();
    this.props.updateTokens(null);
  }

  render() {
    console.log(this.props.tokens);
    return (
      <div className="page-content">
        {
          this.props.tokens ?
            <button onClick={() => this.handleLogout()}>Logout</button> :
            <div id="login-form">
              <div className="error-message">{this.state.errMsg}</div>
              <InputBox
                title="username"
                onUpdate={text => this.setState({ userName: text })}
                value={this.state.userName}
              />
              <InputBox
                title="password"
                onUpdate={text => this.setState({ password: text })}
                value={this.state.password}
              />
              <button onClick={() => this.handleLogin()}>Login</button>
            </div>
        }
      </div>
    );
  }
}

export default UserPage;
