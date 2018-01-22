import React from 'react';
import { InputBox } from './FormComponents';
import { checkIfNumberError, checkPositiveNumberError, checkNotBlankError } from '../utils/FormValidation';

class EmployeeDetailChangeRate extends React.Component {
  constructor() {
    super();
    this.state = {
      showHistory: false,
      rate: '',
      comment: '',
      errMsg: { },
      errorChecks: {
        rate: t => checkNotBlankError(t) || checkIfNumberError(t) || checkPositiveNumberError(t),
        comment: t => checkNotBlankError(t),
      },
    };
  }

  componentWillReceiveProps() {
    this.resetForm();
  }

  resetForm() {
    this.setState({
      rate: '',
      comment: '',
      errMsg: { },
    });
  }

  handleShowHistory(e) {
    e.preventDefault();
    this.setState({ showHistory: true });
  }

  handleUpdate(field, text) {
    const newErrMsg = {
      ...this.state.errMsg,
      [field]: this.state.errorChecks[field](text),
    };

    this.setState({ [field]: text, errMsg: newErrMsg });
  }

  handleSave(e) {
    e.preventDefault();
    const errors = this.state.errMsg;

    // loop through error checks and make sure they are all false
    const error = Object.keys(this.state.errorChecks).reduce((acc, field) => {
      errors[field] = this.state.errorChecks[field](this.state[field]);
      return acc || errors[field] !== false;
    }, false);

    if (error) this.setState({ errMsg: { ...this.state.errMsg, ...errors } });
    else {
      const rateChange = {
        rate: parseFloat(this.state.rate),
        comment: this.state.comment,
        changeDate: new Date(),
      };
      this.props.onSave(rateChange);
    }
  }

  handleClear(e) {
    e.preventDefault();
    this.resetForm();
    this.setState({ showHistory: false });
  }

  renderHistory() {
    return (
      <div>
        <div>
          <h4>Rate History</h4>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Rate</th>
                <th>Comment</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {
                this.props.rateChangeHistory.map((x, n) => (
                  <tr key={n.toString()}>
                    <td>{x.changeDate}</td>
                    <td>{x.rate}</td>
                    <td>{x.comment}</td>
                    <td />
                    <td />
                  </tr>
                ))
              }
              <tr key="new">
                <td />
                <td>
                  <InputBox
                    title="New Rate"
                    onUpdate={text => this.handleUpdate('rate', text)}
                    value={this.state.rate}
                    errMsg={this.state.errMsg.rate}
                  />
                </td>
                <td>
                  <InputBox
                    title="Comments"
                    onUpdate={text => this.handleUpdate('comment', text)}
                    value={this.state.comment}
                    errMsg={this.state.errMsg.comment}
                  />
                </td>
                <td><button onClick={e => this.handleSave(e)}>Save</button></td>
                <td><button onClick={e => this.handleClear(e)}>Close</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderButton() {
    return (
      <div>
        <button onClick={e => this.handleShowHistory(e)}>Show History</button>
      </div>
    );
  }

  render() {
    return this.state.showHistory ? this.renderHistory() : this.renderButton();
  }
}

export default EmployeeDetailChangeRate;
