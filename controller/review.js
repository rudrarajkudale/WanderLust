const Review = require("../modules/reviews.js");
const Listing = require("../modules/listings.js"); 


module.exports.postReview = async (req,res) => {
    const id = req.params.id;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.reviews);
    newReview.author = req.user._id ;
    newReview.save();
    listing.reviews.push(newReview);
    listing.save();
    req.flash("success", "Comment posted");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "comment deleted");
    res.redirect(`/listings/${id}`);
}