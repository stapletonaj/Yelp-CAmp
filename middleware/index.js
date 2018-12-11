var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

// all middleware for the app...
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function (err, foundCampground){
                if (err){
                    req.flash("error", "Campground not found!");
                    res.redirect("back");
                } else {
                    //does the user own the campground?
                    //if we just print things they are objects and strings so mongoose gives us method .equals
                    if (foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that!");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment){
            if (err){
                req.flash("error", "Comment not found!");
                res.redirect("back");
            } else {
                //does the user own the comment?
                //if we just print things they are objects and strings so mongoose gives us method .equals
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
        } else {
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }
    };  


// is Logged in -- middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;