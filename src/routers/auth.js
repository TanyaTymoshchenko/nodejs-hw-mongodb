import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
<<<<<<< Updated upstream
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { registerUserController, loginUserController, logOutController, refreshUserSessionController } from '../controllers/auth.js';
=======
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
>>>>>>> Stashed changes

const router = express.Router();
const parseJSON = express.json();

<<<<<<< Updated upstream
router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/logout', ctrlWrapper(logOutController));
=======
router.post(
  '/register',
  parseJSON,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  parseJSON,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', parseJSON, ctrlWrapper(logoutUserController));

router.post('/refresh', parseJSON, ctrlWrapper(refreshUserSessionController));
>>>>>>> Stashed changes

export default router;