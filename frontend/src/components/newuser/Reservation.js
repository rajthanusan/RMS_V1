import React, { useState } from 'react';
import { toast} from 'react-toastify';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import event1 from '../assets/images/t1.jpg';
import '../assets/style/reservation.css';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    person: '1-person',
    reservationDate: '',
    time: '08:00am',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);  

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;  
  
    setIsSubmitting(true);  
  
    try {
      const response = await axios.post('/api/book-table', formData);
  
      if (response.data.success) {
        setFormData({
          name: '',
          phone: '',
          person: '1-person',
          reservationDate: '',
          time: '08:00am',
          message: ''
        });
  
         
        toast.success("Your table has been booked successfully!");
  
      } else {
        toast.error("There was an error booking your table.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit your booking. Please try again.");
    } finally {
       
      setIsSubmitting(false);
    }
  };
  
   
  const handleFocus = (fieldName) => {
    const field = document.querySelector(`select[name="${fieldName}"]`);
    if (field) {
      field.focus();
    }
  };

  return (
    <section className="reservation" id="table">
      <div className="container">
        <div className="form reservation-form bg-black-10">
          <form onSubmit={handleSubmit} className="form-left bg-img7">
            <h2 className="headline-1 text-center">Online Reservation</h2>
            <p className="form-text text-center">
              Booking request <a href="tel:+88123123456" className="link">+94-771-234567</a> or fill out the order form
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                autoComplete="off"
                className="input-field"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                autoComplete="off"
                className="input-field"
              />
            </div>

            <div className="input-wrapper">
              {/* Person Selector */}
              <div className="icon-wrapper" style={{ position: 'relative' }}>
                <select
                  name="person"
                  value={formData.person}
                  onChange={handleChange}
                  className="input-field"
                  style={{ color: 'white' }}
                >
                  <option value="1-person">1 Person</option>
                  <option value="2-person">2 Person</option>
                  <option value="3-person">3 Person</option>
                  <option value="4-person">4 Person</option>
                  <option value="5-person">5 Person</option>
                  <option value="6-person">6 Person</option>
                  <option value="7-person">7 Person</option>
                </select>
              </div>

              {/* Date Picker */}
              <div className="icon-wrapper" style={{ position: 'relative' }}>
                <FaCalendarAlt
                  size={20}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                  onClick={() => document.querySelector('input[name="reservationDate"]').focus()}
                  className="calendar-icon"
                />
                <input
                  type="date"
                  name="reservationDate"
                  value={formData.reservationDate}
                  onChange={handleChange}
                  className="input-field"
                  style={{ color: 'white' }}
                />
              </div>

              {/* Time Picker */}
              <div className="icon-wrapper" style={{ position: 'relative' }}>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="input-field"
                  style={{ color: 'white' }}
                >
                  <option value="08:00am">08 : 00 am</option>
                  <option value="09:00am">09 : 00 am</option>
                  <option value="10:00am">10 : 00 am</option>
                  <option value="11:00am">11 : 00 am</option>
                  <option value="12:00pm">12 : 00 pm</option>
                  <option value="01:00pm">01 : 00 pm</option>
                  <option value="02:00pm">02 : 00 pm</option>
                  <option value="03:00pm">03 : 00 pm</option>
                  <option value="04:00pm">04 : 00 pm</option>
                  <option value="05:00pm">05 : 00 pm</option>
                  <option value="06:00pm">06 : 00 pm</option>
                  <option value="07:00pm">07 : 00 pm</option>
                  <option value="08:00pm">08 : 00 pm</option>
                  <option value="09:00pm">09 : 00 pm</option>
                  <option value="10:00pm">10 : 00 pm</option>
                </select>
              </div>
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              autoComplete="off"
              className="input-field"
            ></textarea>

<button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
  <span className="text text-1">{isSubmitting ? 'Submitting...' : 'Book A Table'}</span>
  <span className="text text-2" aria-hidden="true">{isSubmitting ? 'Submitting...' : 'Book A Table'}</span>
</button>

          </form>

          <div className="form-right text-center" style={{ backgroundImage: `url(${event1})` }}>
            <h2 className="headline-1 text-center">Contact Us</h2>
            <p className="contact-label">Booking Request</p>
            <a href="tel:+88123123456" className="body-1 contact-number hover-underline">+94-770-123456</a>

            <p className="contact-label">Location</p>
            <address className="body-4">
              No. 15, Colombo Road, Colombo 00300,<br />
              Sri Lanka
            </address>
            <p className="contact-label">Lunch Time</p>
            <p className="body-4">
              Monday to Sunday <br />
              11.00 am - 2.30 pm
            </p>
            <p className="contact-label">Dinner Time</p>
            <p className="body-4">
              Monday to Sunday <br />
              05.00 pm - 10.00 pm
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
