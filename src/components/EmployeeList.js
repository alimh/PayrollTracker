import React from 'react';

const EmployeeList = (props) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    props.onSelect(id);
  };

  return (
    <div id="EmployeeList">
      <h4>List</h4>
      <ul>
        {props.list.map(x => (
          <li key={x._id}>
            <button type="link" onClick={e => handleClick(e, x._id)}>{x.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
