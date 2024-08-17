<<<<<<< Updated upstream
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  findContactsController,
  findContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController
} from '../controllers/contacts.js';
import express from "express";
import { validateBody } from '../middlewares/validateBody.js';
import { createContactValidationSchema, updateContactValidationSchema } from '../validation/contacts.js';
=======
import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
>>>>>>> Stashed changes
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.use(authenticate);
<<<<<<< Updated upstream
router.get('/', ctrlWrapper(findContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(findContactByIdController));
router.post('/', jsonParser, validateBody(createContactValidationSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put('/:contactId', jsonParser, isValidId, validateBody(updateContactValidationSchema), ctrlWrapper(upsertContactController));
router.patch('/:contactId', jsonParser, isValidId, validateBody(updateContactValidationSchema), ctrlWrapper(patchContactController));
=======
router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  jsonParser,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
>>>>>>> Stashed changes

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;