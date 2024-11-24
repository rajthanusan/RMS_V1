import React, { useState } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';


export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     
    if (isSubmitting) return;

    setIsSubmitting(true);  

    try {
       
      const response = await axios.post('/api/feedback/submit', formData);

       
      if (response.data.message === 'Feedback submitted successfully!') {
        toast.success('Feedback submitted successfully!', {
      
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error('Failed to submit feedback.', {
         
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }

       
      setFormData({ name: '', email: '', feedbackType: 'general', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit feedback. Please try again later.', {
      
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setIsSubmitting(false);  
    }
  };

  return (
    <section className="feedback bg-img">
      <div className="container">
        <div className="form feedback-form bg-black-10">
          <form onSubmit={handleSubmit} className="form-left">
            <h2 className="headline-1 text-center">Customer Feedback</h2>
            <p className="form-text text-center">
              We'd love to hear from you! Reach us at <a href="tel:+94-771-234567" className="link">+94-771-234567</a> or fill out the feedback form below.
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="input-wrapper">
              <select
                name="feedbackType"
                value={formData.feedbackType}
                onChange={handleChange}
                className="input-field"
              >
                <option value="general">General Inquiry</option>
                <option value="suggestion">Suggestion</option>
                <option value="complaint">Complaint</option>
                <option value="other">Other</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="input-field"
              required
            ></textarea>

            <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
              <span className="text text-1">Submit Feedback</span>
              <span className="text text-2" aria-hidden="true">Submit Feedback</span>
            </button>
          </form>
        </div>
      </div>

      {/* ToastContainer to display toast messages */}

    </section>
  );
}
