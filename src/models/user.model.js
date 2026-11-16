import mongoose from "mongoose";
import { USER_ROLES } from "../constants/index.js";

const userDocumentSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },

  filename: {
    type: String,
    required: true,
  },

  path: {
    type: String,
    required: true,
  },

  mimetype: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
    required: true,
  },

  documentType: {
    type: String,
    enum: ["DNI", "DRIVER_LICENSE", "ADDRESS_PROOF"],
    required: true,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },

    documents: {
      type: [userDocumentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
