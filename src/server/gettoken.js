import jwt from 'jsonwebtoken';
import secretkey from './secretkey';

export const token = (user) => {
  const payload = {
    sub: user,
  };
  const tokenSigned = jwt.sign(payload, secretkey, {
    expiresIn: '30min',
  });

  return tokenSigned;
};

export default token;
