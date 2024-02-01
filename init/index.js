const mongoose = require("mongoose");
const initdata = require("./data")
const listings = require("../modules/listings.js");
const review = require ("../modules/reviews.js");

main()
.then(console.log("connected to db"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderland');
}

const initDB = async () => {
    await listings.deleteMany({});
    await review.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner : "65b746fbab88054211e3b478", category : "Rooms"}));
    await listings.insertMany(initdata.data);
    console.log("DB initialized");
} 

initDB();