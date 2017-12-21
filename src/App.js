import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { NotFoundPage } from './components/NotFoundPage';
import { SettingsPage } from './pages/SettingsPage';
import { EmployeeSearchPage } from './pages/EmployeeSearchPage';
import { NewPayroll } from './pages/NewPayroll';
import { UserPage } from './pages/UserPage';

export class App extends React.Component {
  constructor() {
    super();
    this.state = ({ authenticated: false });
  }

  tokenValid(isTokenValid) {
    this.setState({ authenticated: isTokenValid });
  }

  render() {
    const renderUserPage = props =>
      (
        <UserPage
          authenticated={this.state.authenticated}
          tokenValid={isTokenValid => this.tokenValid(isTokenValid)}
          {...props}
        />
      );
    const renderSettings =
      <SettingsPage tokenValid={isTokenValid => this.tokenValid(isTokenValid)} />;
    const renderEmployees =
      <EmployeeSearchPage tokenValid={isTokenValid => this.tokenValid(isTokenValid)} />;
    const renderPayroll =
      <NewPayroll tokenValid={isTokenValid => this.tokenValid(isTokenValid)} />;

    const authenticateRoute = (route) => {
      const auth = this.state.authenticated;
      return auth ? route : renderUserPage({ errMsg: 'You need to be logged in to do that.' });
    };

    return (
      <Layout authenticated={this.state.authenticated}>
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
