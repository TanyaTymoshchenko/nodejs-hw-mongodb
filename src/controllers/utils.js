import { THIRTY_DAYS} from '../constants/index.js';

export const setupCookies = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('userId', session.userId, {
      httpOnly: true,
      expires: new Date(Date.now() + THIRTY_DAYS),
    });
  };