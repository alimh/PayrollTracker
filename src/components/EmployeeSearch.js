import React from 'react';

const EmployeeSearch = props => (
  <div id="EmployeeSearch">
    <h4>Search</h4>
    <input id="search-text" type="text" onChange={e => props.onUpdate(e.target.value)} />
  </div>
);

export default EmployeeSearch;
