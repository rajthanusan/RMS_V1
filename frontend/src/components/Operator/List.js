import React, { useState } from "react";
import ManageFoods from "./OperatorManageFoods";
import ManageEvent from "./OperatorEvent";
import ManagerReservation from "./OperatorReservation";
import ManageSubscribers from "./ManageSubscribers";
import ManageFeedback from "./ManageFeedback";



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
            "Manage Event",
            "Manage Reservation",
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
          {selectedCategory === "Manage Event" && <ManageEvent />}
          {selectedCategory === "Manage Reservation" && <ManagerReservation />}
          {selectedCategory === "Manage Feedback" && <ManageFeedback />}
          {selectedCategory === "Manage Subscribers" && <ManageSubscribers />}
          {/* Placeholder for Manage Accounts component */}
        </div>
      </div>
    </section>
  );
}

export default List;
