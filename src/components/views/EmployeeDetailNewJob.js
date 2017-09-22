import React from 'react';
import Axios from 'axios';
import { InputBox, SelectBox } from './FormComponents';

class EmployeeDetailNewJob extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showNewForm: false,
      options: {
        pers: [],
        roles: [],
      },
      jobDetails: null,
      errMsg: props.errMsg,
    };
  }

  componentDidMount() {
    this.resetJobDetail();
  }

  componentWillReceiveProps(nextProps) {
    // if jobDetails != null, show the form
    if (nextProps.jobDetails) {
      const newJobDetails = {
        ...this.state.jobDetails,
        ...nextProps.jobDetails,
      };
      this.setState({
        jobDetails: newJobDetails,
        showNewForm: true,
      });
    }
  }

  resetJobDetail() {
    this.setState({
      jobDetails: {
        dateCreate: null,
        role: '',
        rate: '',
        per: '',
      },
    });
  }

  handleClick() {
    this.setState({ showNewForm: true });
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
    const jobDetails = { ...this.state.jobDetails, dateCreate: Date.now() };
    this.props.onSave(jobDetails);
    this.setState({ showNewForm: false });
    this.resetJobDetail();
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({
      showNewForm: false,
    });
    this.resetJobDetail();
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
          value={this.state.jobDetails.role}
        />
        <InputBox
          title="Rate"
          onUpdate={text => this.handleUpdate('rate', text)}
          value={this.state.jobDetails.rate}
        />
        <SelectBox
          tilte="Per"
          onUpdate={text => this.handleUpdate('per', text)}
          options={this.state.options.pers}
          value={this.state.jobDetails.per}
        />
        <button onClick={e => this.handleSave(e)}>Save</button>
        <button onClick={e => this.handleCancel(e)}>Cancel</button>
      </form>
    );
  }

  render() {
    return (
      <div className="employee-detail-new-job">
        {this.state.showNewForm ? this.renderNewForm() : this.renderButton()}
      </div>
    );
  }
}

export default EmployeeDetailNewJob;
