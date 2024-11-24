import React, { useState } from "react";
import ManageFoods from "./ManageFoods";
import AdminEvent from "./ManagerEvent";
import ManagerReservation from "./ManagerReservation";
import ManageSubscribers from "./ManageSubscribers";
import ManageFeedback from "./ManageFeedback";


import ManageDishes from "./ManageDishes";

function List() {
  const [selectedCategory, setSelectedCategory] = useState("Manage Menu");
  const [fade, setFade] = useState(false);

  const handleFilterClick = (category) => {
    setFade(true);
    setSelectedCategory(category);
  };

  const onTransitionEnd = () => setFade(false);

  return (
    <section className="section full__screen bg-img" id="dashboard">
      <div className="container">
        {/* Category Filter */}
        <ul className="filter-list">
          {[
            "Manage Menu",
            "Manage Reservation",
            "Manage Events",
            "Manage Dishes",
            "Manage Feedback",
            "Manage Subscribers",
           
          ].map((category) => (
            <li key={category}>
              <button
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        {/* Render Full-Width Components */}
        <div
          className={`admin-section ${fade ? "fade-out" : "fade-in"}`}
          onTransitionEnd={onTransitionEnd}
        >
          {selectedCategory === "Manage Menu" && <ManageFoods />}
          {selectedCategory === "Manage Events" && <AdminEvent />}
          {selectedCategory === "Manage Reservation" && <ManagerReservation />}
          {selectedCategory === "Manage Dishes" && <ManageDishes />}
          {selectedCategory === "Manage Feedback" && <ManageFeedback />}
          {selectedCategory === "Manage Subscribers" && <ManageSubscribers />}
          {/* Placeholder for Manage Accounts component */}
        </div>
      </div>
    </section>
  );
}

export default List;
