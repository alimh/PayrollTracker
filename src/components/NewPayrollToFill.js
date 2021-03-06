import React from 'react';
import { NewPayrollToFillEmployee as EmployeePayroll } from './NewPayrollToFillEmployee';

export const NewPayrollToFill = (props) => {
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
            {weekHeaders(props.weeks)}
            <th />
          </tr>
        </thead>
        <tbody>
          {
            props.jobs.map((employee, indexEmployee) => (
              employee.jobs.map((job, indexJob) => (
                <EmployeePayroll
                  employee={employee}
                  indexJob={indexJob}
                  weeks={props.weeks}
                  onUpdate={(val, nameField, indexWeek) =>
                    props.onUpdate(val, nameField, indexWeek, indexJob, indexEmployee)}
                  onSave={() => props.onSave(indexEmployee)}
                />
              ))
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default NewPayrollToFill;
