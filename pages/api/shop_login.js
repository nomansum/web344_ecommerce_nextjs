import ShopUser from "@/models/ShopUser"

export default function handler(req, res) {
    if(req.method=="POST")
        {
            console.log(req.body)
            let user=req.body
            
            ShopUser.find({email:user.email,password:user.password}).then(result=>{
                console.log(result)
                if(result[0]!==null)
                    {
                    res.status(200).json(result[0])}
                else
                    res.status(404).json({error:"error"})
            })
    
        }
    

  }
  