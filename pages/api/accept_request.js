// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "@/models/Order"
import BankUser from "@/models/BankUser"
import Transaction from "@/models/Transaction"

export default async function  handler (req, res)  {


  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.body._id },
      { status: "delivered" },
      { new: true }
    );
    const trans = await Transaction.findByIdAndUpdate(
      { _id: order.transaction_id },
      { approved: true },
      { new: true }
    );
  
    await BankUser.findOneAndUpdate(
      { email: "seller@gmail.com" },
      { $inc: { balance: trans.amount } }
    );
    await BankUser.findOneAndUpdate(
      { email: "ecommerce@ecommerce.com" },
      { $inc: { balance: -trans.amount } }
    );
  
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
   
    
  }
  

  // Order.findOneAndUpdate(
  //   { _id:req.body._id},
  //   { status:"delivered" },
  //   { new: true }
  //   ).then(order=>{
  //     Transaction.findByIdAndUpdate(
  //       {_id: order.transaction_id },
  //       { approved: true },
  //       { new: true }
  //     ).then(trans=>{
  //         BankUser.findOneAndUpdate(
  //         { email: "seller@gmail.com"},
  //         { $inc: { balance: trans.amount } }
  //         )
  //       }).catch(e=>{
  //           res.status(200).json(req.body)
  //     })
  //   })
  //   .then(order=>{
  //     res.status(200).json(order)
  //   }).catch(e=>{
  //     res.status(200).json(req.body)
  //   })