import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Session} from '../db/models/session.js';
import { createSession } from './utils.js';

export const registerUser = async (userData) => {
  const alreadyExistingUser = await User.findOne({ email: userData.email });
  if (alreadyExistingUser !== null) {
    throw createHttpError(409, 'Email in use');
  }
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  return User.create({ ...userData, password: encryptedPassword });
};


export const loginUser = async (userData) => {
  const user = await User.findOne({
    email: userData.email,
  });
  if (!user) {
    throw createHttpError(401, 'User with the give email not found.');
  }
  const isCorrectPassword = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!isCorrectPassword) {
    throw createHttpError(401, 'Incorrect password');
  }

  Session.deleteOne({
    userId: user._id,
  });

  const newSession = createSession(user._id);
  return await Session.create(newSession);
};


export const refreshUsersSession = async ({ refreshToken, userId }) => {
  const session = await Session.findOne({
    userId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isRefreshTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isRefreshTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession(session.userId);
  await Session.deleteOne({
    _id: userId,
    refreshToken,
  });

  return Session.create(newSession);
};



export const logOut = (sessionId) =>
  Session.deleteOne({ _id: sessionId });