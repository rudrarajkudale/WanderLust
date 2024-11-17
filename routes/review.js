const express = require("express");
const router = express.Router({mergeParams : true});
const asyncWrap = require("../utils/wrapAsync.js");
const {validatereview, isLoggedin, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js");

//review route
router.post("/", isLoggedin ,validatereview, asyncWrap (reviewController.postReview));

//reviews delete
router.delete("/:reviewId",isLoggedin,isReviewAuthor, asyncWrap(reviewController.destroyReview));

module.exports = router ; 