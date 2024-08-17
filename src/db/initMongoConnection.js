import mongoose from 'mongoose';
import { getEnvVariable } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
<<<<<<< Updated upstream
    const user = getEnvVariable('MONGODB_USER');
    const pwd = getEnvVariable('MONGODB_PASSWORD');
    const url = getEnvVariable('MONGODB_URL');
    const db = getEnvVariable('MONGODB_DB');
=======
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

>>>>>>> Stashed changes
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};