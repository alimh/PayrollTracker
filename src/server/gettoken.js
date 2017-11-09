import jwt from 'jsonwebtoken';
import secretkey from './secretkey';

export const tokenAPI = (data) => {
  const payload = {
    sub: data,
  };
  const token = jwt.sign(payload, secretkey, {
    expiresIn: '30min',
  });

  return token;
};

export const tokenRefresh = () => {
  const payload = {
  };
  const token = jwt.sign(payload, secretkey, {
    expiresIn: '24hrs',
  });

  return token;
};
