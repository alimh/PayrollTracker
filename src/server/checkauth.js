import jwt from 'jsonwebtoken';
import { token } from '../server/gettoken';
import secretkey from '../server/secretkey';

const checkAuth = (req, res, next) => {
  // Bypass check if logging in
  if (req.url === '/user/login') {
    return next();
  }

  // check authorization header
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const tokenValue = req.headers.authorization.split(' ')[1];
  jwt.verify(tokenValue, secretkey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // if token is expired, check username against blacklist and issue new token
        const decodedNoExpire = jwt.verify(tokenValue, secretkey, { ignoreExpiration: true });
        // check username against blacklist
        const blacklistVerified = true;
        res.locals.userName = blacklistVerified ? decodedNoExpire.sub : false;
        res.locals.token = token(decodedNoExpire.sub);
        return next();
      }
      return res.status(401).end();
    }

    // if there is not error...
    res.locals.userName = decoded.sub;
    res.locals.token = tokenValue;
    return next();
  });

  return true;
};

export default checkAuth;
