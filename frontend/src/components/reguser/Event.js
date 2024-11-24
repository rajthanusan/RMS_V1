import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        const activeEvents = response.data.data.filter(event => event.status === "Active");
        setEvents(activeEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    const interval = setInterval(fetchEvents, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleViewMoreClick = () => {
   
      toast.warn("Sorry, no more events available!");
   
  };

  return (
    <section className="section event bg-img" aria-label="event" id="event">
      <div className="container">
        <p className="section-subtitle label-2 text-center">Recent Updates</p>
        <h2 className="section-title headline-1 text-center">Upcoming Event</h2>

        {/* Check if there are any events */}
        {events.length === 0 ? (
          <h2 className="headline-1 section-title text-center">
            Oops! No events available right now.
          </h2>
        ) : (
          <ul className="grid-list">
            {/* Loop through the events and display them */}
            {events.map((event) => (
              <li key={event._id}>
                <div className="event-card has-before hover:shine">
                  <div
                    className="card-banner img-holder"
                    style={{ "--width": 350, "--height": 450 }}
                  >
                    <img
                      src={event.image ? `/uploads/${event.image}` : '/default-image.jpg'}
                      width="350"
                      height="450"
                      loading="lazy"
                      alt={event.title}
                      className="img-cover"
                    />
                    <time className="publish-date label-2" dateTime={event.eventDate}>
                      {new Date(event.eventDate).toLocaleDateString()} {/* Format the date */}
                    </time>
                  </div>
                  <div className="card-content">
                    <p className="card-subtitle label-2 text-center">{event.subtitle}</p>
                    <h3 className="card-title title-2 text-center">
                      {event.title}
                    </h3>
                    <h4 className="card-title title-3 text-center">
                      {event.location}
                    </h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button className="btn btn-primary" onClick={handleViewMoreClick}>
          <span className="text text-1">View More</span>
          <span className="text text-2" aria-hidden="true">
            View More
          </span>
        </button>

      </div>
    </section>
  );
}
