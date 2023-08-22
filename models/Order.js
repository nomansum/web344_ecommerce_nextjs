import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  cproduct1: { type: Number, required: true },
  cproduct2: { type: Number, required: true },
  cproduct3: { type: Number, required: true },
  email: { type: String, required: true },
  time: { type: String, required: true },
  transaction_id: { type: String },
  status: { type: String, default: "Not Approved" },

  // Additional fields as needed
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
