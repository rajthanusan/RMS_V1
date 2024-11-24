
const Feedback = require('../models/Feedback');


const submitFeedback = async (req, res) => {
  try {
    const { name, email, feedbackType, message } = req.body;

    
    const newFeedback = new Feedback({ name, email, feedbackType, message });
    await newFeedback.save();

    
    return res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to submit feedback.' });
  }
};


const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); 
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to retrieve feedback.' });
  }
};


const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found.' });
    }

    return res.status(200).json({ message: 'Feedback deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete feedback.' });
  }
};

module.exports = { submitFeedback, getAllFeedback, deleteFeedback };
