const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const plm = require("passport-local-mongoose");
 
const userSchema = Schema(
    {
        email : {
            type : String,
            require : true
        },
    }
);

userSchema.plugin(plm);

const User = mongoose.model("User", userSchema)
module.exports = User ;  