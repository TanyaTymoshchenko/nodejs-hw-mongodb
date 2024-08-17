import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
<<<<<<< Updated upstream
import { User } from '../db/models/user.js';
import { Session} from '../db/models/session.js';
import { createSession } from './utils.js';
=======
import { randomBytes } from 'crypto';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
>>>>>>> Stashed changes

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

<<<<<<< Updated upstream

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
=======
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
>>>>>>> Stashed changes
