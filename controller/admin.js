const User = require("../modules/user.js"); 
const Listing = require("../modules/listings.js");
const Review = require("../modules/reviews.js");

module.exports.renderAdmin = async(req, res) => {
    const listings = await Listing.find({}).populate({path : "reviews", populate : {path : "author"}})
    .populate("owner");
    const users = await User.find({});
    const usersWithDetails = await Promise.all(users.map(async (user) => {
        const AllListings = await Listing.countDocuments({ owner: user._id });
        const AllReviews = await Review.countDocuments({ author: user._id });
        return {
            ...user.toObject(),
            AllListings,
            AllReviews,
        };
    }));
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalReviews = await Review.countDocuments();
    res.render("user/admindashboard.ejs", {listings, users: usersWithDetails, totalListings, totalReviews, totalUsers})
}

module.exports.search = async (req, res) => {
    const searchQuery = req.query.search?.trim(); 
    console.log(searchQuery);
    if (!searchQuery) {
        req.flash("error", "Search query cannot be empty. Please enter a username.");
        return res.redirect("/admin");
    }

    const regex = new RegExp(`^${searchQuery}$`, 'i'); // Match exact username case-insensitively
    const user = await User.findOne({ username: regex });
    console.log(user);

    if (!user) {
        req.flash("error", "No results found! You can search for another user.");
        return res.redirect("/admin");
    }

    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalReviews = await Review.countDocuments();

    const AllListings = await Listing.countDocuments({ owner: user._id });
    const AllReviews = await Review.countDocuments({ author: user._id });

    const userWithDetails = [{
        ...user.toObject(),
        AllListings,
        AllReviews,
    }];

    const listings = await Listing.find({ owner: user._id })
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    res.render("user/AdminDashboard.ejs", { listings, users: userWithDetails, totalListings, totalReviews, totalUsers });
};


module.exports.destroy = async (req, res) => {
    const id = req.params.id;
    await Listing.deleteMany({ owner: id });
    await Review.deleteMany({ author: id });
    await User.findByIdAndDelete(id);

    req.flash("success", "User and all associated data deleted successfully.");
    res.redirect("/admin");
};  