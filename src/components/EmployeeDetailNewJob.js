import React from 'react';
import Axios from 'axios';
import { InputBox, SelectBox, Checkbox } from './FormComponents';
import Auth from '../utils/Auth';
import { checkIfNumberError, checkPositiveNumberError, checkNotBlankError } from '../utils/FormValidation';

class EmployeeDetailNewJob extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showNewForm: false,
      options: { },
      jobDetails: null,
      errMsg: { initial: props.errMsg },
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
    } else {
      this.resetJobDetail();
      this.setState({ showNewForm: false });
    }
  }

  resetJobDetail() {
    this.setState({
      jobDetails: {
        category: '',
        jobName: '',
        rate: '',
        per: '',
        pc: '',
        otExempt: false,
        maxHours: '',
      },
      errorChecks: {
        category: t => checkNotBlankError(t),
        jobName: () => false,
        rate: t => checkNotBlankError(t) || checkIfNumberError(t) || checkPositiveNumberError(t),
        per: t => checkNotBlankError(t),
        pc: t => checkNotBlankError(t),
        otExempt: () => false,
        maxHours: (t) => {
          if (t === '') return false;
          return checkIfNumberError(t) || checkPositiveNumberError(t);
        },
      },
    });
  }

  handleClick() {
    // get options from API
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.get('/api/settings/all', { headers: { Authorization: authorizationHeader } })
      .then((response) => {
        this.setState({ showNewForm: true, options: response.data });
      });
  }

  handleUpdate(field, text) {
    const newJobDetails = {
      ...this.state.jobDetails,
      [field]: text,
    };
    const newErrMsg = {
      ...this.state.errMsg,
      [field]: this.state.errorChecks[field](text),
    };

    this.setState({ jobDetails: newJobDetails, errMsg: newErrMsg });
  }

  handleSave(e) {
    e.preventDefault();
    const errors = this.state.errMsg;

    // loop through error checks and make sure they are all false
    const error = Object.keys(this.state.errorChecks).reduce((acc, field) => {
      errors[field] = this.state.errorChecks[field](this.state.jobDetails[field]);
      return acc || errors[field] !== false;
    }, false);

    if (error) this.setState({ errMsg: { ...this.state.errMsg, ...errors } });
    else {
      this.props.onSave({
        ...this.state.jobDetails,
        rate: parseFloat(this.state.jobDetails.rate),
        jobName: this.state.jobDetails.jobName === '' ?
          this.state.jobDetails.category :
          this.state.jobDetails.jobName,
      });
    }
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
          title="Category"
          onUpdate={text => this.handleUpdate('category', text)}
          options={this.state.options.Jobs}
          value={this.state.jobDetails.category}
          errMsg={this.state.errMsg.category}
        />
        <InputBox
          title="Job Name"
          onUpdate={text => this.handleUpdate('jobName', text)}
          placeholder={this.state.jobDetails.category}
          value={this.state.jobDetails.jobName}
          errMsg={this.state.errMsg.jobName}
        />
        <InputBox
          title="Rate"
          onUpdate={text => this.handleUpdate('rate', text)}
          value={this.state.jobDetails.rate}
          errMsg={this.state.errMsg.rate}
        />
        <SelectBox
          title="Per"
          onUpdate={text => this.handleUpdate('per', text)}
          options={this.state.options.Pers}
          value={this.state.jobDetails.per}
          errMsg={this.state.errMsg.per}
        />
        <Checkbox
          title="Overtime Exempt?"
          onUpdate={() => this.handleUpdate('otExempt', !this.state.jobDetails.otExempt)}
          value={this.state.jobDetails.otExempt}
        />
        <InputBox
          title="Maximum Hours"
          onUpdate={text => this.handleUpdate('maxHours', text)}
          value={this.state.jobDetails.maxHours}
          disabled={this.state.jobDetails.otExempt}
          errMsg={this.state.errMsg.otExempt}
        />
        <SelectBox
          title="PC"
          onUpdate={text => this.handleUpdate('pc', text)}
          options={this.state.options.PCs}
          value={this.state.jobDetails.pc}
          errMsg={this.state.errMsg.pc}
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
