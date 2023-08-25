// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Transaction from "@/models/Transaction";
import BankUser from "@/models/BankUser";

// let doTransaction=async (res,payload)=>{
    
//     const userEmail = payload.to;

//     await BankUser.findOne({ email: userEmail })
//       .then((user) => {
//         if (user) {
//             if(user.balance+parseInt(payload.amount)<0)
//                 res.status(200).json({error:"In sufficient balance"})
//             else
//                 BankUser.findOneAndUpdate(
//                 { email: payload.to },
//                 { $inc: { balance: payload.amount } },
//                 { new: true }
//                 )
//                 .then((user) => {
//                     const newtransaction = new Transaction(payload  );
//                       newtransaction.save().then(result=>{
//                         res.status(200).json(result)
//                       })
//                 })
//                 .catch((error) => {
//                     console.log('Error updating balance:', error);
//                 });
                
            
//         } else {

//           res.status(200).json({error:"User not found"})
//         }
//       })
//       .catch((error) => {
//         console.log('Error finding user:', error);
//       });
    
// }


const doTransaction = async (res, payload) => {
  try {
    const userEmail = payload.to;
    const user = await BankUser.findOne({ email: userEmail });

    if (user) {
      if (user.balance + parseInt(payload.amount) < 0) {
        res.status(200).json({ error: "Insufficient balance" });
      } else {
        const updatedUser = await BankUser.findOneAndUpdate(
          { email: payload.to },
          { $inc: { balance: payload.amount } },
          { new: true }
        );

        const newTransaction = new Transaction(payload);
        const result = await newTransaction.save();
        
        res.status(200).json(result);
      }
    } else {
      res.status(200).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};


export default function handler(req, res) {
  //  let last_transaction=1000000
    if(req.method=="POST"){
        let transaction=req.body
      //  last_transaction+=1
      //  transaction.id=last_transaction
        console.log(transaction)
        doTransaction(res,transaction)
    }
  }
  