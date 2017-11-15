var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX route - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE - add new campgrounds to database
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price:price, image: image, description: desc, author: author};
    console.log(req.user);
    //  Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect to campgrounds
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});


//SHOW - shows more info about one campground

router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", 'Campground not found');
            res.redirect('back')
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
            Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
            });
        //otherwise, redirect
    //if not, redirect
});

//UPDATE CAMPGROUND ROUTE

router.put("/:id", function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "You successfully edited the campground.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    } );
    //redirect somewhere(show page)
    
});

//DESTROY CAMPGROUND ROUTE

router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;