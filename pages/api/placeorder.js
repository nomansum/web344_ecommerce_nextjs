import Order from "@/models/Order";
import BankUser from "@/models/BankUser";
import Transaction from "@/models/Transaction";

export default async function handler(req, res) {
  try {
    let order = req.body;
    const account = await BankUser.findOne({ email: req.body.user.bank.email });

    if (
      account.balance <
      14000 * order.cproduct1 +
        24000 * order.cproduct2 +
        60000 * order.cproduct3
    ) {
      res.status(500).json({ error: "Error message!" });
    } else {
      let from = account.email;
      let to = "ecommerce@example.com";
      let amount =
        14000 * order.cproduct1 +
        24000 * order.cproduct2 +
        60000 * order.cproduct3;
      let time = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      let approved = true;

      const newtransaction = new Transaction({
        to,
        from,
        amount,
        time,
        approved,
      });
      const result = await newtransaction.save();

      await BankUser.findOneAndUpdate(
        { email: req.body.user.bank.email },
        { $inc: { balance: -amount } }
      );

      await BankUser.findOneAndUpdate(
        { email: "ecommerce@ecommerce.com" },
        { $inc: { balance: amount } }
      );

      const orderData = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        cproduct1: req.body.cproduct1,
        cproduct2: req.body.cproduct2,
        cproduct3: req.body.cproduct3,
        email: req.body.email,
        time: time,
      };

      const resorder = await new Order(orderData).save();

      res.status(200).json(resorder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
}

// export default function handler(req, res) {
//     let order=req.body
//     BankUser.findOne({email:req.body.user.bank.email}).then(account=>{
//       if(account.balance<14000*order.cproduct1+24000*order.cproduct2+60000*order.cproduct3){
//         res.status(500).json({error:"Error message!"})
//       }
//       else{
//         let from=account.email
//         let to="ecommerce@example.com"
//         let amount=14000*order.cproduct1+24000*order.cproduct2+60000*order.cproduct3
//         let amount2=Math.ceil(amount*1.0/100*10)
//         let time=new Date().toLocaleString('en-GB', {
//             day: '2-digit',
//             month: '2-digit',
//             year: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit',
//           });

//         let approved = true

//         const newtransaction = new Transaction({to,from,amount,time,approved});
//         newtransaction.save().then(result=>{
//           BankUser.findOneAndUpdate(
//             { email: req.body.user.bank.email },
//             { $inc: { balance: -amount } }
//             )
//             .then((user) => {
//               BankUser.findOneAndUpdate(
//                 { email: "ecommerce@ecommerce.com"},
//                 { $inc: { balance: amount } }
//                 ).then(user=>{
//                     const newtransaction2 = new Transaction({to:"seller@gmail.com",from:"ecommerce@ecommerce.com",amount:amount-amount2,time})
//                     newtransaction2.save().then(trn=>
//                       {console.log(trn)
//                         const order=new Order({
//                           name: req.body.name,
//                           address:req.body.address,
//                           phone: req.body.phone,
//                           cproduct1: req.body.cproduct1,
//                           cproduct2: req.body.cproduct2,
//                           cproduct3: req.body.cproduct3,
//                           email: req.body.email,
//                           time: time,
//                           transaction_id: trn._id
//                       })
//                       order.save().then(resorder=>{

//                         res.status(200).json(resorder)
//                       })
//                   })
//               })

//           })

//         }).catch(error=>{
//           console.log(error)
//           res.status(500).json({})
//         })
//       }
//       console.log(account)
//     })
//     //console.log(req.body)
//   }
