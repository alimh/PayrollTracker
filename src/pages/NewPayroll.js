import React from 'react';
import Axios from 'axios';
import { NewPayrollToFill } from '../components/NewPayrollToFill';
import { NewPayrollCompleted } from '../components/NewPayrollCompleted';
import { PayrollCategorySummary } from '../components/PayrollCategorySummary';
import Auth from '../utils/Auth';

const checkError = (x) => {
  const checkNumber = n => parseFloat(n);
  const checkPositive = n => n >= 0;
  const checkNotBlank = n => n !== '';

  const notBlank = checkNotBlank(x);
  if (!notBlank) return 'cannot be blank';
  const number = checkNumber(x);
  if (!number && number !== 0) return 'should be a valid number';
  const positive = checkPositive(x);
  if (!positive) return 'should be a number greater than or equal to 0.0';
  return false;
};

const computePay = (employee) => {
  const newEmployee = { ...employee };
  const numWeeks = employee.jobs[0].weekData.length;

  const pays = [];

  // calculate pay for each job and each week
  employee.jobs.forEach((job, indexJob) => {
    job.weekData.forEach((week, indexWeek) => {
      const q = parseFloat(week.quantity);
      const r = parseFloat(job.rate);
      const m = parseFloat(job.maxHours);
      const t = parseFloat(week.totalHours);
      const e = parseFloat(week.excessHours);

      const regularPay = q * r;
      const effectiveRate = m ? r / m : r;
      const otPay = (effectiveRate * 0.5 * e);

      newEmployee.jobs[indexJob].weekData[indexWeek].regularPay = regularPay;
      newEmployee.jobs[indexJob].weekData[indexWeek].otPay = otPay;

      newEmployee.jobs[indexJob].weekData[indexWeek].totalHours = t;
      newEmployee.jobs[indexJob].weekData[indexWeek].excessHours = e;
      newEmployee.jobs[indexJob].weekData[indexWeek].quantity = q;

      pays.push({ week: indexWeek, regular: regularPay, ot: otPay, totalHours: t });
    });
  });

  const blankTotals = [];
  for (let i = 0; i < numWeeks; i += 1) blankTotals.push({ regular: 0, ot: 0, totalHours: 0 });

  const totals = pays.reduce((acc, item) => {
    acc[item.week].regular += item.regular;
    acc[item.week].ot += item.ot;
    acc[item.week].totalHours += item.totalHours;
    return acc;
  }, blankTotals);

  const newPremiumPay = totals.map((week) => {
    const effRate = week.regular / week.totalHours;
    const premiumPay = ((week.totalHours - 40) * effRate * 0.5) - week.ot;
    return (week.totalHours > 40 && premiumPay > 0) ? premiumPay : 0;
  });

  return { ...newEmployee, premiumPay: newPremiumPay };
};

export class NewPayroll extends React.Component {
  constructor() {
    super();

    this.state = {
      activeJobs: [],
      completedJobs: [],
      canSubmit: false,
      summmary: [],
      errMsg: [],
      numWeeks: 2,
    };
  }

  componentDidMount() {
    // get initial data from API
    //  this data consists of employees and their jobs
    // Map these jobs to the activeJob state var
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.get('/api/employees/jobs', { headers: { Authorization: authorizationHeader } })
      .then((res) => {
        const data = res.data;

        this.createBlankPayroll(data);
      }).catch((reason) => {
        this.setState({ errMsg: reason.toString() });
      });
  }

  createBlankPayroll(data) {
    const blankPayroll = data.reduce((accumulator, employee) => {
      const blankJobs = employee.jobs.reduce((acc, job) => {
        const blankWeekData = new Array(this.state.numWeeks);
        const blankWeekDataErr = new Array(this.state.numWeeks);
        for (let i = 0; i < this.state.numWeeks; i += 1) {
          blankWeekData[i] = {
            quantity: '',
            totalHours: '',
            excessHours: '',
            regularPay: 0,
            otPay: 0,
          };
          blankWeekDataErr[i] = {
            quantity: '',
            totalHours: '',
            excessHours: '',
          };
        }
        acc.push({
          ...job,
          weekData: blankWeekData,
          weekDataErr: blankWeekDataErr,
        });
        return acc;
      }, []);
      const pp = new Array(this.state.numWeeks).fill(0);
      accumulator.push({ ...employee, jobs: blankJobs, premiumPay: pp });
      return accumulator;
    }, []);
    this.setState({ activeJobs: blankPayroll });
  }

  saveTempPayroll(completedJobs, activeJobs) {
    console.log('here');
    const payload = { completedJobs, activeJobs };
    console.log(payload);
    const authorizationHeader = 'bearer '.concat(Auth.getToken());
    Axios.post('/api/employees/payroll/temp', payload, { headers: { Authorization: authorizationHeader } })
      .then(() => {
        this.setState({
          completedJobs,
          activeJobs,
        });
      })
      .catch(err => this.setState({ errMsg: err }));
  }

  handleUpdate(val, nameField, indexWeek, indexJob, indexEmployee) {
    const newActiveJobs = this.state.activeJobs;
    newActiveJobs[indexEmployee].jobs[indexJob].weekData[indexWeek][nameField] = val;
    this.setState({ activeJobs: newActiveJobs });
  }

  handleSave(indexEmployee) {
    // error check and send back error info
    // if no erros, move employee to completed jobs array
    const newActiveJobs = this.state.activeJobs;
    const errors = [];

    newActiveJobs[indexEmployee].jobs.forEach((job, indexJob) => {
      job.weekData.forEach((data, indexWeek) => {
        const errMsgQ = checkError(data.quantity);
        const errMsgT = job.otExempt ? false : checkError(data.totalHours);
        const errMsgE = job.otExempt ? false :
          (
            data.excessHours > data.totalHours ?
              'cannot be greater than total hours' :
              false
          ) || checkError(data.excessHours);

        newActiveJobs[indexEmployee].jobs[indexJob].weekDataErr[indexWeek].quantity =
          !(errMsgQ !== false);
        newActiveJobs[indexEmployee].jobs[indexJob].weekDataErr[indexWeek].totalHours =
          !(errMsgT !== false);
        newActiveJobs[indexEmployee].jobs[indexJob].weekDataErr[indexWeek].excessHours =
          !(errMsgE !== false);

        if (errMsgQ) errors.push('Quantity for '.concat(job.jobName).concat(' Week ').concat(indexWeek + 1).concat(' ').concat(errMsgQ));
        if (errMsgT) errors.push('Total hours for '.concat(job.jobName).concat(' Week ').concat(indexWeek + 1).concat(' ').concat(errMsgT));
        if (errMsgE) errors.push('Excess hours for '.concat(job.jobName).concat(' Week ').concat(indexWeek + 1).concat(' ').concat(errMsgE));
      });
    });

    if (!errors.length) {
      // If no errors, we can move that employee to the summary array
      const newCompletedJobs = this.state.completedJobs;
      const newEmployee = computePay(newActiveJobs[indexEmployee]);

      newCompletedJobs.push(newEmployee);
      newActiveJobs.splice(indexEmployee, 1);

      this.saveTempPayroll(newCompletedJobs, newActiveJobs);
    } else {
      this.setState({
        errMsg: errors,
        activeJobs: newActiveJobs,
      });
    }
  }

  handleEdit(indexEmployee) {
    const newActiveJobs = this.state.activeJobs;
    const newCompletedJobs = this.state.completedJobs;

    newActiveJobs.push(this.state.completedJobs[indexEmployee]);
    newCompletedJobs.splice(indexEmployee, 1);

    this.setState({
      activeJobs: newActiveJobs,
      completedJobs: newCompletedJobs,
    });
  }

  handleSubmit() {
    console.log(this.state.completedJobs);
  }

  render() {
    return (
      <div className="page-content">
        <div className="error">
          <ul>
            {
              this.state.errMsg.map((error, n) => (
                <li key={n}>{error}</li>
              ))
            }
          </ul>
        </div>
        {
          this.state.activeJobs.length ?
            <NewPayrollToFill
              weeks={this.state.numWeeks}
              jobs={this.state.activeJobs}
              onUpdate={(val, nameField, indexWeek, indexJob, indexEmployee) =>
                this.handleUpdate(val, nameField, indexWeek, indexJob, indexEmployee)}
              onSave={i => this.handleSave(i)}
            /> :
            <div className="loading">---</div>
        }
        {
          this.state.completedJobs.length ?
            <NewPayrollCompleted
              jobs={this.state.completedJobs}
              onEdit={indexEmployee => this.handleEdit(indexEmployee)}
            /> :
            <div>---</div>
        }
        <PayrollCategorySummary jobs={this.state.completedJobs} />
        {
          this.state.completedJobs.length && !this.state.activeJobs.length ?
            <button onClick={() => this.handleSubmit()}>Submit</button> :
            <div />
        }
      </div>
    );
  }
}

export default NewPayroll;
