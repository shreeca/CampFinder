var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root routes

router.get("/", function(req,res){
    res.render("landing");
});

//****************************
//Auth Routes
//****************************

//Show register form
router.get("/register", function (req , res){
    res.render("register");
});

//handle sign up
router.post("/register" , function (req , res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password , function (err , user) {
        if (err){
            console.log(err);
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req , res , function () {
            req.flash("success","Welcome to campFinder"  +user.username);
            res.redirect("/campgrounds");
        });
    });
});

//******************************
//show login form
//*******************************

router.get("/login", function (req , res) {
    res.render("login");
});


// Handling Login
// app.post("/login",middleware,callback);
router.post("/login" , passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function (req , res) {
});

//*************************************
//Logic Route
//*************************************
//logout route

router.get("/logout", function (req , res) {
    req.logout();
    req.flash("success","Logged you out!!");
    res.redirect("/campgrounds");
});

// //middleware
// function isLoggedIn(req , res , next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error","You need to be logged in to do that");
//     res.redirect("/login");
//  }
 module.exports = router;