import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const employeesSchema = new Schema({
  name: String,
  hireDate: Date,
  inactivedDate: Date,
  created_at: Date,
  jobs: [{
    category: String,
    jobName: String,
    rate: Number,
    per: String,
    otExempt: Boolean,
    maxHours: Number,
    pc: Number,
    created_at: Date,
    removed_at: Date,
    rateChangeHistory: [{
      changeDate: Date,
      rate: Number,
      comment: String,
    }],
  }],
});

const Employee = mongoose.model('Employee', employeesSchema);

export default Employee;
