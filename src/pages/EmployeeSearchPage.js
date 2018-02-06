import React from 'react';
import Axios from 'axios';
import EmployeeSearch from '../components/EmployeeSearch';
import EmployeeList from '../components/EmployeeList';
import EmployeeDetail from '../components/EmployeeDetail';
import EmployeeNew from '../components/EmployeeNew';
import Auth from '../utils/Auth';

export class EmployeeSearchPage extends React.Component {
  constructor() {
    super();

    this.state = {
      employeeList: null,         // complete list of employees
      employeeListFiltered: null, // filtered list based on search
      employeeDetailStatus: null,
      employee: null,             // currently selected employee
      errMsg: null,
      jobDetails: null,
      newEmployeeClicked: false,
      newEmployeeDetails: null,
    };
  }

  componentDidMount() {
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.get('/api/employees/list', { headers: { Authorization: authorizationHeader } })
      .then((response) => {
        const data = response.data;
        console.log(data);
        this.setState({ employeeList: data, employeeListFiltered: data });
      });
  }

  handleSearch(searchText) {
    const searchUpper = searchText.toString().toUpperCase();
    const listNew = this.state.employeeList.filter((e) => {
      const keys = e.search.toUpperCase();
      return keys.indexOf(searchUpper) !== -1;
    });

    this.setState({ employeeListFiltered: listNew });
  }

  handleSelect(id) {
    // 1. show retrieving indicator in employee detail menu
    // 2. get info about employee, promise
    // 3. then, update state of retrieving and display employee info.
    this.setState({ employeeDetailStatus: 'loading' });
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    const api = '/api/employees/detail/'.concat(id);
    Axios.get(api, { headers: { Authorization: authorizationHeader } })
    .then((response) => {
      const name = this.state.employeeList.find(emp => emp.id === id).name;

      const employee = {
        id,
        name,
        jobs: response.data,
      };

      this.setState({
        employeeDetailStatus: 'loaded',
        employee,
        errMsg: null,
      });
    });
  }

  handleNewJob(newJob) {
    // 1. POST info to API
    // 2. Call handleSelect() to update state?
    const payload = { ...newJob, id: this.state.employee.id, name: this.state.employee.name };
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.post('/api/employees/job/new', payload, { headers: { Authorization: authorizationHeader } })
      .then((res) => {
        // add search term
        const search = res.data;
        const newEmployeeSearch = this.state.employeeList.find(emp =>
          emp.id === this.state.employee.id,
        );
        newEmployeeSearch.search = newEmployeeSearch.search.concat(search);

        this.handleSelect(this.state.employee.id);
      })
      .catch((res) => {
        this.setState({ errMsg: 'Server error: '.concat(res), jobDetails: newJob });
      });
  }

  handleChangeRate(jobId, rateChange) {
    const payload = { jobId, rateChange };
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.post('/api/employees/job/changerate', payload, { headers: { Authorization: authorizationHeader } })
    .then(() => {
      // this.setState({ employee: updateEmployee });
      this.handleSelect(this.state.employee.id);
    })
    .catch((res) => {
      this.setState({ errMsg: 'Server error: '.concat(res) });
    });
  }

  handleRemoveJob(jobId, comment) {
    // 1. POST delete request to API
    // 2. Update state by calling componentDidMOunt() ?
    const payload = { jobId, comment };
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.post('/api/employees/job/deactivate', payload, { headers: { Authorization: authorizationHeader } })
      .then(() => {
        console.log('removed successful');
        this.handleSelect(this.state.employee.id);
      })
      .catch((res) => {
        this.setState({ errMsg: 'Server error: '.concat(res) });
      });
  }

  handleNewEmployee(employeeDetails) {
    const payload = employeeDetails;
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.post('/api/employees/new', payload, { headers: { Authorization: authorizationHeader } })
      .then((res) => {
        const newEmployeeList = this.state.employeeList;
        const newEmployee = res.data;

        newEmployeeList.push(newEmployee);

        this.setState({
          employeeList: newEmployeeList,
          employeeListFiltered: newEmployeeList,
          newEmployeeClicked: false,
          errMsg: null,
        });

        this.handleSelect(newEmployee.id);
      })
      .catch((error) => {
        this.setState({ errMsg: 'Could not create new employee: '.concat(error) });
      });
  }

  hanldeCancelNewEmployee() {
    this.setState({ newEmployeeClicked: false });
  }

  render() {
    return (
      <div className="page-content">
        <div className="error-message">{this.state.errMsg}</div>
        <EmployeeSearch onUpdate={searchText => this.handleSearch(searchText)} />
        {
          this.state.employeeListFiltered ?
            <EmployeeList
              list={this.state.employeeListFiltered}
              onSelect={id => this.handleSelect(id)}
            /> :
            <p>Retreiving list of employees...</p>
        }
        {
          this.state.employee ?
            <EmployeeDetail
              employee={this.state.employee}
              jobDetails={this.state.jobDetails}
              onDelete={n => this.handleDeleteJob(n)}
              onNew={newJob => this.handleNewJob(newJob)}
              onChangeRate={(jobN, rateChange) => this.handleChangeRate(jobN, rateChange)}
              onRemove={(jobN, comment) => this.handleRemoveJob(jobN, comment)}
            /> :
            <p>Select an employee</p>
        }
        {
          this.state.newEmployeeClicked ?
            <EmployeeNew
              onSave={employeeDetails => this.handleNewEmployee(employeeDetails)}
              onCancel={() => { this.setState({ newEmployeeClicked: false }); }}
            /> :
            <button onClick={
                () => { this.setState({ employee: null, newEmployeeClicked: true }); }
              }
            >
              New Employee
            </button>
        }
      </div>
    );
  }
}

export default EmployeeSearchPage;
