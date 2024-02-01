const Listing = require("../modules/listings.js");

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}

module.exports.RenderNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.RenderEditForm = async (req,res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if(!listing)
    {
        req.flash("error", "listing you requested for does not exists");
        res.redirect("/listings");
    }
    let OrginalUrl = listing.image.url ; 
    OrginalUrl = OrginalUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, OrginalUrl });
}

module.exports.Show = async (req,res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id).populate({path : "reviews", populate : {path : "author"}})
    .populate("owner");
    if(!listing)
    {
        req.flash("error", "listing you are requested for does not exists");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

module.exports.Create = async (req,res) => {
    const List = new Listing(req.body.listings);
    List.owner = req.user._id;
    let url = req.file.path;
    let filename = req.file.filename;
    List.image = {url, filename};
    await List.save();
    req.flash("success", "New listing created");
    res.redirect("/listings"); 
}

module.exports.edit = async (req,res) => {
    if(!req.body.listings)
    {
       throw new expressError(400, "enter valid data for listing");
    }
    console.log(req.body.listings)
    const id = req.params.id;
    const listing = await Listing.findByIdAndUpdate(id, req.body.listings);
    if(typeof req.file !== "undefined")
    {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroy = async (req,res) => {
    const id = req.params.id;
    let deletelist = await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted");
    res.redirect("/listings");
}

module.exports.search = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const regex = new RegExp(searchQuery, 'i');

        const allListings = await Listing.find({
            $or: [
                { country: regex },
                { location: regex }
            ]
        });
        if (allListings.length == 0) {
            req.flash("error", "No results found! you can search another country");
            res.redirect("/listings");
        }
        else{
            res.render("listings/index.ejs", { allListings });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.category = async (req, res) => {
    try {
        const searchQuery = req.query.category;
        const regex = new RegExp(searchQuery, 'i');

        const allListings = await Listing.find({ category: regex });
        if (allListings.length == 0) {
            req.flash("error", "No results found!");
            res.redirect("/listings");
        }
        else{
            res.render("listings/index.ejs", { allListings });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}