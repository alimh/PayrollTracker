import React from 'react';
import EmployeeDetailNewJob from './EmployeeDetailNewJob';
import EmployeeDetailChangeRate from './EmployeeDetailChangeRate';
import EmployeeDetailRemoveJob from './EmployeeDetailRemoveJob';

const EmployeeDetail = (props) => {
  const handleRemove = (comment, id) => {
    props.onRemove(id, comment);
  };

  const handleSave = (newJob) => {
    props.onNew(newJob);
  };

  const handleChangeRate = (rateChange, id) => {
    props.onChangeRate(id, rateChange);
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
            <th>Rate History</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {props.employee.jobs.map(x => (
            <tr key={x.id}>
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
                  onSave={rateChange => handleChangeRate(rateChange, x.id)}
                />
              </td>
              <td>
                <EmployeeDetailRemoveJob
                  onRemove={comment => handleRemove(comment, x.id)}
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
