//Global
const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({   
    category: {
            type: String,
            enum: ["korean", "american"],
            default: "korean",
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    datePublished: {
        type: Date,
        default: Date.now,
    },
    yield: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    instructions: [{
        type: String,
        required: true,
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    
    });

const Global = mongoose.model("Global", globalSchema);
module.exports = Global;