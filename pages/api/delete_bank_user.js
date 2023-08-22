import BankUser from '../../models/BankUser';

const deleteUser=(email,res)=>{
BankUser.deleteOne({ email })
  .then(() => {
    res.status(200).json(email);
    console.log('User deleted successfully');
  })
  .catch((error) => {
    res.status(500).json(error)
    console.log('Error deleting user:', error);
  });
}

export default function handler(req, res) {
    
    const email=req.query.email
    deleteUser(email,res)


}