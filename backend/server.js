const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})
const connectDatabase = require("./db.js");

connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on  http://localhost:${process.env.PORT}`);
})