import React from 'react';
import { InputBox } from './FormComponents';
import { checkNotBlankError } from '../utils/FormValidation';

class EmployeeDetailRemoveJob extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      comment: '',
      errMsg: { },
      errChecks: {
        comment: t => checkNotBlankError(t),
      },
    };
  }

  handleShowForm() {
    this.setState({ showForm: true });
  }

  handleUpdate(field, text) {
    const newState = {
      ...this.state,
      [field]: text,
    };
    const newErrMsg = {
      ...this.state.errMsg,
      [field]: this.state.errChecks[field](text),
    };

    this.setState({ ...newState, errMsg: newErrMsg });
  }

  handleRemove(e) {
    e.preventDefault();
    const errors = this.state.errMsg;

    // loop through error checks and make sure they are all false
    const error = Object.keys(this.state.errChecks).reduce((acc, field) => {
      errors[field] = this.state.errChecks[field](this.state[field]);
      return acc || errors[field] !== false;
    }, false);
    if (error) this.setState({ errMsg: { ...this.state.errMsg, ...errors } });
    else this.props.onRemove(this.state.comment);
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({
      showForm: false,
      comment: '',
      errMsg: { },
    });
  }

  renderButton() {
    return (
      <button onClick={() => this.handleShowForm()}>De-activate Job</button>
    );
  }

  renderForm() {
    return (
      <form id="employee-detail-remove-job-form">
        <p>Please enter reason for deactivating job:</p>
        <InputBox
          title="Comment"
          onUpdate={text => this.handleUpdate('comment', text)}
          value={this.state.comment}
          errMsg={this.state.errMsg.comment}
        />
        <button onClick={e => this.handleRemove(e)}>Deactivate</button>
        <button onClick={e => this.handleCancel(e)}>Cancel</button>
      </form>
    );
  }

  render() {
    return (
      <div className="employee-detail-remove-job">
        {this.state.showForm ? this.renderForm() : this.renderButton()}
      </div>
    );
  }
}

export default EmployeeDetailRemoveJob;
