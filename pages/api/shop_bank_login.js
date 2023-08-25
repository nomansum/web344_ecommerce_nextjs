import BankUser from "@/models/BankUser"
import ShopUser from "@/models/ShopUser"

export default function handler(req, res) {
        let user=JSON.parse(req.body.user)
        let bank=req.body.bank
      console.log(bank)
      // Find the BankUser based on bank_email and bank_password
BankUser.findOne({ email: bank.email, password: bank.password ,account:bank.account})
.then((bankUser) => {
  if (bankUser) {
      
    // BankUser exists, update the ShopUser
    ShopUser.findOneAndUpdate(
            { email: user.email },
            { $set: { bank:{email: bank.email, password: bank.password }} },
            { new: true }
      )
            .then((updatedShopUser) => {
            if (updatedShopUser) {
            // ShopUser updated successfully
            res.status(200).json(updatedShopUser)
            console.log('ShopUser updated:', updatedShopUser);
            } else {
            // ShopUser not found

            res.status(500).json({error:"user not found"})
            console.log('ShopUser not found');
            }
            })
            .catch((error) => {
            // Error occurred during ShopUser update
            
            res.status(500).json({error:"user not found"})
            console.error('Error updating ShopUser:', error);
            });
      } else {
      // BankUser not found
      res.status(500).json({error:"user not found"})
      console.log('BankUser not found');
      }
      })
      .catch((error) => {
      // Error occurred during BankUser search

      res.status(500).json({error:"user not found"})
      console.error('Error searching BankUser:', error);
      });
      }
  