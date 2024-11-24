 

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const menus = [
  { id: 1, name: 'Home Menu' },
  { id: 2, name: 'About Us' },
  { id: 3, name: 'Services' },
  { id: 4, name: 'Contact' },
];

const MenuManager = () => {
  return (
    <div>
      <h3>Manage Menus</h3>
      <Button variant="info" className="mb-3">Create New Menu</Button>
      {menus.map((menu) => (
        <Card bg="dark" text="white" className="mb-3" key={menu.id}>
          <Card.Body>
            <Card.Title>{menu.name}</Card.Title>
            <Button variant="warning" className="mr-2">Edit</Button>
            <Button variant="danger">Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MenuManager;
