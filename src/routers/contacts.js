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
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);
router.get('/', ctrlWrapper(findContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(findContactByIdController));
router.post('/', jsonParser, validateBody(createContactValidationSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put('/:contactId', jsonParser, isValidId, validateBody(updateContactValidationSchema), ctrlWrapper(upsertContactController));
router.patch('/:contactId', jsonParser, isValidId, validateBody(updateContactValidationSchema), ctrlWrapper(patchContactController));

export default router;