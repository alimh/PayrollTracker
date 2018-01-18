import React from 'react';
import EmployeeDetailNewJob from './EmployeeDetailNewJob';
import EmployeeDetailChangeRate from './EmployeeDetailChangeRate';

const EmployeeDetail = (props) => {
  const handleDelete = (e, n) => {
    e.preventDefault();
    props.onDelete(n);
  };

  const handleSave = (newJob) => {
    console.log(newJob);
    props.onNew(newJob);
  };

  const handleChangeRate = (rateChange, n) => {
    props.onChangeRate(props.employee._id, n, rateChange);
  };

  return (
    <div id="EmployeeDetail">
      <h4>Detail - {props.employee.name}</h4>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Rate</th>
            <th>Per</th>
            <th>Overtime Exempt</th>
            <th>Maximum Hours Before OT</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.employee.jobs.map((x, n) => (
            <tr key={n.toString()}>
              <td>{x.category}</td>
              <td>{x.jobName}</td>
              <td>{x.pc}</td>
              <td>{x.rate}</td>
              <td>{x.per}</td>
              <td>{x.otExempt ? 'Exempt' : 'Not Exempt'}</td>
              <td>{x.maxHours ? x.maxHours : '-'}</td>
              <td>
                <EmployeeDetailChangeRate
                  rateChangeHistory={x.rateChangeHistory}
                  onSave={rateChange => handleChangeRate(rateChange, n)}
                />
              </td>
            </tr>
        ))}
        </tbody>
      </table>
      <EmployeeDetailNewJob
        jobDetails={props.jobDetails}
        onSave={newJob => handleSave(newJob)}
      />
    </div>
  );
};

export default EmployeeDetail;
