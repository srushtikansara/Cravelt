const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    user:{ 
        type:mongoose.Schema.Types.ObjectId, ref:"User"
    },
    restaurant:
    { type:mongoose.Schema.Types.ObjectId, ref:"Restaurant" },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:String,
    date:{
        type:Date,
        default:Date.now
    }
    
});
module.exports = mongoose.model("Review",reviewSchema);