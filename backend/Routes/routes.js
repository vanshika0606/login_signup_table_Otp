const express = require("express");

const {
    addRow, Allrows , updateRow, deleteRow, sendrow
} = require('../Controller/controller');
const router= express.Router();
const {isAuthenticatedUser} = require("../Auth/auth.js");
const { generateotp } = require("../Controller/user_controller");

router.route("/addrow").post(isAuthenticatedUser,addRow);
router.route( "/allrows").get( isAuthenticatedUser,Allrows);
router.route("/updaterow/:id").put(isAuthenticatedUser,updateRow);
router.route("/deleterow/:id").delete(isAuthenticatedUser,deleteRow);
router.route("/send").post(isAuthenticatedUser,sendrow)



module.exports = router;
