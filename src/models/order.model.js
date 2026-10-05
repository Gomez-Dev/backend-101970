import mongoose from "mongoose";
import { ORDER_STATUS, DELIVERY_PRIORITY } from "../constants/index.js";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.CREATED,
    },

    priority: {
      type: String,
      enum: Object.values(DELIVERY_PRIORITY),
      default: DELIVERY_PRIORITY.NORMAL,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
