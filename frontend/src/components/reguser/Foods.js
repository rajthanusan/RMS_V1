import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "../assets/style/Foods.css";

function Foods() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

   
  const fetchFoodItems = () => {
    fetch("/food/get-food-items")
      .then((response) => response.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error("Error fetching food items:", error));
  };

  useEffect(() => {
    fetchFoodItems();
    const interval = setInterval(fetchFoodItems, 5000);  
    return () => clearInterval(interval);  
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredFoodItems = foodItems
    .filter((item) => item.status === "Active")
    .filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    );

  const handleOrderClick = () => {
     
    toast.warn("Sorry, orders are not available at the moment.");
  };

  return (
    <section className="section food-menu full__screen bg-img" id="food-menu">
      <div className="container">
        <p className="section-subtitle text-center label-2">Special Selection</p>
        <h2 className="headline-1 section-title text-center">Delicious Menu</h2>

        {/* Category Filter */}
        <ul className="filter-list">
          {["All", "Appetizers", "Main Courses", "Desserts", "Drinks", "Snacks"].map((category) => (
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

        {/* No Foods Found Message */}
        {filteredFoodItems.length === 0 ? (
          <div className="no-foods-message">
            <h2 className="headline-1 section-title text-center">
              Our food menu is temporarily unavailable. Please check back later!
            </h2>
          </div>
        ) : (
           
          <div className="food-menu-grid">
            {filteredFoodItems.map((item) => (
              <div key={item._id} className="food-menu-card">
                {/* Displaying the image correctly */}
                <img
                  src={item.image ? item.image : "/default-image.jpg"}
                  alt={item.name}
                  className="food-img"
                />
                <div className="badge">{item.discount}</div>
                <h3 className="card-title1">{item.name}</h3>
                <p className="food-description">{item.description}</p>
                <p className="food-category">{item.category}</p>
                <div className="rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="price-wrapper">
                  <span className="price">${item.price.toFixed(2)}</span>
                  <del className="original-price">
                    {item.originalPrice
                      ? `$${item.originalPrice.toFixed(2)}`
                      : "N/A"}
                  </del>
                </div>
                <button className="food-menu-btn" onClick={handleOrderClick}>
                  Order Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Foods;
