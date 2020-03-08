var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    name: "String",
    price:"string",
    image: "String",
    description: "string",
    author:{
        id:{
          type: mongoose.Schema.Types.ObjectID,
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

module.exports = mongoose.model("Campground", campgroundSchema );
