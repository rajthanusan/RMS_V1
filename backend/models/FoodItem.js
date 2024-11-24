const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Main Courses", "Appetizers", "Desserts", "Drinks", "Snacks"],
      default: "Main Courses",
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
