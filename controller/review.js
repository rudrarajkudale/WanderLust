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
    const referer = req.get('Referer');
    req.flash("success", "comment deleted");
    if (referer && referer.includes('/admin')) {
        res.redirect('/admin');
    } else {
        res.redirect(`/listings/${id}`);
    }
} 