import Transaction from "@/models/Transaction";
// Assuming `email` holds the email address to match



export default function handler(req, res) {
    const email = req.body.email;
    console.log(email)
    Transaction.find({
        $or: [{ from: email }, { to: email }]
      })
        .then(transactions => {
          // Process the retrieved transactions
          res.status(200).json(transactions)
          console.log(transactions);
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
        
}