import Contact from "../models/contacts.js";

export const fetchAllContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};

export const fetchContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact;
};

export const createContact = async (contactData) => {
    try {
        const newContact = new Contact(contactData);
        await newContact.save();
        return newContact;
    } catch (error) {
        console.error('Error while creating a new contact:', error);
    }
};

export const updateContact = async (contactId, contactData) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, contactData, { new: true });
        return updatedContact;
    } catch (error) {
        console.error(`Error while updating contact with id ${contactId}:`, error);
    }
};

export const deleteContact = async (contactId) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(contactId);
        return deletedContact;
    } catch (error) {
        console.error(`Error while deleting contact with id ${contactId}:`, error);
    }
};