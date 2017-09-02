import React from 'react';
// import Axios from 'axios';
import SettingsComponents from '../views/SettingsComponents';

export class SettingsPage extends React.Component {
  static handleCreate(setting, item) {
    const msg = 'Creating: ';
    console.log(msg, setting, item);
  }

  static handleDisable(setting, item) {
    const msg = 'Disabling: ';
    console.log(msg, setting, item);
  }

  constructor() {
    super();
    const data = {
      PCs: ['304248', '302254'],
      Roles: ['Baker', 'Finisher', 'Crew', 'Maintenance'],
    };
    this.state = { settings: data };
  }

  componentDidMount() {
    // Axios.get('/api/settings').then((response) => {
    //   const data = response.data;
    //   this.setState({ settings: data });
    // });
  }

  render() {
    return (
      <div className="page-content">
        <SettingsComponents
          header="PCs"
          content={this.state.settings.PCs}
          onCreate={item => SettingsPage.handleCreate('PCs', item)}
          onDisable={item => SettingsPage.handleDisable('PCs', item)}
        />
        <SettingsComponents
          header="Roles"
          content={this.state.settings.Roles}
          onCreate={item => SettingsPage.handleCreate('Roles', item)}
          onDisable={item => SettingsPage.handleDisable('Roles', item)}
        />
      </div>
    );
  }
}

export default SettingsPage;
