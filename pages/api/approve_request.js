// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "@/models/Order";
import BankUser from "@/models/BankUser";
import Transaction from "@/models/Transaction";

export default async function handler(req, res) {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.body._id },
      { status: "pending" },
      { new: true }
    );

    let amount =
      14000 * order.cproduct1 +
      24000 * order.cproduct2 +
      60000 * order.cproduct3;
    let amount2 = Math.ceil(((amount * 1.0) / 100) * 30);
    let time = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newtransaction2 = new Transaction({
      to: "seller@gmail.com",
      from: "ecommerce@ecommerce.com",
      amount: amount - amount2,
      time,
    });
    const trn = await newtransaction2.save();

    const order2 = await Order.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { transaction_id: trn._id } },
      { new: true }
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
