import React from 'react';

const EmployeeList = props => (
  <div id="EmployeeList">
    <h4>List</h4>
    <ul>
      {props.list.map(x => (<li key={x.name}>{x.name}</li>))}
    </ul>
  </div>
);

export default EmployeeList;
