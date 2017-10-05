import React from 'react';
import { NewPayrollToFillEmployee as EmployeePayroll } from './NewPayrollToFillEmployee';

export class NewPayrollToFill extends React.Component {
  constructor(props) {
    super();

    this.state = {
      payroll: props.jobs,
    };
  }

  handleSave(e, n) {
    e.preventDefault();
    const q = [this.state.quantitiesW1[n], this.state.quantitiesW2[n]];
    const th = [this.state.totalHoursW1[n], this.state.totalHoursW2[n]];
    const eh = [this.state.excessHoursW1[n], this.state.excessHoursW2[n]];

    const otHours = this.props.jobs[n].otExempt ?
      [0, 0] : [
        eh[0] + th[0] - this.props.jobs[n].maxHours,
        eh[1] + th[1] - this.props.jobs[n].maxHours,
      ];
    const rate = this.props.jobs[n].rate;

    const payRegular = [
      rate * this.props.jobs[n].otExempt ? q[0] :
        this.props.jobs[n],
    ];
    const payload = {
      ...this.props.jobs[n],
      quantities: [this.state.quantitiesW1[n], this.state.quantitiesW2[n]],
      totalHours: [this.state.totalHoursW1[n], this.state.totalHoursW2[n]],
      excessHours: [this.state.excessHoursW1[n], this.state.excessHoursW2[n]],
      payRegular: [
        this.props.jobs[n].rate * this.props.jobs[n].otExempt ?
          this.state.quantitiesW1[n] :
          this.props.jobs[n].maxHours,
        this.props.jobs[n].rate * this.props.jobs[n].otExempt ?
          this.state.quantitiesW2[n] :
          this.props.jobs[n].maxHours,
      ],
    };
  }

  render() {
    const weekHeaders = (n) => {
      const headers = [];
      for (let i = 0; i < n; i += 1) {
        headers.push((<th key={'q'.concat(i + 1)}>Quantity - Week { i + 1 }</th>));
        headers.push((<th key={'th'.concat(i + 1)}>Total Hours - Week { i + 1 }</th>));
        headers.push((<th key={'eh'.concat(i + 1)}>Excess Hours - Week { i + 1 }</th>));
      }
      return headers;
    };
    return (
      <div id="NewPayrollToFill">
        <h4>Enter hours for the following jobs:</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Store</th>
              <th>Job</th>
              <th>Rate</th>
              {weekHeaders(this.props.weeks)}
              <th />
            </tr>
          </thead>
          <tbody>
            {
              this.props.jobs.map((employee, indexEmployee) => (
                employee.jobs.map((job, indexJob) => (
                  <EmployeePayroll
                    employee={employee}
                    indexJob={indexJob}
                    weeks={this.props.weeks}
                    onUpdate={(val, nameField, indexWeek) =>
                      this.props.onUpdate(val, nameField, indexWeek, indexJob, indexEmployee)}
                    onSave={() => this.props.onSave(indexEmployee)}
                  />
                ))
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default NewPayrollToFill;
