import BankUser from '../../models/BankUser';

async function addUser(user,res) {
  try {
    const newUser = new BankUser({
      name: user.name,
      email: user.email,
      password:user.password,
      balance:user.balance,
      account:user.account
    });

    await newUser.save();
    res.status(200).json(user)
    console.log('User added successfully');
  } catch (error) {
    console.error('Failed to add user:', error.message);
    res.status(500).json({error:error.message})
  }
}


export default function handler(req, res) {
    
            console.log(req.body)
            let user=req.body.user
            user.balance=0
            addUser(user,res)
        
    
}