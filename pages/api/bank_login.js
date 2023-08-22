import BankUser from "@/models/BankUser"

export default async function handler(req, res) {
    if(req.method=="POST")
        {
            console.log(req.body)
            let user=req.body
            if(user.email==="admin@gmail.com"&&user.password==="admin" && user.account==='192168012'){
                res.status(200).json({email:"admin@gmail.com",password:"admin",type:"admin"})
            }
            else

            {

                try {
                    const result = await BankUser.find({
                      email: user.email,
                      password: user.password,
                      account: user.account
                    });
                  
                    if (result.length !== 0) {
                      res.status(200).json({
                        name: result[0].name,
                        email: result[0].email,
                        balance: result[0].balance,
                        account: result[0].account,
                        type: "general"
                      });
                    } else {
                      res.status(200).json({ error: "Wrong username account password!" });
                    }
                  } catch (error) {
                    res.status(500).json({ error: "An error occurred" });
                  }
                 // In this version, the code structure remains the same, but I've replaced the .then() chain with the use of await to make it more linear and easier to read. The try and catch blocks are utilized to handle both successful and error scenarios.
                  
                  
                  
                  
                  
                  


            }
            //   await  BankUser.find({email:user.email,password:user.password,accout:user.account}).then(result=>{
            //         console.log(result)
            //         if(result.length!==0)
            //             {
            //             res.status(200).json({name:result[0].name,email:result[0].email,balance:result[0].balance,account:result[0].account,type:"general"})}
            //         else
            //             res.status(200).json({error:"Wrong username account password!"})
            //     })
        
        }
    

  }
  