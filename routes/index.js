//using the express router

var express         = require("express");
var router          = express.Router();
var passport        = require('passport');
var User            = require("../models/user");

// Routes =======================

router.get("/", function(req, res){
    res.render("landing");
});




// Authentication Routes ==================================
router.get("/register", function(req, res){
   res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            console.log(err);
            //we use return because it gets us out of this entire callback
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
}),

// handling log-in logic
//uses passport middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), function(req, res){
    //empty
});

//logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You are logged out!");
   res.redirect("/campgrounds");
});



module.exports = router;