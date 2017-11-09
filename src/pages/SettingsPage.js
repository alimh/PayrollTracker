import React from 'react';
import Axios from 'axios';
import SettingsComponents from '../components/SettingsComponents';

export class SettingsPage extends React.Component {
  constructor() {
    super();
    this.state = { settings: null, errMsg: {} };
  }

  componentDidMount() {
    Axios.get('/api/settings/all').then((response) => {
      const data = response.data;
      this.setState({ settings: data });
    });
  }

  handleCreate(setting, item) {
    const newSetting = this.state.settings;
    const newErrMsg = this.state.errMsg;

    // check to see if item is not blank
    console.log(item === '');
    if (item === '') {
      newErrMsg[setting] = 'Cannot be blank';
    } else {
      newSetting[setting] = [...this.state.settings[setting], item];
      newErrMsg[setting] = null;
    }
    console.log(newErrMsg);
    this.setState({ settings: newSetting, errMsg: newErrMsg });
    // Axios.post('api/settings/update');
  }

  handleDisable(setting, item) {
    const index = this.state.settings[setting].indexOf(item);
    const newSetting = this.state.settings;
    const newErrMsg = this.state.errMsg;
    newSetting[setting].splice(index, 1);
    newErrMsg[setting] = null;
    this.setState({ settings: newSetting, errMsg: newErrMsg });
  }

  render() {
    console.log(this.state);
    return this.state.settings ? (
      <div className="page-content">
        <SettingsComponents
          header="PCs"
          content={this.state.settings.PCs}
          onCreate={item => this.handleCreate('PCs', item)}
          onDisable={item => this.handleDisable('PCs', item)}
          errMsg={this.state.errMsg.PCs}
        />
        <SettingsComponents
          header="Categories"
          content={this.state.settings.Categories}
          onCreate={item => this.handleCreate('Categories', item)}
          onDisable={item => this.handleDisable('Categories', item)}
          errMsg={this.state.errMsg.Categories}
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
