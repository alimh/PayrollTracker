import React from 'react';
import { InputBox } from './FormComponents';

const noErrors = (obj) => {
  // check to make sure name and hireDate have been entered and there are no errors
  const r = obj.name !== null || obj.hireDate !== null;
  return !r;
};

class EmployeeNew extends React.Component {
  constructor() {
    super();

    this.state = {
      employeeDetails: {
        name: '',
        hireDate: '',
      },
      errMsg: { initial: true },  //errors
    };
  }

  handleUpdate(field, text) {
    const newEmployeeDetails = { ...this.state.employeeDetails, [field]: text };
    const newErrMsg = { ...this.state.errMsg,
      [field]: text ? null : 'Cannot be blank',
      initial: null,
    };
    this.setState({ employeeDetails: newEmployeeDetails, errMsg: newErrMsg });
  }

  handleSave(e) {
    e.preventDefault();

    this.props.onSave(this.state.employeeDetails);
  }

  handleCancel(e) {
    e.preventDefault();

    this.props.onCancel();
  }

  render() {
    return (
      <div>
        <InputBox
          title="Name"
          name="employee-name"
          type="text"
          value={this.state.employeeDetails.name}
          onUpdate={text => this.handleUpdate('name', text)}
          errMsg={this.state.errMsg.name}
        />
        <InputBox
          title="Hire Date"
          name="hire-date"
          type="text"
          value={this.state.employeeDetails.hireDate}
          onUpdate={text => this.handleUpdate('hireDate', text)}
          errMsg={this.state.errMsg.hireDate}
        />
        <button
          onClick={e => this.handleSave(e)}
          disabled={!noErrors(this.state.errMsg)}
        >
          Save
        </button>
        <button onClick={e => this.handleCancel(e)}>Cancel</button>
      </div>
    );
  }
}

export default EmployeeNew;
