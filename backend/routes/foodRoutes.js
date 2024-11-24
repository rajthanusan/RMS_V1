const express = require("express");
const multer = require("multer");
const path = require("path");
const foodController = require("../controllers/foodItemController");

const router = express.Router();

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

 
router.get("/get-food-items", foodController.getFoodItems);

 
router.post("/add-food-items", upload.single("image"), foodController.addFoodItem);

 
router.put("/update-food-item/:id", upload.single("image"), foodController.updateFoodItem);

 
router.delete("/delete-food-item/:id", foodController.deleteFoodItem);

router.put("/update-food-item-status/:id", foodController.updateFoodItemStatus);

module.exports = router;
