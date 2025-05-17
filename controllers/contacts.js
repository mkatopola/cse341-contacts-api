// Description: This file contains the logic for handling contacts in the application.
// It includes functions to get all contacts, a single contact by ID, create a new contact, update an existing contact, and delete a contact.
const Contact = require("../models/contact");

// Helper to pick allowed fields
const filterBody = (body) => {
  const allowed = ["firstName", "lastName", "email", "favoriteColor", "birthday"];
  return Object.keys(body)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = body[key];
      return obj;
    }, {});
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

exports.createContact = async (req, res, next) => {
  try {
    const newContact = new Contact(req.body);
    const saved = await newContact.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const updates = filterBody(req.body);
    const updated = await Contact.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact updated successfully" });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
