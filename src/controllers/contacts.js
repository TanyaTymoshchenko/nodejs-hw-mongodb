import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
<<<<<<< Updated upstream
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
=======
>>>>>>> Stashed changes

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
<<<<<<< Updated upstream
  const contacts = await findContacts({ page, perPage, sortOrder, sortBy, filter, userId });
=======

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
>>>>>>> Stashed changes

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  console.log(contact);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
<<<<<<< Updated upstream
  const newContact = await createContact({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isFavorite: req.body.isFavorite,
    type: req.body.contactType,
    userId: req.user._id
  });
  res.status(201).send({
=======
  const allData = {
    ...req.body,
    userId: req.user._id,
  };
  const contact = await createContact(allData);

  res.status(201).json({
>>>>>>> Stashed changes
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await updateContact(contactId, req.body, req.user._id);

    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
<<<<<<< Updated upstream
};

export const upsertContactController = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const upsertedContact = await upsertContact(
    userId,
    contactId,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      isFavorite: req.body.isFavorite,
      type: req.body.contactType,
      userId: req.user._id
    },
    {
      upsert: true,
    },
  );
  if (!upsertedContact) {
    throw createHttpError('404', 'Contact not found');
  }
  const status = upsertedContact.isNew ? 201 : 200;
  res.status(status).send({
    status,
    message: 'Successfully upserted the contact',
    data: upsertedContact.contact,
  });
};

export const patchContactController = async (req, res) => {
  const userId = req.user.id;
  const { contactId } = req.params;
  const patchedContact = await upsertContact(contactId, userId, {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isFavorite: req.body.isFavorite,
    type: req.body.contactType,
    userId: req.user._id
  });
  if (!patchedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched the contact',
    data: patchedContact.contact,
  });
=======
>>>>>>> Stashed changes
};