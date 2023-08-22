import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  type:{type:String, require:true},
  bank:{
    email:{type: String},
    password:{type: String},
    account:{type:String}
  }
  
  // Additional fields as needed
});

const ShopUser = mongoose.models.ShopUser||mongoose.model('ShopUser', userSchema);

export default ShopUser;
