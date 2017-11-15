var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

// mongoose takes our schema and builds a model for our db with methods like User.find(), User.create(), ... etc 
module.exports = mongoose.model("User", UserSchema);