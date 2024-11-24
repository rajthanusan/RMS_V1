import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function FeedbackForm({ email }) {
  const [name, setName] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = { name, email, feedbackType, message };

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

      setName('');
      setFeedbackType('general');
      setMessage('');
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
          <div className="form-left">
            <h2 className="headline-1 text-center">Customer Feedback</h2>
            <p className="form-text text-center">
              We'd love to hear from you! Reach us at{' '}
              <a href="tel:+94-771-234567" className="link">
                +94-771-234567
              </a>{' '}
              or fill out the feedback form below.
            </p>

          

            {/* Feedback Form */}
            <form onSubmit={handleSubmit}>
             

              <div className="input-wrapper">
                <select
                  name="feedbackType"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field"
                required
              ></textarea>

              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                <span className="text text-1">Submit Feedback</span>
                <span className="text text-2" aria-hidden="true">
                  Submit Feedback
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
