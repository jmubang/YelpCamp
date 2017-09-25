var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest",
        image: "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error laborum aliquam, ipsam placeat provident cum debitis ipsa ex reiciendis nesciunt consequatur id officiis omnis dolor praesentium! Eligendi sequi sunt voluptate!"
    },
        {
        name: "Blitz Creek",
        image: "http://www.whcg.net/images/summer.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error laborum aliquam, ipsam placeat provident cum debitis ipsa ex reiciendis nesciunt consequatur id officiis omnis dolor praesentium! Eligendi sequi sunt voluptate!"
    },
        {
        name: "Grand Canyon",
        image: "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error laborum aliquam, ipsam placeat provident cum debitis ipsa ex reiciendis nesciunt consequatur id officiis omnis dolor praesentium! Eligendi sequi sunt voluptate!"
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log("removed campgrounds");
        }
        console.log("removed campgrounds");
        //  add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment 
                    Comment.create(
                        {
                            text:"This place is great but I wish there was internet",
                            author: "Homer",
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else {
                            campground.comments.push(comment);
                            campground.save();
                            }
                        })
                }
        });
    });
    });
}

module.exports = seedDB;