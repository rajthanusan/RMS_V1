import React from 'react';
import { IoLocationOutline, IoTimeOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";

export default function Topbar({ isTopbarVisible }) {
  return (
    <div className={`topbar ${isTopbarVisible ? '' : 'hidden'}`}>
      <div className="container">
      <a 
    href="https://maps.app.goo.gl/aafcFZd9SqB3Z6EX9" 
  target="_blank" 
  rel="noopener noreferrer"
  className="topbar-item"
  style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
>
  <div className="icon" style={{ marginRight: "8px" }}>
    <IoLocationOutline aria-hidden="true" />
  </div>
  <span className="span">123 Foodie Lane, Colombo 00500, Sri Lanka</span>
</a>


        <div className="topbar-item item-2">
          <div className="icon"><IoTimeOutline aria-hidden="true" /></div>
          <span className="span">Daily: 8.00 am to 10.00 pm</span>
        </div>
        <a href="tel:+11234567890" className="topbar-item link">
          <div className="icon"><IoCallOutline aria-hidden="true" /></div>
          <span className="span">+94-771-234567</span>
        </a>
        <a href="mailto:booking@restaurant.com" className="topbar-item link">
          <div className="icon"><IoMailOutline aria-hidden="true" /></div>
          <span className="span">booking@rms.com</span>
        </a>
      </div>
    </div>
  );
}
