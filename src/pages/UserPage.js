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
    const tokenPresent = Auth.isUserAuthenticated();
    if (tokenPresent) {
      console.log('calling check-token');
      const authorizationHeader = 'bearer '.concat(Auth.getToken());
      Axios.get('/api/user/check-token', {
        headers: { Authorization: authorizationHeader } })
        .then((res) => {
          if (res.data.success) {
            const tokenNew = res.data.token;
            Auth.authenticateUser(tokenNew);
            this.props.tokenValid(res.data.userName);
          } else {
            const errMsg = res.data.errMsg;
            this.setState({ errMsg });
          }
        }).catch((res) => {
          const errMsg = res.toString();
          this.setState({ errMsg });
          this.props.tokenValid(false);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errMsg: nextProps.errMsg });
  }

  handleLogin() {
    const payload = { userName: this.state.userName, password: this.state.password };
    Axios.post('/api/user/login', payload)
      .then((res) => {
        if (res.data.success) {
          const token = res.data.token;
          Auth.authenticateUser(token);
          this.props.tokenValid(res.data.userName);
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
    this.props.tokenValid(false);
  }

  render() {
    return (
      <div className="page-content">
        {
          this.props.authenticated ?
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
