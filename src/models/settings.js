import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  settingsName: String,
  settingsValue: String,
  created_at: Date,
  removed_at: Date,
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
