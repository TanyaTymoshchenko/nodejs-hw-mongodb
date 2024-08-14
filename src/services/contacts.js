import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const findContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const query = {
    userId: userId,
  };

  if (filter.isFavorite) {
    query.isFavorite = filter.isFavorite;
  }

  if (filter.contactType) {
    query.contactType = filter.contactType;
  }

  const contactsQuery = ContactsCollection.find(query);

  console.log(userId);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments(query),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const findContactById = async (contactId, userId) => {
  const data = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });
  return data;
};

export const createContact = async (newContact) => {
  const data = await ContactsCollection.create(newContact);
  return data;
};

export const deleteContact = async (contactId, userId) => {
  const data = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return data;
};

export const upsertContact = async (id, payload, options = {}, userId) => {
  const rawData = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawData.value) {
    return null;
  }

  return {
    contact: rawData.value,
    isNew: rawData?.lastErrorObject?.upserted,
  };
};