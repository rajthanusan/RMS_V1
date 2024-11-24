// src/components/EventManager.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const events = [
  { id: 1, title: 'Annual Meeting', date: '2024-12-10' },
  { id: 2, title: 'Summer Festival', date: '2024-07-15' },
  { id: 3, title: 'Product Launch', date: '2024-06-20' },
];

const EventManager = () => {
  return (
    <div>
      <h3>Manage Events</h3>
      <Button variant="info" className="mb-3">Create New Event</Button>
      {events.map((event) => (
        <Card bg="dark" text="white" className="mb-3" key={event.id}>
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>Date: {event.date}</Card.Text>
            <Button variant="warning" className="mr-2">Edit</Button>
            <Button variant="danger">Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default EventManager;
