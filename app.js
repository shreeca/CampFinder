var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require('connect-flash-plus');
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
methodOverride = require("method-override");
var User = require("./models/user");

//****************************
//Requiring Routes
//****************************

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index") ;

//*****************************
// Configuration
//*****************************

mongoose.connect("mongodb://localhost/camp_finder");
    app.use(bodyParser.urlencoded({extended:true}));
    app.set("view engine","ejs");
    app.use(express.static(__dirname +"/public"));
    app.use(methodOverride("_method"));
    app.use(flash());
    // seedDB();

// ****************************************
//    Passport configuration
// ****************************************
app.use(require("express-session")({
    secret: "Vani wins the competition!",
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req , res ,next) {
res.locals.currentUser = req.user;
res.locals.error = req.flash("error");
res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, process.env.IP, function(){
        console.log("Welcome to CampFinder!");
    });
