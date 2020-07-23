//Healthy
const mongoose = require("mongoose");

const healthySchema = new mongoose.Schema({   
    category: {
            type: String,
            enum: ["lowCalorie", "vegetarian"],
            default: "lowCalorie",
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

const Healthy = mongoose.model("Healthy", healthySchema);
module.exports = Healthy;