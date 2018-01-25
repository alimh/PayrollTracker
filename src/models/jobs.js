import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jobsSchema = new Schema({
  employeeId: String,
  employeeName: String,
  category: String,
  jobName: String,
  rate: Number,
  per: String,
  otExempt: Boolean,
  maxHours: Number,
  pc: Number,
  created_at: Date,
  deactivateDate: Date,
  deactivateComment: String,
  rateChangeHistory: [{
    changeDate: Date,
    rate: Number,
    comment: String,
  }],
});

const Jobs = mongoose.model('Job', jobsSchema);

export default Jobs;
