import express from 'express';
import Settings from '../models/settings';

const router = new express.Router();

router.get('/all', (req, res) => {
  Settings.find({ removed_at: null }, (err, settings) => {
    if (err) {
      return res.status(403).end();
    }

    const settingsObj = settings.reduce((acc, s) => {
      const temp = {};
      const current = acc[s.settingsCategory] ? [...acc[s.settingsCategory]] : [];
      current.push(s.settingsValue);
      temp[s.settingsCategory] = current;
      return { ...acc, ...temp };
    }, {});

//      Categories: ['Baker', 'Finisher', 'Crew', 'Maintenance'],
    return res.status(200).json(settingsObj).end();
  });
});

router.post('/update', (req, res) => {
  const newSetting = Settings({
    settingsCategory: req.body.category,
    settingsValue: req.body.value,
    created_at: new Date(),
    removed_at: null,
  });

  newSetting.save((err) => {
    if (err) throw err;
  });

  return res.status(200).end();
});

router.post('/remove', (req, res) => {
  Settings.findOneAndUpdate({
    settingsCategory: req.body.category,
    settingsValue: req.body.value,
  }, { removed_at: new Date() }, (err) => {
    if (err) throw err;
  });

  return res.status(200).end();
});

router.get('/job-options', (req, res) => {
  const data = {
    pers: ['Hour', 'Shift', 'Mile', 'Week'],
    categories: ['Baker', 'Finisher', 'Crew', 'Maintenance'],
  };
  return res.status(200).json(data).end();
});
export default router;
