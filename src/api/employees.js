import express from 'express';
import Employee from '../models/employees';


// import jwt from 'jsonwebtoken';
import employees from '../data/employees';

const router = new express.Router();

// router.post('/rsvp', (req, res) => {
//   const guests = req.body;
//   req.db.collection('guests').insertOne(guests, (err, result) => {
//     if (!err) {
//       res.json(result);
//     }
//   });
// });

router.get('/list', (req, res) => {
  Employee.find({ inactivatedDate: null }, (err, employee) => {
    if (err) {
      return res.status(403).end();
    }

    return res.status(200).json(employee).end();
  });
});

router.get('/detail/:id', (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      return res.status(403).end();
    }
    console.log(employee);
    return res.status(200).json(employee).end();
  });
});

router.post('/new', (req, res) => {
  const newEmployee = Employee({
    name: req.body.name,
    hireDate: new Date(req.body.hireDate),
    created_at: new Date(),
  });

  Employee.create(newEmployee, (err, emp) => {
    if (err) return res.status(403).send('Error test message');
    return res.status(200).json(emp).end();
  });

  // return res.status(200).end();
});

router.post('/job/new', (req, res) => {
  const newJob = {
    job: req.body.job,
    rate: req.body.rate,
    per: req.body.per,
    pc: req.body.pc,
    maxHours: req.body.maxHours,
    otExempt: req.body.otExempt,
    created_at: new Date(),
  };

  Employee.findByIdAndUpdate(
    req.body.id,
    { $push: { jobs: newJob } },
    { new: true },
    (err) => {
      if (err) return res.status(403).json(err).end();
      return res.status(200).end();
    },
  );
});

router.post('/job/delete', (req, res) => {
  console.log('got post request to delete');
  console.log(req.body);

  return res.status(200).end();
});

router.get('/jobs', (req, res) => {
  // Filters employees for those who have active jobs.
  // Returns list
  const activeJobs = employees.reduce((accumulator, employee) => {
    const active = employee.jobs.filter(job => job.active); // return job if job.active == true
    if (active.length > 0) accumulator.push({ ...employee, jobs: active });
    return accumulator;
  }, []);

  return res.status(200).json(activeJobs).end();
});
export default router;
