import app from "./app.js";
import { getEnvVariable } from './utils/env.js';
import { logger } from './app.js';

export const setUpServer = () => {
  const PORT = getEnvVariable('PORT', 3000);
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};