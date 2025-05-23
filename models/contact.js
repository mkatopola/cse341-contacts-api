// Description: This file contains the database validation logic for the contact model.
// It uses the mongoose library to define the schema and validation rules for the contact model.
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"], trim: true },
    lastName: { type: String, required: [true, "Last name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email format",
      ],
    },
    favoriteColor: { type: String, required: [true, "Favorite color is required"], trim: true },
    birthday: { type: String, required: [true, "Birthday is required"] },
  },
  { versionKey: false, timestamps: false }
);

module.exports = mongoose.model("Contact", contactSchema);
