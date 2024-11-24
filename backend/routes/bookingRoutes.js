const express = require('express');
const router = express.Router();
const { createBooking, getBookings, deleteBooking, regcreateBooking } = require('../controllers/bookingController');

 
router.post('/book-table', createBooking);

router.post('/reg-book-table', regcreateBooking);
 
router.get('/bookings', getBookings);

 
router.delete('/bookings/:id', deleteBooking);

module.exports = router;
