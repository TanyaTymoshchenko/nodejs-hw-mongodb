import dotenv from 'dotenv';

dotenv.config();

<<<<<<< Updated upstream
export const getEnvVariable = (name, defaultName) => {
  const variableToReturn = process.env[name];
  if (variableToReturn) return variableToReturn;
  if (defaultName) return defaultName;
  throw new Error(`The variable with name ${name} doesn't exist in the env`);
};
=======
export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
>>>>>>> Stashed changes
