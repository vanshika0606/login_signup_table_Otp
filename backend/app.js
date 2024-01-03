const express = require('express');
const cors = require('cors');

const app= express();
const cookieParser= require("cookie-parser")

app.use(express.json());
app.use(cookieParser())
app.use(cors());

const table = require("./Routes/routes");
const user = require("./Routes/User_routes")
app.use("/",table,user);

module.exports = app;