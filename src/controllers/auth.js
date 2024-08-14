import {
  registerUser,
  loginUser,
  logOut,
  refreshUsersSession,
} from '../services/auth.js';
import { setupCookies } from './utils.js';


export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const userData = {
    name,
    email,
    password,
  };

  const createdUser = await registerUser(userData);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered the user',
    data: createdUser,
  });
};


export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const userData = {
    email,
    password,
  };
  const session = await loginUser(userData);

  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in the user',
    data: {
      accessToken: session.accessToken,
    },
  });
};


export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    userId: req.cookies.userId,
    refreshToken: req.cookies.refreshToken,
  });

  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed the session',
    data: {
      accessToken: session.accessToken,
    },
  });
};


export const logOutController = async (req, res) => {
  const { userId } = req.cookies;
  if (userId) {
    await logOut(userId);
  }

  res.clearCookie('userId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};