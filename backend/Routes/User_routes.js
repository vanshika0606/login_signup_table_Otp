const express = require("express");
const {isAuthenticatedUser} = require("../Auth/auth.js");

const {register, loginUser, logout,generateotp, testOtp} = require('../Controller/user_controller.js')

const router = express.Router()

router.route("/").post(register)
router.route("/otp-sent").get(isAuthenticatedUser, generateotp)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/email-verification").post(isAuthenticatedUser,testOtp)





module.exports= router;