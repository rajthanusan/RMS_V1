
const Booking = require('../models/Booking'); 
const nodemailer = require('nodemailer');

exports.createBooking = async (req, res) => {
  try {
    const { name, phone, person, reservationDate, time, message } = req.body;

    
    const newBooking = new Booking({
      name,
      phone,
      person,
      reservationDate,
      time,
      message,
    });

    
    await newBooking.save();

    
    res.status(200).json({ success: true, message: 'Booking created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.regcreateBooking = async (req, res) => {
  try {
    const { name, phone, person, reservationDate, time, message, email } = req.body;

     
    const newBooking = new Booking({
      name,
      phone,
      person,
      reservationDate,
      time,
      message,
      email,  
    });

    await newBooking.save();

     
    const transporter = nodemailer.createTransport({
      service: 'gmail',  
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

     
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,  
      subject: 'Table Reservation Confirmation',
      html: `
        <h3>Reservation Confirmation</h3>
        <p>Dear ${name},</p>
        <p>Thank you for booking a table with us. Here are your reservation details:</p>
        <ul>
          <li><b>Date:</b> ${reservationDate}</li>
          <li><b>Time:</b> ${time}</li>
          <li><b>Persons:</b> ${person}</li>
          <li><b>Message:</b> ${message}</li>
        </ul>
        <p>We look forward to serving you!</p>
      `,
    };

     
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Booking created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getBookings = async (req, res) => {
    try {
      const bookings = await Booking.find(); 
      res.status(200).json({ success: true, data: bookings });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  exports.deleteBooking = async (req, res) => {
    try {
      const { id } = req.params; 
  
      const booking = await Booking.findByIdAndDelete(id); 
  
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
  
      
      res.status(200).json({ success: true, message: 'Booking deleted successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };