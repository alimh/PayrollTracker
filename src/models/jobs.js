import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jobsSchema = new Schema({
  employee: String,
  jobName: String,
  rate: Number,
  per: String,
  otExempt: Boolean,
  maxHours: Number,
  pc: Number,
  category: String,
  created_at: Date,
  removed_at: Date,
});

const Settings = mongoose.model('Job', jobsSchema);

export default Settings;
