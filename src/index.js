import { setUpServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { logger } from './app.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
     setUpServer();
  } catch(error) {
    logger.info(error);
  }
};

bootstrap();