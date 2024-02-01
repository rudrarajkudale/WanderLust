if(process.env.NODE_ENV != "production")
{
    require("dotenv").config();
}

const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const expressError = require("./utils/expressError.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport")
const localStrategy = require("passport-local");
const User = require("./modules/user.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl : 'mongodb://127.0.0.1:27017/wonderland',
    crypto : {
        secret : process.env.SECRET
    },
    touchAfter : 24*3600
})
store.on("error", ()=> {
    console.log("error occured in MongoStore", err)
})
app.use(session({
    store,
    resave : false,
    saveUninitialized : true,
    secret : process.env.SECRET,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})



app.use(cookieParser());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));
app.engine('ejs', ejsMate);

app.use("/listings", listingsRouter ); 
app.use("/listings/:id/reviews", reviewsRouter )
app.use("/user", userRouter )

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderland');
}

app.get("/hii", (req,res) => {
    let { name = "antina"} = req.cookies;
    res.send(`hii ${name}`);
})

app.all("*",(req,res, next) => {
    next(new expressError(400 , "page not found"));
});
app.use((err,req,res,next) => {
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs", {message});
});
app.listen("8080", (req,res) => {
    console.log("server is listening");
});