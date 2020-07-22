//Quick & Simple
const mongoose = require("mongoose");

const quickSchema = new mongoose.Schema({   
    category: {
            type: String,
            enum: ["fifteenMin", "fiveIngredients"],
            default: "fifteenMin",
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

const Quick = mongoose.model("Quick", quickSchema);
module.exports = Quick;