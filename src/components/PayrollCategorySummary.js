import React from 'react';

export const PayrollCategorySummary = (props) => {
  // cycle through completed jobs and get unique categories
  const weeks = props.jobs.length ? props.jobs[0].jobs[0].weekData.length : 0;
  const summary = props.jobs.reduce((acc, employee) => {
    employee.jobs.map(job =>
      job.weekData.map((data, n) => {
        const newAcc = acc;
        if (acc.length < weeks) newAcc.push({});
        newAcc[n][job.jobName] = data.regularPay + (acc[n][job.jobName] || 0);
        return newAcc;
      }),
    );
    return acc;
  }, []);

  console.log(summary);
  return (
    <div>
      {
        summary.map((x, n) => (
          <div key={n}>
            <b>Week {n + 1}</b>
            <br />
            {x.toString()}
          </div>
        ))
      }
    </div>
  );
};

export default PayrollCategorySummary;
