const User = require('../Model/user_model.js');
const sendEmail = require("../sendEmail/send_email");

exports.register = async(req,res,next)=>{
    if(req.body.name=="" || req.body.email=="" || req.body.phoneNumber=="" || req.body.password==""){
        return(
            res.status(201).json({
                success:false,
                message:"You need to fill all the field to register!!"
            })
        )
    }
    if((req.body.phoneNumber).toString().length!==10){
        return(
            res.status(400).json({
                success:false,
                message:"You entered invalid phone number!!"
            })
        )
    }
   
    const user = await User.create(req.body);


    const token = user.getJWToken()
    

    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly: false,
    }


    res.status(200).cookie('token',token,options).json({
        success:true,
        user,
        token,
        message:"Registered successfully!"
    })

}
let x  ;
exports.generateotp = async(req,res,next)=>{
   
    let email = req.user.email
    
        
        x = Math.floor((Math.random() * 50000) + 9999)
  
        setTimeout(()=>{
            x=0;
        },300000)

    const message = `Email Verification\n\n\nIt seems you are registering at myTable and trying to verify your email. Here is the verification code. Please copy and verify your email\n\n${x}\n\n\nThis OTP will expire after 5 minutes`

    try{

        await sendEmail({
    
          email:email,
          subject:"Email Verification",
          message,
    
    
        })
        res.status(200).json({
            success: true,
            message: `Otp sent to ${email} successfully`
          });
       
      }catch(err){
    
        console.log(err);
      }
     
    
 
}
exports.testOtp = async(req,res,next)=>{
    let otp = req.body.otp;
    
    if(otp===""){
        res.status(200).json({
            success:false,
            message:'Please enter otp'
        })
    }

    
   
    if(otp==x){
        res.status(200).json({
            success:true,
            message:'Email verified successfully'
        })
    }
    
    res.status(201).json({
        success:false,
        message:'You entered wrong otp'
    })

    // next()
}



exports.loginUser = async(req,res,next)=>{

    const {email, password} = req.body;

    if(email=='' || password==''){

        return(
            res.status(201).json({
                success:false,
                message:"Please fill all the fields!!"
            })
        )
        }

        const user = await User.findOne({email}).select("+password");


        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }
    

        const isPasswordMatched = await user.comparePassword(password);

       
        
        if(!isPasswordMatched){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })

        }

        const token = user.getJWToken()

        
        const options = {
            expires:new Date(
                Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
                ),
                // httpOnly: true,
            }
            
    
    
        
        res.status(200).cookie('token',token,options).json({
            success:true,
            user,
            token,
            message:"Login successfully!"
        })
               
        
      
    
}

exports.logout = async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        // httpOnly: true,
    })


    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
}