import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import '../assets/style/ManageFoods.css';

export default function ManageFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

   

    useEffect(() => {
      const fetchFeedbacks = async () => {
        try {
          const response = await axios.get('/api/feedback');
          setFeedbacks(response.data);
        } catch (error) {
          console.error("Error fetching feedbacks", error);
        }
      };
      fetchFeedbacks();
      const intervalId = setInterval(fetchFeedbacks, 5000);
      return () => clearInterval(intervalId);
    }, []);

   
  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`/api/feedback/${id}`);
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));  
      toast.success('Feedback deleted successfully!');  
    } catch (error) {
      console.error("Error deleting feedback", error);
      toast.error('Failed to delete feedback.');  
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);

    try {
       
      const response = await axios.post('/api/mail/send-mail', {
        email,
        subject,
        message
      });

       
      if (response.data.success) {
        toast.success('Email sent successfully!');  
      } else {
        toast.error('Failed to send email.');  
      }
    } catch (error) {
      console.error("Error sending email", error);
      toast.error('Failed to send email.');  
    }

     
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <section className="manage-foods">
      <div className="container">
        <div className="form manage-subscribers-form bg-eerie-black-3">
          <form className="form-left" onSubmit={handleSubmit}>
            <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Reply to Customer</h2>
            <p className="form-text text-center" style={{ color: 'var(--quick-silver)' }}>
              Send a response to customer feedback
            </p>

            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Customer Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="input-field input-field1"
                required
              />
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                autoComplete="off"
                className="input-field input-field1"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
              className="input-field input-field1"
              required
            ></textarea>

            <button type="submit" className="btn btn-secondary">
              <span className="text text-1">Send</span>
              <span className="text text-2" aria-hidden="true">Send</span>
            </button>
          </form>
        </div>
        <br />
        <div className="feedback-table form">
          <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Customer Feedback</h2>
          <table className="table">
            <thead style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              <tr>
                <th>Email</th>
                <th>Type</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)',fontSize: "2rem" }}>
              {feedbacks.map(feedback => (
                <tr key={feedback._id}>
                  <td>{feedback.email}</td>
                  <td>{feedback.feedbackType}</td>
                  <td>{feedback.message}</td>
                  <td>
                    <FaTrash
                      onClick={() => deleteFeedback(feedback._id)} 
                      style={{ color: 'var(--error-red)', cursor: 'pointer' ,fontSize: "2rem"}}
                      aria-label="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Include the ToastContainer to display the toast messages */}
      <ToastContainer />
    </section>
  );
}
