import { setUpServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { UPLOAD_DIR, TEMP_UPLOAD_DIR } from './constants/index.js';

import { logger } from './app.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
     setUpServer();
  } catch(error) {
    logger.info(error);
  }
};

bootstrap();