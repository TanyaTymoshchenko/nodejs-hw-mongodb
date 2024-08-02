import { ContactsCollection } from '../db/models/contacts.js';
import { logger } from '../app.js';

export const findContacts = async () => {
  const data = await ContactsCollection.find();
  return data;
};

export const findContactById = async (id) => {
  const data = await ContactsCollection.findById(id);
  return data;
};

export const createContact = async (newContact) => {
  const data = await ContactsCollection.create(newContact);
  return data;
};

export const deleteContact = async (id) => {
  const data = await ContactsCollection.findOneAndDelete({
    _id: id,
  });
  return data;
};

export const upsertContact = async (id, payload, options = {}) => {
  const rawData = await ContactsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  logger.info(rawData);

  if (!rawData.value) {
    return null;
  }

  return {
    contact: rawData.value,
    isNew: rawData?.lastErrorObject?.upserted,
  };
};