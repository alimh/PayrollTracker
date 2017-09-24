import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { NotFoundPage } from './components/NotFoundPage';
import { SettingsPage } from './pages/SettingsPage';
import { EmployeeSearchPage } from './pages/EmployeeSearchPage';
// import athletes from '../data/athletes';

// const renderAthlete = ({ match, staticContext }) => {
//   const id = match.params.id;
//   const athlete = athletes.find(current => current.id === id);
//   if (!athlete) {
//     return <NotFoundPage staticContext={staticContext} />;
//   }

//   return <AthletePage athlete={athlete} athletes={athletes} />;
// };
const renderSettings = () => <SettingsPage />;

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/settings" render={renderSettings} />
      <Route exact path="/employees" component={EmployeeSearchPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Layout>
);

export default App;
