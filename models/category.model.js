//Check box
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);
/* 
createdAt:
updatedAt:
*/
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;