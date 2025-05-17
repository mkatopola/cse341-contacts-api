// Description: This file contains the logic for handling contacts in the application.
// It includes functions to get all contacts and a single contact by ID.
const Contact = require("../models/contact");
const mongoose = require("mongoose");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management endpoints
 */

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

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of all contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/ContactResponse'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the contact
 *     responses:
 *       200:
 *         description: Contact data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ContactResponse'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     links:
 *                       type: object
 *                       properties:
 *                         view:
 *                           type: string
 *                         update:
 *                           type: string
 *                         delete:
 *                           type: string
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Contact'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ContactResponse'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the contact
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
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
