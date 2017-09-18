import React from 'react';
import EmployeeDetailNewJob from './EmployeeDetailNewJob';

const EmployeeDetail = (props) => {
  const handleDelete = (n) => {
    props.onDelete(n);
  };
  const handleSave = (newJob) => {
    console.log(newJob);
  };
  return (
    <div id="EmployeeDetail">
      <h4>Detail - {props.employee.name}</h4>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Rate</th>
            <th>Per</th>
            <th />
            <th>Overtime Exempt</th>
          </tr>
        </thead>
        <tbody>
          {props.employee.jobs.map((x, n) => (
            <tr key={n.toString()}>
              <td>{x.role}</td>
              <td>{x.store}</td>
              <td>{x.rate}</td>
              <td>{x.per}</td>
              <td>{x.maxHours}</td>
              <td>{x.otExempt}</td>
              <td><a href="" onClick={() => handleDelete(n)}>x</a></td>
            </tr>
        ))}
        </tbody>
      </table>
      <EmployeeDetailNewJob onSave={newJob => handleSave(newJob)} />
    </div>
  );
};

export default EmployeeDetail;
