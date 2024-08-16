import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import fs from 'node:fs/promises';
import Handlebars from 'handlebars';
import { env } from '../utils/env.js';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { createSession } from './utils.js';
import { sendEmail } from '../utils/sendMail.js';
import { SMTP } from '../constants/index.js';
import { TEMPLATES_DIR } from '../constants/index.js';


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
  const isCorrectPassowrd = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!isCorrectPassowrd) {
    throw createHttpError(401, 'Incorrect password');
  }

  await Session.deleteOne({
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
    userId,
    refreshToken,
  });

  return Session.create(newSession);
};


export const logOut = (sessionId) => Session.deleteOne({ _id: sessionId });


export const requestResetEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const resetPasswordTemplateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const resetPasswordTemplate = Handlebars.compile(resetPasswordTemplateSource);
  const html = resetPasswordTemplate({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  const messageContent = {
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset password',
    html,
  };

  try {
    await sendEmail(messageContent);
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};


export const resetPassword = async (userData) => {
  const { password, token } = userData;

  let entries;

  try {
    entries = jwt.verify(token, env('JWT_SECRET'));
  } catch (error) {
    if (error instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid');
    throw error;
  }

  const user = await User.findOne({
    _id: entries.sub,
    email: entries.email,
  });

  if (!user) throw createHttpError(404, 'User not found');

  const encryptedPassword = await bcrypt.hash(password, 10);


  await User.updateOne(
    {
      _id: user._id,
    },
    { password: encryptedPassword },
  );
};