const express = require("express");
const router = express.Router({mergeParams : true});
const asyncWrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const {isAdmin, isLoggedin} = require("../middleware.js");
const adminController = require("../controller/admin.js")


//Admin
router.get("/", isLoggedin, isAdmin, asyncWrap(adminController.renderAdmin));

router.get("/search", isLoggedin, isAdmin, asyncWrap(adminController.search));

router.delete("/:id", isLoggedin, isAdmin,asyncWrap (adminController.destroy));

module.exports = router ; 