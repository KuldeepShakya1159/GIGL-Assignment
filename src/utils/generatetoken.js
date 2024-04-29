const jwt = require('jsonwebtoken');

const generateJWT = (payload)=>{
    try{
        const token = jwt.sign({payload},process.env.SECRET_KEY,{
            expiresIn:'2d'
        });
        return token;
    
    }catch(err){
        return `err while generating token${err}`
    }
    
}

module.exports = {generateJWT};