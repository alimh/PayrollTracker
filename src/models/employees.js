import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const employeesSchema = new Schema({
  name: String,
  hireDate: Date,
  created_at: Date,
});

const Employee = mongoose.model('Employee', employeesSchema);

export default Employee;
