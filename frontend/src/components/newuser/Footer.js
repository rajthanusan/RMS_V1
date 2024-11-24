import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import footer from "../assets/images/foodf.jpg";
import logo from '../assets/images/features-icon-3.png';


function Footer() {
  const [email, setEmail] = useState('');

   
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      try {
         
        await axios.post('api/subscribe', { email });
        toast.success('Subscribed successfully!');  
        setEmail('');  
      } catch (error) {
        toast.error('Failed to subscribe. Please try again later.');  
      }
    }
  };

  return (
    <footer 
      className="footer has-bg-image text-center"
      style={{ backgroundImage: `url(${footer})` }}
    >
      <div className="container">
        <div className="footer-top grid-list">
          <div className="footer-brand has-before has-after">
            <a href="#" className="logo">
              <img src={logo} width="160" height="50" loading="lazy" alt="RMS Home" />
            </a>

            {/* Footer address and contact info */}
            <address className="body-4">
              No. 15, Colombo Road, Colombo 00300, Sri Lanka
            </address>

            <a href="mailto:booking@grilli.com" className="body-4 contact-link">booking@rms.com</a>
            <a href="tel:+88123123456" className="body-4 contact-link">Booking Request: +94-771-234567</a>
            <p className="body-4">Open: 09:00 am - 01:00 pm</p>

            {/* Subscription Form (Unchanged style) */}
            <div className="wrapper">
              <p className="title-1">Don't Miss Out on Exclusive Deals</p>
              <p className="label-1">Sign up to receive the latest updates</p>
              <form onSubmit={handleSubscribe} className="input-wrapper">
                <div className="icon-wrapper">
                  {/* The icon will appear next to the input field */}
                  <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                  <input
                    type="email"
                    name="email_address"
                    placeholder="Your email"
                    autoComplete="off"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  
                    required
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  <span className="text text-1">Subscribe</span>
                  <span className="text text-2" aria-hidden="true">Subscribe</span>
                </button>
                
              </form>
            </div>
          </div>

          {/* Footer Navigation Links */}
          <ul className="footer-list">
            <li><a href="#home" className="label-2 footer-link hover-underline">Home</a></li>
            <li><a href="#menus" className="label-2 footer-link hover-underline">Menus</a></li>
            <li><a href="#about-us" className="label-2 footer-link hover-underline">About Us</a></li>
            <li><a href="#gallery" className="label-2 footer-link hover-underline">Gallery</a></li>
            <li><a href="#event" className="label-2 footer-link hover-underline">Event</a></li>
          </ul>

          {/* Footer Social Links */}
          <ul className="footer-list">
            <li><a href="#" className="label-2 footer-link hover-underline">Facebook</a></li>
            <li><a href="#" className="label-2 footer-link hover-underline">Instagram</a></li>
            <li><a href="#" className="label-2 footer-link hover-underline">Twitter</a></li>
            <li><a href="#" className="label-2 footer-link hover-underline">YouTube</a></li>
            <li><a href="https://www.google.com/maps?q=No.+15,+Colombo+Road,+Colombo+00300,+Sri+Lanka" target="_blank" rel="noopener noreferrer" className="label-2 footer-link hover-underline">Google Map</a></li>
          </ul>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright">&copy; 2024 RMS. All Rights Reserved</p>
        </div>

        {/* Toast Notifications */}
   
      </div>
    </footer>
  );
}

export default Footer;
