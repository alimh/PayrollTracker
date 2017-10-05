import React from 'react';
import Axios from 'axios';
import { NewPayrollToFill } from '../components/NewPayrollToFill';

const checkError = (x) => {
  const checkNumber = n => parseFloat(n);
  const checkPositive = n => n >= 0;
  const checkNotBlank = n => n !== '';

  const notBlank = checkNotBlank(x);
  if (!notBlank) return 'Cannot be blank';
  const number = checkNumber(x);
  if (!number && number !== 0) return 'Should be a valid number';
  const positive = checkPositive(x);
  if (!positive) return 'Should be a number greater than or equal to 0.0';
  return false;
};

const computePay = (employee) => {
  const newEmployee = { ...employee };
  const numWeeks = employee.jobs[0].weekData.length;

  const pays = [];

  // calculate pay for each job and each week
  employee.jobs.forEach((job, indexJob) => {
    job.weekData.forEach((week, indexWeek) => {
      const q = parseFloat(week.quantity.value);
      const r = parseFloat(job.rate);
      const m = parseFloat(job.maxHours);
      const t = parseFloat(week.totalHours.value);
      const e = parseFloat(week.excessHours.value);

      const regularPay = q * r;
      const effectiveRate = m ? r / m : r;
      const otPay = (effectiveRate * 0.5 * e);

      newEmployee.jobs[indexJob].weekData[indexWeek].regularPay = regularPay;
      newEmployee.jobs[indexJob].weekData[indexWeek].otPay = otPay;

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

    Axios.get('/api/employees/jobs').then((res) => {
      const data = res.data;

      const blankPayroll = data.reduce((accumulator, employee) => {
        const blankJobs = employee.jobs.reduce((acc, job) => {
          const blankWeekData = new Array(this.state.numWeeks);
          for (let i = 0; i < this.state.numWeeks; i += 1) {
            blankWeekData[i] = {
              quantity: {
                value: [''],
                errMsg: [''],
              },
              totalHours: {
                value: [''],
                errMsg: [''],
              },
              excessHours: {
                value: [''],
                errMsg: [''],
              },
              regularPay: [0],
              otPay: [0],
            };
          }
          acc.push({
            ...job,
            weekData: blankWeekData,
          });
          return acc;
        }, []);
        const pp = new Array(this.state.numWeeks).fill(0);
        accumulator.push({ ...employee, jobs: blankJobs, premiumPay: pp });
        return accumulator;
      }, []);
      this.setState({ activeJobs: blankPayroll });
    }).catch((reason) => {
      this.setState({ errMsg: reason.toString() });
    });
  }

  handleUpdate(val, nameField, indexWeek, indexJob, indexEmployee) {
    const newActiveJobs = this.state.activeJobs;
    newActiveJobs[indexEmployee].jobs[indexJob].weekData[indexWeek][nameField].value = val;
    this.setState({ activeJobs: newActiveJobs });
  }

  handleSave(indexEmployee) {
    // error check and send back error info
    // if no erros, move employee to completed jobs array
    console.log('saving: '.concat(indexEmployee));
    console.log(this.state.activeJobs[indexEmployee]);

    const newActiveJobs = this.state.activeJobs;
    const errors = [];

    newActiveJobs[indexEmployee].jobs.forEach((job, indexJob) => {
      job.weekData.forEach((data, indexWeek) => {
        const errMsgQ = checkError(data.quantity.value);
        const errMsgT = checkError(data.totalHours.value);
        const errMsgE = checkError(data.excessHours.value);

        newActiveJobs[indexEmployee].jobs[indexJob].weekData[indexWeek].quantity.errMsg =
          !(errMsgQ !== false);
        newActiveJobs[indexEmployee].jobs[indexJob].weekData[indexWeek].totalHours.errMsg =
          !(errMsgT !== false);
        newActiveJobs[indexEmployee].jobs[indexJob].weekData[indexWeek].excessHours.errMsg =
          !(errMsgE !== false);

        if (errMsgQ) errors.push('Quantity for week '.concat(indexWeek + 1).concat(' ').concat(errMsgQ));
        if (errMsgT) errors.push('Total hours for week '.concat(indexWeek + 1).concat(' ').concat(errMsgT));
        if (errMsgE) errors.push('Excess hours for week '.concat(indexWeek + 1).concat(' ').concat(errMsgE));
      });
    });

    if (!errors.length) {
      // If no errors, we can move that employee to the summary array
      const newCompletedJobs = this.state.completedJobs;
      const newEmployee = computePay(newActiveJobs[indexEmployee]);

      newCompletedJobs.push(newEmployee);
      newActiveJobs.splice(indexEmployee, 1);

      this.setState({
        completedJobs: newCompletedJobs,
        activeJobs: newActiveJobs,
        errMsg: errors,
      });
    } else {
      this.setState({
        errMsg: errors,
        activeJobs: newActiveJobs,
      });
    }
  }

  render() {
/* <CompletedPayroll
jobs={this.state.completedJobs}
canSubmit={this.state.canSubmit}
onSubmit={this.handleSubmit()}
/>
<PayrollSummary
summary={this.state.summary}
/> */
    return (
      <div className="page-content">
        <div className="error">
          <ul>
            {
              this.state.errMsg.map(error => (
                <li>{error}</li>
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
            <div className="loading">Loading...</div>
        }
        {
          this.state.completedJobs.length ?
            <div>completed payroll</div> :
            <div>---</div>
        }
      </div>
    );
  }
}

export default NewPayroll;