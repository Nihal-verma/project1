const jwt = require("jsonwebtoken")
// const key = "helloonihalthisismysecretkey"
const generateToken = async(payload)=>{
    const token = await jwt.sign(payload,"helloonihalthisismysecretkey",{expiresIn:"1d"})
    return token
}
function verifyToken(req,res,next) {
    const data = req.headers["authorization"]
    const bearer = data.split(" ")
    const token = bearer[1]
    
    req.token = token
    
    jwt.verify(req.token,key,(err,authData)=>{
        if(err){
            return res.json({msg:"error in verification"})
        }else{
        //   res.json({msg:"data saved",authData})
            next() 
        }
       })
   
}





module.exports = {jwt,verifyToken,generateToken}