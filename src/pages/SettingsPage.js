import React from 'react';
import Axios from 'axios';
import SettingsComponents from '../components/SettingsComponents';
import Auth from '../static/js/Auth';

export class SettingsPage extends React.Component {
  constructor() {
    super();
    this.state = { settings: null, errMsg: {} };
  }

  componentDidMount() {
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.get('/api/settings/all', { headers: { Authorization: authorizationHeader } })
      .then((response) => {
        const data = response.data;
        this.setState({ settings: data });
      })
      .catch((response) => {
        console.log('caught error'.concat(response));
        const newErrMsg = this.state.errMsg;
        newErrMsg.main = 'Server Error: '.concat(response);
        this.setState({ errMsg: newErrMsg });
      });
  }

  handleCreate(setting, item) {
    // check to see if item is not blank
    if (item === '') {
      const newErrMsg = this.state.errMsg;
      newErrMsg[setting] = 'Cannot be blank';
      this.setState({ errMsg: newErrMsg });
    } else {
      const authorizationHeader = 'bearer '.concat(Auth.getToken());
      const payload = {
        category: setting,
        value: item,
      };
      Axios.post('/api/settings/update', payload, { headers: { Authorization: authorizationHeader } })
        .then(() => {
          const newSetting = this.state.settings;
          newSetting[setting] = [...this.state.settings[setting], item];
          const newErrMsg = this.state.errMsg;
          newErrMsg[setting] = null;
          return this.setState({ settings: newSetting, errMsg: newErrMsg });
        })
        .catch(err => this.setState({ errMsg: err }));
    }
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
    return this.state.settings ? (
      <div>
        <p>start of settings</p>
        {
          Object.keys(this.state.settings).map(comp => (
            <SettingsComponents
              key={comp}
              header={comp}
              content={this.state.settings[comp]}
              onCreate={item => this.handleCreate(comp, item)}
              onDisable={item => this.handleDisable(comp, item)}
              errMsg={this.state.errMsg[comp]}
            />
          ))
        }
      </div>
    ) : (
      <div className="page-content">
        <p>Retreiving data...</p>
        <p>{this.state.errMsg.main}</p>
      </div>
    );
  }
}

export default SettingsPage;
