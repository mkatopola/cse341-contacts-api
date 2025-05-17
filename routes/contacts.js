// Description: this file contains the routes for handling contacts in the application.
// It includes GET endpoints to retrieve all contacts and a single contact by ID.
const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contacts");

/**
 * @swagger
 * /contacts:
 *   post:
 *     tags: [Contacts]
 *     description: Create a new contact
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - email
 *             - favoriteColor
 *             - birthday
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             favoriteColor:
 *               type: string
 *             birthday:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */

// Existing route definitions
router.get("/", getAllContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;