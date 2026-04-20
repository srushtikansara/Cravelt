const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
   favourites: {
  type: [String],
  default: []
},
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    log:[{
        action:String,
        timestamp: { type: Date, default: Date.now }
    }]
},
{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);