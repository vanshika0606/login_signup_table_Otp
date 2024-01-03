const jwt = require("jsonwebtoken")
const User = require("../Model/user_model")



exports.isAuthenticatedUser = async(req,res,next)=>{

    const {token}=  req.cookies
    
    
    
    if(!token){
        return res.status(401).json({
            success:false,
            message:"please login to access this resource!"
          })
    }
   

    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    
   
    req.user = await User.findById(decodedData.id)
   
   next()

}