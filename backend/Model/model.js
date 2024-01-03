const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    phoneNumber:{
        type:Number,
        required:true
    },
    hobbies:{
        type:String,
        required:true,

    }
    
})

module.exports = mongoose.model("Table" , TableSchema);