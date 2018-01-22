import express from 'express';
import Employee from '../models/employees';
import Job from '../models/jobs';

const router = new express.Router();

router.get('/list', (req, res) => {
  Employee.find({ inactivatedDate: null }, (err, employees) => {
    if (err) return res.status(403).json(err).end();

    Job.find({ deactivateDate: null }, (errJobs, jobs) => {
      if (errJobs) return res.status(403).json(errJobs).end();

      const search = jobs.reduce((acc, job) => {
        acc[job.employeeId] = acc[job.employeeId] ?
          acc[job.employeeId].concat(
            job.category.concat(job.jobName.concat(job.per.concat(job.pc.toString()))),
          ) :
          job.category.concat(job.jobName.concat(job.per.concat(job.pc.toString())));
        return acc;
      }, { });

      const activeEmployeesWithSearch = employees.map((emp) => {
        const id = emp._id;
        const name = emp.name;
        return { ...emp._doc, id, search: name.concat(search[id] ? search[id] : '') };
      });

      return res.status(200).json(activeEmployeesWithSearch).end();
    });
  });
});

router.get('/detail/:id', (req, res) => {
  Job.find({ employeeId: req.params.id, deactivateDate: null }, (err, jobs) => {
    if (err) return res.status(403).end();

    const jobsWithId = jobs.map((job) => {
      const jobWithId = { ...job._doc, id: job.id };
      return jobWithId;
    });
    return res.status(200).json(jobsWithId).end();
  });
});

router.post('/new', (req, res) => {
  const newEmployee = Employee({
    name: req.body.name,
    hireDate: req.body.hireDate ? new Date(req.body.hireDate) : null,
    created_at: new Date(),
  });

  Employee.create(newEmployee, (err, emp) => {
    if (err) return res.status(403).send('Error test message');
    const id = emp._id;
    const search = emp.name;
    return res.status(200).json({ ...emp._doc, id, search }).end();
  });

  // return res.status(200).end();
});

router.post('/job/new', (req, res) => {
  const newJob = {
    employeeId: req.body.id,
    category: req.body.category,
    jobName: req.body.jobName,
    rate: req.body.rate,
    per: req.body.per,
    pc: req.body.pc,
    maxHours: req.body.maxHours,
    otExempt: req.body.otExempt,
    created_at: new Date(),
    rateChangeHistory: {
      changeDate: new Date(),
      rate: req.body.rate,
      comment: 'Inital rate',
    },
  };

  Job.create(newJob, (err) => {
    if (err) return res.status(403).json(err).end();

    const search = newJob.category.concat(newJob.jobName.concat(newJob.per.concat(newJob.pc.toString())));
    return res.status(200).json(search).end();
  });
});

router.post('/job/changerate', (req, res) => {
  const jobId = req.body.jobId;
  const rateChange = req.body.rateChange;

  Job.findById(jobId, (err, doc) => {
    if (err) return res.status(403).json(err).end();
    doc.rateChangeHistory.push(rateChange);
    doc.set({ rate: rateChange.rate });

    doc.save();
    return res.status(200).end();
  });
});

router.post('/job/deactivate', (req, res) => {
  const jobId = req.body.jobId;
  const comment = req.body.comment;
  Job.findById(jobId, (err, doc) => {
    if (err) return res.status(403).json(err).end();
    doc.set({
      deactivateDate: new Date(),
      deactivateComment: comment,
    });
    doc.save();
    return res.status(200).end();
  });
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
