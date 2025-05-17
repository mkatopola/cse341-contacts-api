/* eslint-disable no-undef */
// Description: This file contains the logic for handling contacts in the application.
// It includes functions to get all contacts and a single contact by ID.
const Contact = require("../models/contact");

const handleErrorResponse = (res, err, context) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: `Validation failed: ${errors.join(", ")}`
    });
  }
  console.error(`Contact ${context} error:`, err);
  res.status(500).json({
    success: false,
    message: `Failed to ${context} contact`
  });
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    handleErrorResponse(res, err, "fetch");
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }
    res.json({ success: true, data: contact });
  } catch (err) {
    handleErrorResponse(res, err, "fetch");
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json({
      success: true,
      data: {
        id: savedContact._id,
        links: {
          view: `/contacts/${savedContact._id}`,
          update: `/contacts/${savedContact._id}`,
          delete: `/contacts/${savedContact._id}`
        }
      }
    });
  } catch (err) {
    handleErrorResponse(res, err, "create");
  }
};

exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }
    res.json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact
    });
  } catch (err) {
    handleErrorResponse(res, err, "update");
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }
    res.json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (err) {
    handleErrorResponse(res, err, "delete");
  }
};
