import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const payrollSchema = new Schema({
  employeeId: String,
  employeeName: String,
  jobs: [{
    category: String,
    jobName: String,
    rate: Number,
    per: String,
    otExempt: Boolean,
    maxHours: Number,
    pc: Number,
    weekData: [{
      quantity: Number,
      totalHours: Number,
      excessHours: Number,
      regularPay: Number,
      otPay: Number,
    }],
  }],
  premiumPay: [Number],
  payrollId: String,
  status: String,
});

const Payroll = mongoose.model('Payroll', payrollSchema);

export default Payroll;
