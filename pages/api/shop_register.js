import ShopUser from '../../models/ShopUser';

async function addUser(user,res) {
  
    const newUser = new ShopUser({
            name: user.name,
            email: user.email,
            password:user.password,
            type:user.type
            });

        newUser.save().then(reusult=>{
            res.status(200).json(user)
            console.log('User added successfully');
        }).catch(e=>{

            console.error('user exist');
            res.status(500).json({error:"email already in use"})
        })

  
}



export default function handler(req, res) {
    
            console.log(req.body)
            let user=req.body.user
            user.type = "buyer"
            addUser(user,res)
        
    
}