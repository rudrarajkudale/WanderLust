const express = require("express");
const router = express.Router({mergeParams : true});
const asyncWrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirect} = require("../middleware.js");
const userController = require("../controller/user.js")

//signup 
router.route("/signup")
.get(userController.renderSignup)
.post(asyncWrap(userController.signup))

//login load
router.route("/login")
.get(userController.renderLogin)
.post(saveRedirect,
    passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: true }),
    asyncWrap(userController.login)
);

//logout
router.get("/logout", userController.logout);

module.exports = router ; 