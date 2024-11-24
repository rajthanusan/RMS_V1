const express = require('express');
const multer = require('multer');
const path = require('path');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

 
router.post('/dishes', upload.single('image'), serviceController.createServiceCard);

 
router.get('/dishes', serviceController.getAllServices);

 
router.put('/dishes/:id', upload.single('image'), serviceController.updateServiceCard);

 
router.delete('/dishes/:id', serviceController.deleteServiceCard);

module.exports = router;
