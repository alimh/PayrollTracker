import React from 'react';
import Axios from 'axios';
import { InputBox, SelectBox } from './FormComponents';

class EmployeeDetailNewJob extends React.Component {
  constructor() {
    super();
    this.state = {
      newClicked: false,
      options: {
        pers: [],
        roles: [],
      },
      jobDetails: {
        dateCreate: null,
        role: null,
        rate: null,
        per: null,
      },
    };
  }

  handleClick() {
    this.setState({ newClicked: true });
    // get options from API
    Axios.get('/api/settings/job-options').then((response) => {
      this.setState({ options: response.data });
    });
  }

  handleUpdate(field, text) {
    const newJobDetails = {
      ...this.state.jobDetails,
      [field]: text,
    };
    this.setState({ jobDetails: newJobDetails });
  }
  handleSave(e) {
    e.preventDefault();
    this.props.onSave(this.state.jobDetails);
  }

  handleCancel(e) {
    e.preventDefault();
    const newJobNull = {
      dateCreate: null,
      role: null,
      rate: null,
      per: null,
    };
    this.setState({
      newJob: newJobNull,
      newClicked: false,
    });
  }

  renderButton() {
    return (
      <button onClick={() => this.handleClick()}>New</button>
    );
  }

  renderNewForm() {
    return (
      <form id="employee-detail-new-job-form">
        <SelectBox
          title="Role"
          onUpdate={text => this.handleUpdate('role', text)}
          options={this.state.options.roles}
        />
        <InputBox title="Rate" onUpdate={text => this.handleUpdate('rate', text)} />
        <SelectBox
          tilte="Per"
          onUpdate={text => this.handleUpdate('per', text)}
          options={this.state.options.pers}
        />
        <button onClick={e => this.handleSave(e)}>Save</button>
        <button onClick={e => this.handleCancel(e)}>Cancel</button>
      </form>
    );
  }

  render() {
    return (
      <div className="employee-detail-new-job">
        {this.state.newClicked ? this.renderNewForm() : this.renderButton()}
      </div>
    );
  }
}

export default EmployeeDetailNewJob;
