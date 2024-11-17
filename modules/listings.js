const mongoose = require('mongoose');
const review = require('./reviews');
const { string } = require('joi');
const Schema = mongoose.Schema ;

const listingSchema = Schema(
    {
        title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          image: {
            url : String,
            filename : String
          },
          category: {
            type: String,
            enum: ["Rooms", "Iconic Rooms", "Mountains", "Castles", "Amazing Pools", "Camping", "Farm", "Arctic", "Boat", "Domes"],
            required: true
          },
          price: {
            type: Number,
            default : 0
          },
          location: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          },
          reviews : [{
            type : Schema.Types.ObjectId,
            ref : "Review"
          }],
          owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
          },
    }
) 


listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing) {
    await review.deleteMany({_id : {$in : listing.reviews}})
  }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;