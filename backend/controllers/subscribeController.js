const Subscription = require('../models/Subscription');
const nodemailer = require('nodemailer');

exports.sendMessageToAll = async (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ message: 'Subject and message are required' });
  }

  try {
    
    const subscribers = await Subscription.find({});
    const emails = subscribers.map(sub => sub.email);

    if (emails.length === 0) {
      return res.status(404).json({ message: 'No subscribers found' });
    }

    
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'rajthanusan08@gmail.com',
        pass: 'gjfi fuas wekw lmwd', 
      },
    });

    
    const mailOptions = {
      from: 'rajthanusan08@gmail.com',
      to: emails,
      subject: subject,
      text: message,
    };

    
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Message successfully sent to all subscribers!' });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Failed to send message to subscribers. Please try again later.' });
  }
};

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email is already subscribed
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Create and save a new subscription record
    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rajthanusan08@gmail.com',
        pass: 'gjfi fuas wekw lmwd', // Replace with your Gmail App Password
      },
    });

    // Define email options
    const mailOptions = {
      from: 'rajthanusan08@gmail.com',
      to: email,
      subject: 'Thank You for Subscribing!',
      text: `Dear Subscriber,

Thank you for subscribing to our service! We’re excited to have you onboard.

You will now receive exclusive updates, deals, and offers directly to your inbox. Stay tuned for the latest news!

If you have any questions or feedback, feel free to contact us at booking@rms.com.

Best regards,
RMS Team`,
    };

    // Send the confirmation email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    return res.status(200).json({
      message: 'Subscription successful. A confirmation email has been sent!',
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    return res.status(500).json({
      message: 'Server error, please try again later',
    });
  }
};


exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find(); 
    return res.status(200).json(subscriptions); 
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};


exports.unsubscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const deletedSubscription = await Subscription.findOneAndDelete({ email });
    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Email not found' });
    }

    return res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};
