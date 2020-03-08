var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//Show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){  //To Get all campgrounds from database

        if (err){
            console.log(err);
        } else {
            res.render("campgrounds",{campgrounds:allCampgrounds });
        }
    });
});

//Create - add new campground to database
router.post("/", middleware.isLoggedIn, function(req,res){
    //Get data from the form and add to campgrounds
    var name = req.body.name; // get data from name input
    var image = req.body.image;  // get data from image input
    var description = req.body.description;  // get description from input
    var price = req.body.price;
    var author = {
        id: req.user. _id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image , description: description , author: author , price: price}; // to add to an array of campgrounds
    Campground.create(newCampground, function (err , newlyCreated){
        if(err) {
            console.log(err);
        }else{
            // redirect back to campgrounds
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// New - Show the form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("new");
});

//Show - Shows more info about the campgrounds
router.get("/:id", function (req , res){
    Campground.findById(req.params.id).populate("comments").exec(function (err , foundCampground){
        if (err){
            console.log(err);
        }else {
            console.log(foundCampground);
            res.render("show",{campground: foundCampground});
        }
    });
});

// Edit campground route
router.get("/:id/edit" , middleware.checkCampgroundOwnership,function(req ,res){
        Campground.findById(req.params.id, function (err, foundCampground){
                    res.render("campgrounds/edit", {campground: foundCampground});
        });
});


// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function (req , res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err , updatedCampground) {
        if(err){
            res.redirect("/campground");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// Delete campgrounds
router.delete("/:id" , middleware.checkCampgroundOwnership, function (req ,res) {
    Campground.findByIdAndRemove(req.params.id, function (err){
        if (err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
                }
    });
});

// Check Ownership for edit


module.exports = router;