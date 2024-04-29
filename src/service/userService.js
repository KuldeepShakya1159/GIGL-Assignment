const User = require('../database/models/user');


const findByEmail = async (email)=>{
    try{
        const isuser = await User.find({email:email});
            return isuser
        
    }catch(err){
        return `err while finding user ${err}`
    }
    
}

const registerUser = async (user)=>{
    const newuser = await new User(user);
    await newuser.save();
    return newuser
}

const validate = async(user)=>{
    const checkuser = await User.find({email:user.email});
    if(checkuser.password === user.password){
        return true
    }else{
        return false
    }
}

module.exports = {findByEmail,registerUser,validate};