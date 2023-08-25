import mongoose from 'mongoose';


const transactionSchema = new mongoose.Schema({
  time: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  approved: { type: Boolean, default: false},
  
  // Additional fields as needed
});

const Transaction = mongoose.models.Transaction||mongoose.model('Transaction', transactionSchema);

export default Transaction;
