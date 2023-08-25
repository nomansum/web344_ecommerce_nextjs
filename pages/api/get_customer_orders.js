import Order from "@/models/Order"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    Order.find({email:req.body.email}).then(orders=>{
        res.status(200).json({orders})
    })
  }
  