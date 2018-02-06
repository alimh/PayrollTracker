import React from 'react';

export const PayrollCategorySummary = (props) => {
  // cycle through completed jobs and get unique categories
  const weeks = props.jobs.length ? props.jobs[0].jobs[0].weekData.length : 0;
  const summary = props.jobs.reduce((acc, employee) => {
    employee.jobs.map(job =>
      job.weekData.map((data, n) => {
        const newAcc = acc;
        if (acc.length < weeks) {
          newAcc.push({
          });
        }
        const categoryPresent = acc[n][job.category] !== undefined;

        newAcc[n][job.category] = {
          ...newAcc[n][job.category],
          regularPay: data.regularPay + (categoryPresent ? acc[n][job.category].regularPay : 0),
          otPay: data.otPay + (categoryPresent ? acc[n][job.category].otPay : 0),
          totalHours: (data.totalHours.value || 0) + (categoryPresent ? acc[n][job.category].totalHours : 0),
          excessHours: (data.excessHours.value || 0) + (categoryPresent ? acc[n][job.category].excessHours : 0),
        };
        return newAcc;
      }),
    );
    const newAcc = acc.map((weekData, n) => {
      const newPremium = {
        otPay: employee.premiumPay[n],
        regularPay: 0,
        totalHours: 0,
        excessHours: 0,
      };
      return { ...weekData, Premium: newPremium };
    });
    return newAcc;
  }, []);

  const summarizeWeek = (weekData, weekNum) => (
    Object.keys(weekData).map((category, n) => {
      const th = weekData[category].totalHours || 0;
      const eh = weekData[category].excessHours || 0;
      const rh = (th - eh) > 40 ? 40 : th - eh;
      const oth = th - rh;
      const tp = (weekData[category].regularPay + weekData[category].otPay) || 0;

      return (
        <tr key={category}>
          <td>{n === 0 ? weekNum + 1 : ''}</td>
          <td>{category}</td>
          <td>{th}</td>
          <td>{rh}</td>
          <td>{oth}</td>
          <td>{tp}</td>
        </tr>
      );
    })
  );

  return (
    <div>
      <h4>Summary</h4>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Category</th>
            <th>Total Hours</th>
            <th>Regular Hours</th>
            <th>OT Hours</th>
            <th>Total Pay</th>
          </tr>
        </thead>
        <tbody>
          {
            summary.length > 0 ?
              summary.map((week, n) => summarizeWeek(week, n)) :
              (
                <tr>
                  <td></td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )
          }
        </tbody>
      </table>
    </div>
  );
};

export default PayrollCategorySummary;
