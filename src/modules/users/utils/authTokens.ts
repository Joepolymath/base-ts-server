import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../shared/configs/env.config';

export const generateToken = (data: any) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
