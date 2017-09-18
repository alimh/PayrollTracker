import React from 'react';
import Axios from 'axios';
import EmployeeSearch from '../views/EmployeeSearch';
import EmployeeList from '../views/EmployeeList';
import EmployeeDetail from '../views/EmployeeDetail';

export class EmployeeSearchPage extends React.Component {
  constructor() {
    super();

    this.state = {
      employeeList: null,
      employeeListFiltered: null,
      employeeDetailStatus: null,
      employee: null,
    };
  }

  componentDidMount() {
    console.log('calling /employees/list');
    console.log(this.state);

    Axios.get('/api/employees/list').then((response) => {
      const data = response.data;
      this.setState({ employeeList: data, employeeListFiltered: data });
    });
  }

  handleSearch(searchText) {
    console.log('searching: ');
    const searchUpper = searchText.toString().toUpperCase();
    const listNew = this.state.employeeList.filter((e) => {
      const keys = e.search;
      return keys.indexOf(searchUpper) !== -1;
    });

    this.setState({ employeeListFiltered: listNew });
  }

  handleSelect(id) {
    // 1. show retrieving indicator in employee detail menu
    // 2. get info about employee, promise
    // 3. then, update state of retrieving and display employee info.
    this.setState({ employeeDetailStatus: 'loading' });
    const api = '/api/employees/detail/'.concat(id);
    console.log('selecting from '.concat(api));
    Axios.get(api).then((response) => {
      const data = response.data;
      this.setState({
        employeeDetailStatus: 'loaded',
        employee: data,
      });
    });
  }

  render() {
    console.log('rendering EmployeeSearchPage: ');
    console.log(this.state);
    return (
      <div className="page-content">
        <EmployeeSearch onUpdate={searchText => this.handleSearch(searchText)} />
        {this.state.employeeListFiltered ?
          <EmployeeList
            list={this.state.employeeListFiltered}
            onSelect={id => this.handleSelect(id)}
          /> : <p>Retreiving list of employees...</p>}
        {this.state.employee ? <EmployeeDetail employee={this.state.employee} /> : <p>Select an employee</p>}
      </div>
    );
  }
}

export default EmployeeSearchPage;
