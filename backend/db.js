const mongoose = require("mongoose");

const connectDatabase = ()=>{

    mongoose.connect("mongodb+srv://vanshika:Vanshika66@cluster0.tazsklw.mongodb.net/Mern_table?retryWrites=true&w=majority" , {useNewUrlParser:true}).then((data)=>{
        console.log(`Mongodb connect with server 4000`)
    }).catch((err)=>{
        console.log(err)
    })

}

module.exports = connectDatabase;