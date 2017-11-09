import express from 'express';
import { tokenAPI, tokenRefresh } from '../server/gettoken';

// import jwt from 'jsonwebtoken';

const router = new express.Router();

router.post('/login', (req, res) => {
  const payload = req.body;
  return payload.userName === payload.password ?
    res.status(200).json({
      success: true,
      tokenAPI: tokenAPI(payload.userName),
      tokenRefresh: tokenRefresh(),
    }).end() :
    res.status(200).json({
      success: false,
      errMsg: 'Username and Password do not match',
    }).end();
});

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
  const data = {
    PCs: ['304248', '302254'],
    Categories: ['Baker', 'Finisher', 'Crew', 'Maintenance'],
  };
  return res.status(200).json(data).end();
});

router.get('/job-options', (req, res) => {
  const data = {
    pers: ['Hour', 'Shift', 'Mile', 'Week'],
    categories: ['Baker', 'Finisher', 'Crew', 'Maintenance'],
  };
  return res.status(200).json(data).end();
});
export default router;
