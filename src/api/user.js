import express from 'express';
import { token } from '../server/gettoken';

const router = new express.Router();

router.post('/login', (req, res) => {
  const payload = req.body;
  return payload.userName === payload.password ?
    res.status(200).json({
      success: true,
      token: token(payload.userName),
      userName: payload.userName,
    }).end() :
    res.status(200).json({
      success: false,
      userName: false,
      errMsg: 'Username and Password do not match',
    }).end();
});

router.get('/check-token', (req, res) => {
  console.log(req.locals);
  return res.status(200).json({
    success: true,
    token: res.locals.token,
    userName: res.locals.userName,
  }).end();
});

export default router;
