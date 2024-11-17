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
const adminRouter = require("./routes/admin.js");
const MongoStore = require('connect-mongo');
const DBURL = process.env.ATLUSDB_URL;

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DBURL);
}

const store = MongoStore.create({
  mongoUrl: DBURL,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
});

store.on("error", (err) => {
  console.log("Error occurred in MongoStore:", err);
});

app.use(session({
  store,
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
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
    res.locals.admin = process.env.ADMIN_ID;
    res.locals.admin_username = process.env.ADMIN_USERNAME;
    res.locals.adminPassword = process.env.ADMIN_PASSWORD;
    res.locals.user_username = process.env.USER_USERNAME;
    res.locals.userPassword = process.env.USER_PASSWORD;
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
app.use("/admin", adminRouter )

app.get("/", (req,res) => {
    res.redirect("/listings");
})

app.all("*",(req,res, next) => {
    next(new expressError(404 , "page not found"));
});
app.use((err,req,res,next) => { 
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs", {message});
});
app.listen("8080", (req,res) => {
    console.log("server is listening");
}); 
