import React from 'react';
import EmployeeDetailNewJob from './EmployeeDetailNewJob';

const EmployeeDetail = (props) => {
  const handleDelete = (e, n) => {
    e.preventDefault();
    props.onDelete(n);
  };

  const handleSave = (newJob) => {
    props.onNew(newJob);
  };

  return (
    <div id="EmployeeDetail">
      <h4>Detail - {props.employee.name}</h4>
      <div className="error-message">{props.errorMsg}</div>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Rate</th>
            <th>Per</th>
            <th>Overtime Exempt</th>
            <th>Maximum Hours Before OT</th>
          </tr>
        </thead>
        <tbody>
          {props.employee.jobs.map((x, n) => (
            <tr key={n.toString()}>
              <td>{x.job}</td>
              <td>{x.pc}</td>
              <td>{x.rate}</td>
              <td>{x.per}</td>
              <td>{x.otExempt ? 'Exempt' : 'Not Exempt'}</td>
              <td>{x.maxHours ? x.maxHours : '-'}</td>
              <td><button onClick={e => handleDelete(e, n)}>x</button></td>
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
