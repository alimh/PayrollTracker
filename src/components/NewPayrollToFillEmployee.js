import React from 'react';
import { InputBox } from './FormComponents';

export const NewPayrollToFillEmployee = (props) => {
  const style = props.indexJob === 0 ? { borderTop: '1px solid #ddd' } : { };

  const weekDetail = (index) => {
    const detail = [];
    for (let i = 0; i < props.weeks; i += 1) {
      detail.push((
        <td style={style} key={i.toString().concat('-quanitity')}>
          <InputBox
            name={index.toString().concat('-quantity')}
            value={props.employee.jobs[index].weekData[i].quantity.value}
            onUpdate={val => props.onUpdate(val, 'quantity', i, index)}
            errMsg={props.employee.jobs[index].weekData[i].quantity.errMsg === false}
            placeholder={props.employee.jobs[index].per}
          />
        </td>
      ));
      detail.push((
        <td style={style} key={i.toString().concat('-totalHours')}>
          <InputBox
            name={index.toString().concat('-totalHours')}
            value={props.employee.jobs[index].weekData[i].totalHours.value}
            onUpdate={val => props.onUpdate(val, 'totalHours', i, index)}
            errMsg={props.employee.jobs[index].weekData[i].totalHours.errMsg === false}
            placeholder="Hours"
          />
        </td>
      ));
      detail.push((
        <td style={style} key={i.toString().concat('-excessHours')}>
          <InputBox
            name={index.toString().concat('-excessHours')}
            value={props.employee.jobs[index].weekData[i].excessHours.value}
            onUpdate={val => props.onUpdate(val, 'excessHours', i, index)}
            errMsg={props.employee.jobs[index].weekData[i].excessHours.errMsg === false}
            placeholder="Hours"
          />
        </td>
      ));
    }
    return detail;
  };
  const jobDetail = index => (
    <tr>
      <td key="name" style={style}>{index === 0 ? props.employee.name : ''}</td>
      <td key="store" style={style}>{props.employee.jobs[index].store}</td>
      <td key="role" style={style}>{props.employee.jobs[index].role}</td>
      <td key="rate" style={style}>
        {props.employee.jobs[index].rate} / {props.employee.jobs[index].per}
      </td>
      {weekDetail(index)}
      {index === props.employee.jobs.length - 1 ?
        <td key="save" style={style}><button onClick={props.onSave}>Save</button></td> :
        <td key="no-save" style={style} />
      }
    </tr>

  );

  return jobDetail(props.indexJob);
};

export default NewPayrollToFillEmployee;
