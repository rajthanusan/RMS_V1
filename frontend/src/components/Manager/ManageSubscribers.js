import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import '../assets/style/ManageFoods.css';

export default function ManageSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

   
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get('/api/subscriptions');  
        setSubscribers(response.data);  
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

     
    fetchSubscribers();

     
    const intervalId = setInterval(fetchSubscribers, 5000);

     
    return () => clearInterval(intervalId);
  }, []);  

   
  const deleteSubscriber = async (email) => {
    try {
      await axios.delete('/api/unsubscribe', { data: { email } });  
      setSubscribers(subscribers.filter(subscriber => subscriber.email !== email));  

       
      toast.success('Subscriber deleted successfully!');
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to delete subscriber!');
    }
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();

     
    try {
      const response = await axios.post('/api/sendMessageToAll', { subject, message });  
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      
       
      toast.success('Message sent to all subscribers successfully!');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to send message');
      setSuccessMessage('');
      
       
      toast.error('Failed to send message to subscribers!');
    }

     
    setSubject('');
    setMessage('');
  };

  return (
    <section className="manage-foods">
      <div className="container">
        <div className="form manage-subscribers-form bg-eerie-black-3">
          <form className="form-left form" onSubmit={handleSubmit}>
            <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Send Message to Subscribers</h2>
            <p className="form-text text-center" style={{ color: 'var(--quick-silver)' }}>
              Write and send updates to all subscribers
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                autoComplete="off"
                className="input-field input-field1"
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
              className="input-field input-field1"
            ></textarea>

            <button type="submit" className="btn btn-secondary">
              <span className="text text-1">Send</span>
              <span className="text text-2" aria-hidden="true">Send</span>
            </button>
          </form>

          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>

        <br />

        <div className="subscribers-table form">
          <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Subscribed Users List</h2>
          <table className="table">
            <thead style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              <tr>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              {subscribers.map((subscriber) => (
                <tr key={subscriber._id}>
                  <td>{subscriber.email}</td>
                  <td>
                    <FaTrash
                      onClick={() => deleteSubscriber(subscriber.email)}
                      style={{ cursor: 'pointer', fontSize: "2rem" }}
                      aria-label="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
}
