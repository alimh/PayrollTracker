import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  settingsCategory: String,
  settingsValue: String,
  created_at: Date,
  removed_at: Date,
});

const Settings = mongoose.model('Setting', settingsSchema);

export default Settings;
