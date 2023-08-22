import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: Number, required: true },
  account: { type:String, required: true}
  
  // Additional fields as needed
});

const BankUser = mongoose.models.BankUser||mongoose.model('BankUser', userSchema);

export default BankUser;
