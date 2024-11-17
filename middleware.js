const Listing = require("./modules/listings.js");
const Review = require("./modules/reviews.js");
const expressError = require("./utils/expressError.js");
const {listingSchema, reviewSchema } = require("./modules/schemavalidate.js");

module.exports.isLoggedin = (req, res, next) => {
    if(!req.isAuthenticated ())
    {
        req.session.urlRedirect = req.originalUrl;
        req.flash("error", "you have to Log in first");
        res.redirect("/user/login");
    }
    else{
        next();
    }
}

module.exports.saveRedirect = (req, res, next) => {
    if(req.session.urlRedirect)
    {
        res.locals.urlRedirect = req.session.urlRedirect ;
    }
    next();
}

module.exports.isOwner = async(req, res, next)=> {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(res.locals.currUser._id.equals(res.locals.admin)){
        return next();
    }
    if(!listing.owner.equals(res.locals.currUser._id))
    {
        req.flash("error", "You are not owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validatelisting = (req, res, next) =>
{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsg);
    }
    else{
        next();
    }
}

module.exports.validatereview = (req, res, next) =>
{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new  expressError(400, errMsg);
    }
    else{
        next();
    }
} 

module.exports.isReviewAuthor = async(req, res, next)=> {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(res.locals.currUser._id.equals(res.locals.admin)){
        return next();
    }
    else if(!review.author.equals(res.locals.currUser._id))
    {
        req.flash("error", "You are not author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAdmin = async(req, res, next)=> {
    if(res.locals.currUser._id.equals(res.locals.admin)){
        return next(); 
    }
    else{
        req.flash("error", "You are not Admin");
        return res.redirect(`/listings`);    
    }
}