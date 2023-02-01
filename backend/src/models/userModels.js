const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
    },
    // last_name : {
    //     type : String,
    // },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    // is_email_verified : {
    //     type : Boolean,
    //     default : false,
    // },
    // active : {
    //     type : Boolean,
    //     default : false,
    // }
});

const User = mongoose.model("users", userSchema);

module.exports = User;