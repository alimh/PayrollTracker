import React from 'react';

export const NewPayrollCompletedJob = (props) => {
  const style = props.indexJob === 0 ? { borderTop: '1px solid #ddd' } : { };

  const weekDetail = (index) => {
    const detail = [];
    for (let i = 0; i < props.weeks; i += 1) {
      detail.push((
        <td style={style} key={i.toString().concat('-quanitity')}>
          {props.employee.jobs[index].weekData[i].quantity.value}
        </td>
      ));
      detail.push((
        <td style={style} key={i.toString().concat('-totalHours')}>
          {props.employee.jobs[index].weekData[i].totalHours.value}
        </td>
      ));
      detail.push((
        <td style={style} key={i.toString().concat('-excessHours')}>
          {props.employee.jobs[index].weekData[i].excessHours.value}
        </td>
      ));
      detail.push((
        <td style={style} key={i.toString().concat('-regularPay')}>
          {props.employee.jobs[index].weekData[i].regularPay}
        </td>
      ));
      detail.push((
        <td style={style} key={i.toString().concat('-otPay')}>
          {props.employee.jobs[index].weekData[i].otPay}
        </td>
      ));
    }
    return detail;
  };
  const jobDetail = index => (
    <tr>
      <td key="name" style={style}>{index === 0 ? props.employee.name : ''}</td>
      <td key="store" style={style}>{props.employee.jobs[index].store}</td>
      <td key="role" style={style}>{props.employee.jobs[index].jobName}</td>
      <td key="rate" style={style}>
        {props.employee.jobs[index].rate} / {props.employee.jobs[index].per}
      </td>
      {weekDetail(index)}
      {index === props.employee.jobs.length - 1 ?
        <td key="edit" style={style}><button onClick={props.onEdit}>Edit</button></td> :
        <td key="no-edit" style={style} />
      }
    </tr>

  );

  return jobDetail(props.indexJob);
};

export default NewPayrollCompletedJob;
