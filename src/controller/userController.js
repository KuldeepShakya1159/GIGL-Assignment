const userService = require('../service/userService');
const generatetoken = require('../utils/generatetoken')

const registerController = async (req,res)=>{
    const {email} = req.body;

    try{
        const isuser = await userService.findByEmail(email);
    
        if(isuser.length!==0){
            return res.status(200).json({result:'email already exists'})
        }

        const token = generatetoken.generateJWT(email);
        res.cookie('_session',token,{
            expires:new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
        })
        
        const user = await userService.registerUser(req.body);
        if(user){
            return res.status(201).json({result:'user successfully registered'})
        }else{
            return res.json({result:'error while signup , please try again after few mins'})
        }
    }catch(err){
        return res.status(400).json(`err while signup ${err}`)
    }
   
}

const loginController = async(req,res)=>{
    const {email} = req.body;

    try{
        const user = await userService.findByEmail(email);
        if(user.length===0){
            return res.status(200).json({result:"email doesn't exists , please signup and then try again"})
        }
        if(user){
            if(user[0].password === req.body.password){
                return res.status(200).json({result:"welcome , you've successfully logged in. "})
            }else{
                return res.status(401).json({result:"unauthenticated user"})
            }
        } 
    }catch(err){
        return res.status(400).json({result:`error while login ${err}`})

    }
}


module.exports = {registerController,loginController}