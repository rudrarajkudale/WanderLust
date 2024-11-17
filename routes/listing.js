const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {isLoggedin, isOwner, validatelisting} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });


router.route("/")
.get(asyncWrap (listingController.index))
.post(isLoggedin,upload.single("listings[image]"),validatelisting, asyncWrap (listingController.Create))

//render new route
router.get("/new" ,isLoggedin, listingController.RenderNewForm);

//search
router.get("/search", asyncWrap(listingController.search));

//category
router.get("/category", asyncWrap(listingController.category));

router.route("/:id")
.get(asyncWrap (listingController.Show))
.put(isLoggedin,isOwner,upload.single("listings[image]"), validatelisting, asyncWrap (listingController.edit))
.delete(isLoggedin,isOwner,asyncWrap (listingController.destroy))

//edit
router.get("/:id/edit" ,isLoggedin,isOwner, asyncWrap (listingController.RenderEditForm));
 

module.exports = router;
