import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';

export const createSession = (id) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

  return {
    userId: id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};