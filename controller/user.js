const User = require("../modules/user.js"); 

module.exports.renderSignup = (req, res) => {
    res.render("user/signup.ejs")
}

module.exports.signup = async (req, res) => {
    try{
        let {username, password, email} = req.body;
        const newUser = new User({username, email});
        let regUser = await User.register(newUser, password);
        req.login(regUser, (err) => {
            if(err)
            {
                return next(err);
            }
            req.flash("success", "logged in successfully");
            res.redirect("/listings");
        }) 
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/user/signup");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("user/login.ejs")
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to wonderlust");
    if (res.locals.urlRedirect === undefined) {
        res.redirect("/listings");
    } else {
        res.redirect(res.locals.urlRedirect);
    }
}


module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err)
        {
            next(err);
        }
    req.flash("success", "logged out successfully");
    res.redirect("/listings");
    })
}