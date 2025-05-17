// This file is responsible for routing the contact-related API endpoints.
// It uses Express.js to define the routes and Swagger for API documentation.
const express = require("express");
const router = express.Router();
const validateId = require("../middleware/validateObjectId");
const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contacts");

/**
 * @swagger
 * definitions:
 *   ContactInput:
 *     type: object
 *     required:
 *       - firstName
 *       - lastName
 *       - email
 *       - favoriteColor
 *       - birthday
 *     properties:
 *       firstName:
 *         type: string
 *         example: John
 *       lastName:
 *         type: string
 *         example: Doe
 *       email:
 *         type: string
 *         format: email
 *         example: john@example.com
 *       favoriteColor:
 *         type: string
 *         example: Blue
 *       birthday:
 *         type: string
 *         format: date
 *         example: 1990-01-01
 *
 *   ContactResponse:
 *     allOf:
 *       - $ref: '#/definitions/ContactInput'
 *       - type: object
 *         properties:
 *           id:
 *             type: string
 *             example: 60d0fe4f5311236168a109ca
 *
 *   Message:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         example: Validation error message
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new contact
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: contact
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created
 *         schema:
 *           $ref: '#/definitions/ContactResponse'
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Message'
 */
router.post("/", createContact);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/ContactResponse'
 */
router.get("/", getAllContacts);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: A single contact
 *         schema:
 *           $ref: '#/definitions/ContactResponse'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Contact not found
 */
router.get("/:id", validateId, getContact);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a contact by ID
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *       - in: body
 *         name: contact
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ContactInput'
 *     responses:
 *       200:
 *         description: Contact updated
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Message'
 *       404:
 *         description: Contact not found
 */
router.put("/:id", validateId, updateContact);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Contact deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Contact not found
 */
router.delete("/:id", validateId, deleteContact);

module.exports = router;