var mongoose = require("mongoose");

//mongoose SCHEMA setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   location: String,
   lat: Number,
   lng: Number,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      username: String,
   },
   comments: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment",
       }
       ]
});

//This is the most confusing line when using mongoose...
module.exports = mongoose.model("Campground", campgroundSchema);
