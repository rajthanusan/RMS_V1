const express = require('express');
const { createEvent, getAllEvents, updateEvent, deleteEvent, updateEventStatus } = require('../controllers/eventController');

const multer = require("multer");
const path = require("path");

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

router.post('/events', upload.single('image'), createEvent);
router.get('/events', getAllEvents);
router.put('/events/:id', upload.single('image'), updateEvent); 
router.put('/events/:id/status', updateEventStatus);
  
router.delete('/events/:id', deleteEvent);

module.exports = router;
