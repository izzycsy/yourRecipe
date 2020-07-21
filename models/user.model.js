const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
// const saltRounds = 10;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    quick: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quick"
        }
      ],
});

userSchema.pre("save", function(next) {
    var user = this;
    //Only hash password if modified or is new
    if(!user.isModified("password")) {
        return next();
    };
    
    //hash the password
    var hash = bcrypt.hashSync(user.password, 10);

    //override cleartext password with hashed one
    user.password = hash;
    next();
});

userSchema.methods.validPassword = function(password) {
    // Compare is a bcrypt method that will return a boolean
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;