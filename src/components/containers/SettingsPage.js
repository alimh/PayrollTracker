import React from 'react';
import Axios from 'axios';
import SettingsComponents from '../views/SettingsComponents';

export class SettingsPage extends React.Component {
  constructor() {
    super();
    this.state = { settings: null };
  }

  componentDidMount() {
    Axios.get('/api/settings/all').then((response) => {
      const data = response.data;
      this.setState({ settings: data });
    });
  }

  handleCreate(setting, item) {
    const newSetting = this.state.settings;
    newSetting[setting] = [...this.state.settings[setting], item];
    this.setState({ settings: newSetting });
    // Axios.post('api/settings/update');
  }

  handleDisable(setting, item) {
    const index = this.state.settings[setting].indexOf(item);
    const newSetting = this.state.settings;
    newSetting[setting].splice(index, 1);
    this.setState({ settings: newSetting });
  }

  render() {
    return this.state.settings ? (
      <div className="page-content">
        <SettingsComponents
          header="PCs"
          content={this.state.settings.PCs}
          onCreate={item => this.handleCreate('PCs', item)}
          onDisable={item => this.handleDisable('PCs', item)}
        />
        <SettingsComponents
          header="Roles"
          content={this.state.settings.Roles}
          onCreate={item => this.handleCreate('Roles', item)}
          onDisable={item => this.handleDisable('Roles', item)}
        />
      </div>
      ) : (
        <div className="page-content">
          <p>Retreiving data...</p>
        </div>
    );
  }
}

export default SettingsPage;
