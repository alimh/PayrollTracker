import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { NotFoundPage } from './components/NotFoundPage';
import { SettingsPage } from './pages/SettingsPage';
import { EmployeeSearchPage } from './pages/EmployeeSearchPage';
import { NewPayroll } from './pages/NewPayroll';
import { UserPage } from './pages/UserPage';

// import athletes from '../data/athletes';

// const renderAthlete = ({ match, staticContext }) => {
//   const id = match.params.id;
//   const athlete = athletes.find(current => current.id === id);
//   if (!athlete) {
//     return <NotFoundPage staticContext={staticContext} />;
//   }

//   return <AthletePage athlete={athlete} athletes={athletes} />;
// };

// const renderSettings = () => { console.log('rendering settings'); return <SettingsPage />; };

// export const App = () => (
export class App extends React.Component {
  constructor() {
    super();
    this.state = ({ authenticated: false, tokens: null });
  }

  updateTokens(tokens) {
    // if (tokens) Auth.authenticateUser(tokens);
    // else Auth.deauthenticateUser();
    const newState = {
      authenticated: tokens !== null,
      tokens,
    };
    this.setState(newState);
  }

  render() {
    const renderUserPage = props =>
      <UserPage tokens={this.state.tokens} updateTokens={tokens => this.updateTokens(tokens)} {...props} />;
    const renderSettings =
      <SettingsPage tokens={this.state.tokens} updateTokens={this.updateToken} />;
    const renderEmployees =
      <EmployeeSearchPage tokens={this.state.tokens} updateTokens={this.updateToken} />;
    const renderPayroll =
      <NewPayroll tokens={this.state.tokens} updateTokens={this.updateToken} />;

    const authenticateRoute = (route) => {
      console.log('calling authentication');
      const auth = this.state.authenticated;
      return auth ? route : renderUserPage({ errMsg: 'You need to be logged in to do that' });
    };

    return (
      <Layout>
        <Switch>
          <Route exact path="/user" render={renderUserPage} />
          <Route exact path="/settings" render={() => authenticateRoute(renderSettings)} />
          <Route exact path="/employees" render={() => authenticateRoute(renderEmployees)} />
          <Route exact path="/payroll" render={() => authenticateRoute(renderPayroll)} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
