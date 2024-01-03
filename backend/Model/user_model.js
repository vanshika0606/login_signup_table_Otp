const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    phoneNumber:{
        type:Number,
        required:true,
      
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    table:[{
        
         type:mongoose.Schema.Types.ObjectId,
         ref:"Table"
    }],
    
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
})

UserSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next()
    }

    var salt = bcrypt.genSaltSync(10)
    this.password=  bcrypt.hashSync(this.password,salt);
})

UserSchema.methods.getJWToken= function(){

    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,

    })

}



UserSchema.methods.comparePassword = async function(enteredPassword){

    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User" , UserSchema);

