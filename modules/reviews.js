const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const reviewSchema = Schema(
    {
        comment : String, 
        rating : {
            type : Number,
            required : true,
            min : 1,
            max : 5
        }, 
        created_at : {
            type : Date,
            default : Date.now()
        },
        author : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    }
)

const review = mongoose.model("Review", reviewSchema)
module.exports = review ; 