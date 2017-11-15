var mongoose = require("mongoose");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
    ]
});

//collection setup
// mongoose passes methods to this model to interact with MongoDB
module.exports = mongoose.model("Campground", campgroundSchema);

