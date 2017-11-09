import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import EmployeeSearch from '../components/EmployeeSearch';
import EmployeeList from '../components/EmployeeList';
import EmployeeDetail from '../components/EmployeeDetail';
import EmployeeNew from '../components/EmployeeNew';

export class EmployeeSearchPage extends React.Component {
  constructor() {
    super();

    this.state = {
      employeeList: null,
      employeeListFiltered: null,
      employeeDetailStatus: null,
      employee: null,
      errDetail: null,
      jobDetails: null,
      newEmployeeClicked: false,
      newEmployeeDetails: null,
    };
  }

  componentDidMount() {
    Axios.get('/api/employees/list').then((response) => {
      const data = response.data;
      this.setState({ employeeList: data, employeeListFiltered: data });
    });
  }

  handleSearch(searchText) {
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
    Axios.get(api).then((response) => {
      const data = response.data;
      this.setState({
        employeeDetailStatus: 'loaded',
        employee: data,
      });
    });
  }

  handleNewJob(newJob) {
    // 1. POST info to API
    // 2. Call componentDidMount() to update state?
    const payload = { ...newJob, id: this.state.employee.id };
    Axios.post('/api/employees/job/new', payload)
      .then(() => {
        this.setState({ jobDetails: null });
        this.handleSelect(this.state.employee.id);
      })
      .catch((res) => {
        this.setState({ errDetail: 'Server error: '.concat(res), jobDetails: newJob });
      });
  }

  handleDeleteJob(n) {
    // 1. POST delete request to API
    // 2. Update state by calling componentDidMOunt() ?
    const payload = { id: this.state.employee.id, job: n };
    Axios.post('/api/employees/job/delete', payload)
      .then(() => {
        this.handleSelect(this.state.employee.id);
      })
      .catch((res) => {
        this.setState({ errDetail: 'Server error: '.concat(res) });
      });
  }

  handleNewEmployee(employeeDetails) {
    console.log('Saving new employee');
    console.log(employeeDetails);

    this.setState({ newEmployeeClicked: false });
  }

  hanldeCancelNewEmployee() {
    this.setState({ newEmployeeClicked: false });
  }

  render() {
    return (
      <div className="page-content">
        <Link to="/settings">Settings</Link>
        <EmployeeSearch onUpdate={searchText => this.handleSearch(searchText)} />
        {this.state.employeeListFiltered ?
          <EmployeeList
            list={this.state.employeeListFiltered}
            onSelect={id => this.handleSelect(id)}
          /> : <p>Retreiving list of employees...</p>}
        {this.state.employee ?
          <EmployeeDetail
            employee={this.state.employee}
            jobDetails={this.state.jobDetails}
            errorMsg={this.state.errDetail}
            onDelete={n => this.handleDeleteJob(n)}
            onNew={newJob => this.handleNewJob(newJob)}
          /> :
          <p>Select an employee</p>
        }
        {this.state.newEmployeeClicked ?
          <EmployeeNew
            onSave={employeeDetails => this.handleNewEmployee(employeeDetails)}
            onCancel={() => { this.setState({ newEmployeeClicked: false }); }}
          /> :
          <button onClick={() => { this.setState({ newEmployeeClicked: true }); }}>
            New Employee
          </button>
        }
      </div>
    );
  }
}

export default EmployeeSearchPage;
