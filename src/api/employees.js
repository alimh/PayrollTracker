import express from 'express';

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
//   if (!req.headers.authorization) {
//     return res.status(401).end();
//   }
  // const token = req.headers.authorization.split(' ')[1];

    // jwt.verify(token, 'Secret Key', (err, decoded) => {
    //     if (err) { return res.status(401).end(); }

    //     const userId = decoded.sub;

    //     req.db.collection('guests').find().toArray((err, docs) => {
    //         if(err) { console.log("error"); res.status(401).end(); }
    //         else {
    //             res.status(200).json(docs).end();
    //         }
    //     });
    // });
  console.log('called employees/list');

  const data = [];

  employees.map((n) => {
    const searchString = n.jobs.reduce((s,n) => {
      return s.concat(n.role).concat(n.store);
    }, '').concat(n.name);

    const listItem = {
      id: n.id,
      name: n.name,
      search: searchString.toUpperCase(),
    };
    data.push(listItem);
    return true;
  });

  return res.status(200).json(data).end();
});

router.get('/detail/:id', (req, res) => {
  //   if (!req.headers.authorization) {
  //     return res.status(401).end();
  //   }
    // const token = req.headers.authorization.split(' ')[1];
  
      // jwt.verify(token, 'Secret Key', (err, decoded) => {
      //     if (err) { return res.status(401).end(); }
  
      //     const userId = decoded.sub;
  
      //     req.db.collection('guests').find().toArray((err, docs) => {
      //         if(err) { console.log("error"); res.status(401).end(); }
      //         else {
      //             res.status(200).json(docs).end();
      //         }
      //     });
      // });
  const id = Number(req.params.id);
  const data = id ? employees.find(n => n.id === id) : null;

  return res.status(200).json(data).end();
});

export default router;
