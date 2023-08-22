import BankUser from '../../models/BankUser';

export default function handler(req, res) {

    let user=req.body

    BankUser.updateOne({ email:user.email}, user).then(() => {
    res.status(200).json(user)
    console.log('User updated successfully');
    }).catch((error) => {
        res.status(500)
        console.log('Error updating user:', error);
    });

  }
  