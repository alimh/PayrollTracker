import React from 'react';
import { InputBox } from './FormComponents';

export const NewPayrollToFillEmployee = (props) => {
  const style = props.indexJob === 0 ? { borderTop: '1px solid #ddd' } : { };

  const weekDetail = (index) => {
    const detail = [];
    const per = props.employee.jobs[index].per;
    for (let i = 0; i < props.weeks; i += 1) {
      detail.push((
        <td style={style} key={i.toString().concat('-quanitity')}>
          <InputBox
            name={index.toString().concat('-quantity')}
            value={props.employee.jobs[index].weekData[i].quantity}
            onUpdate={(val) => {
              props.onUpdate(val, 'quantity', i, index);
              if (per === 'Hour') {
                props.onUpdate(val, 'totalHours', i, index);
                if (val > 40) props.onUpdate(val - 40, 'excessHours', i, index);
                else props.onUpdate(0, 'excessHours', i, index);
              }
            }}
            errMsg={props.employee.jobs[index].weekDataErr[i].quantity === false}
            placeholder={per}
          />
        </td>
      ));
      detail.push((
        <td style={style} key={i.toString().concat('-totalHours')}>
          <InputBox
            name={index.toString().concat('-totalHours')}
            value={props.employee.jobs[index].weekData[i].totalHours}
            onUpdate={val => props.onUpdate(val, 'totalHours', i, index)}
            errMsg={props.employee.jobs[index].weekDataErr[i].totalHours === false}
            placeholder="Hours"
            disabled={props.employee.jobs[index].otExempt || per === 'Hour'}
          />
        </td>
      ));
      detail.push((
        <td style={style} key={i.toString().concat('-excessHours')}>
          <InputBox
            name={index.toString().concat('-excessHours')}
            value={props.employee.jobs[index].weekData[i].excessHours}
            onUpdate={val => props.onUpdate(val, 'excessHours', i, index)}
            errMsg={props.employee.jobs[index].weekDataErr[i].excessHours === false}
            placeholder="Hours"
            disabled={props.employee.jobs[index].otExempt || per === 'Hour'}
          />
        </td>
      ));
    }
    return detail;
  };
  const jobDetail = index => (
    <tr>
      <td key="name" style={style}>{index === 0 ? props.employee.name : ''}</td>
      <td key="store" style={style}>{props.employee.jobs[index].pc}</td>
      <td key="role" style={style}>{props.employee.jobs[index].jobName}</td>
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
