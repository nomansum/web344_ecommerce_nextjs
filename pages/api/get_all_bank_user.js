import BankUser from '../../models/BankUser';
async function getAllUsers(req, res) {
    try {
      const users = await BankUser.find({});
      res.json(users);
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

export default function handler(req, res) {
        getAllUsers(req,res)
   
  }