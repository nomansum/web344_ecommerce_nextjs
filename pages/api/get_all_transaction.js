import Transaction from '../../models/Transaction';
async function getAllTransactions(req, res) {
    try {
      const transcations = await Transaction.find({});
      res.json(transcations);
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  }

export default function handler(req, res) {
        getAllTransactions(req,res)
   
  }