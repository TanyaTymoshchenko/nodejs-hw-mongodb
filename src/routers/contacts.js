import express from 'express';
import {
  getContacts,
  getContactById,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContactById));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(updateContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;