 
const express = require('express');
const { submitFeedback, getAllFeedback, deleteFeedback } = require('../controllers/feedbackController');

const router = express.Router();

 
router.post('/submit', submitFeedback);

 
router.get('/', getAllFeedback);

 
router.delete('/:id', deleteFeedback);

module.exports = router;
