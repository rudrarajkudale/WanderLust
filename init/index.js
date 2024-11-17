const mongoose = require("mongoose");
const initdata = require("./data")
const listings = require("../modules/listings.js");
const review = require ("../modules/reviews.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
  }
  
  main()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));

const initDB = async () => {
    await listings.deleteMany({});
    await review.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner : "65b746fbab88054211e3b478", category : "Rooms"}));
    await listings.insertMany(initdata.data);
    console.log("DB initialized");
} 

initDB(); 