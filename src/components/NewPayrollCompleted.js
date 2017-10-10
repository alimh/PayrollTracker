import React from 'react';
import { NewPayrollCompletedJob } from './NewPayrollCompletedJob';

export const NewPayrollCompleted = (props) => {
  const weeks = props.jobs[0].jobs[0].weekData.length;

  const weekHeaders = (n) => {
    const headers = [];
    for (let i = 0; i < n; i += 1) {
      headers.push((<th key={'q'.concat(i + 1)}>Quantity - Week { i + 1 }</th>));
      headers.push((<th key={'th'.concat(i + 1)}>Total Hours - Week { i + 1 }</th>));
      headers.push((<th key={'eh'.concat(i + 1)}>Excess Hours - Week { i + 1 }</th>));
      headers.push((<th key={'rp'.concat(i + 1)}>Regular Pay { i + 1 }</th>));
      headers.push((<th key={'otp'.concat(i + 1)}>OT Pay { i + 1 }</th>));
    }
    return headers;
  };

  return (
    <div id="NewPayrollToFill">
      <h4>Ready to submit:</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Store</th>
            <th>Job</th>
            <th>Rate</th>
            {weekHeaders(weeks)}
            <th />
          </tr>
        </thead>
        <tbody>
          {
            props.jobs.map((employee, indexEmployee) => (
              employee.jobs.map((job, indexJob) => (
                <NewPayrollCompletedJob
                  employee={employee}
                  indexJob={indexJob}
                  weeks={weeks}
                  onEdit={() => props.onEdit(indexEmployee)}
                />
              ))
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default NewPayrollCompleted;
