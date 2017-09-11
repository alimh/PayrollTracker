import express from 'express';

// import jwt from 'jsonwebtoken';

const router = new express.Router();

// router.post('/rsvp', (req, res) => {
//   const guests = req.body;
//   req.db.collection('guests').insertOne(guests, (err, result) => {
//     if (!err) {
//       res.json(result);
//     }
//   });
// });

router.get('/all', (req, res) => {
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
  console.log('called settings/all');
  const data = {
    PCs: ['304248', '302254'],
    Roles: ['Baker', 'Finisher', 'Crew', 'Maintenance'],
  };
  return res.status(200).json(data).end();
});

export default router;
