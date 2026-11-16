import mongoose from "mongoose";
import { DELIVERY_STATUS, DELIVERY_PRIORITY } from "../constants/index.js";

const deliveryReceiptSchema = new mongoose.Schema({
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

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(DELIVERY_STATUS),
      default: DELIVERY_STATUS.ASSIGNED,
    },

    priority: {
      type: String,
      enum: Object.values(DELIVERY_PRIORITY),
      default: DELIVERY_PRIORITY.NORMAL,
    },

    receipts: {
      type: [deliveryReceiptSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
