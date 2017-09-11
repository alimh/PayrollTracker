import React from 'react';
// import Axios from 'axios';
import EmployeeSearch from '../views/EmployeeSearch';
import EmployeeList from '../views/EmployeeList';

export class EmployeeSearchPage extends React.Component {
  constructor() {
    super();

    const data = [
      { name: 'Zeenat Kesani',
        role: 'Crew',
        store: '302254' },
      { name: 'Socrates Carillo',
        role: 'Baker',
        store: '304248' },
    ];

    this.state = {
      employeeList: data,
      employeeListFiltered: data,
    };
  }

  handleSearch(searchText) {
    console.log('Searching from controller: ', searchText);
    const listNew = this.state.employeeList.filter((e) => {
      const keys = e.name.concat(e.role.concat(e.store));
      return keys.indexOf(searchText) !== -1;
    });

    this.setState({ employeeListFiltered: listNew });
  }

  render() {
    return (
      <div className="page-content">
        <EmployeeSearch onUpdate={searchText => this.handleSearch(searchText)} />
        <EmployeeList list={this.state.employeeListFiltered} />
      </div>
    );
  }
}

export default EmployeeSearchPage;
