const employees = [
  {
    id: 1,
    name: 'Socrates Carillo',
    hireDate: '2000',
    jobs: [
      { jobName: 'Night Bake', rate: 100, per: 'Shift', otExempt: false, maxHours: 10, store: '301467', active: true, category: 'Baking' },
    ],
  },
  {
    id: 2,
    name: 'Anthony Diggs',
    hireDate: '2000',
    jobs: [
      { jobName: 'Morning Bake', rate: 70, per: 'Shift', otExempt: false, maxHours: 10, store: '302254', active: false, category: 'Baking' },
      { jobName: 'Night Bake', rate: 110, per: 'Shift', otExempt: false, maxHours: 10, store: '302254', active: true, category: 'Baking' },
      { jobName: 'Finish', rate: 10, per: 'Hour', otExempt: false, maxHours: 40, store: '302254', active: true, category: 'Finishing' },
    ],
  },
];

export default employees;
