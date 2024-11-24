import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";

export default function HeroSection({
  slides = [], // Fallback to an empty array if slides is undefined
  activeSlide,
  nextSlide,
  prevSlide,
}) {
  // Scroll to the "menu" section
  const handleMenuClick = () => {
    const menuSection = document.getElementById("menus");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to the "table" section
  const handleTableClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const tableSection = document.getElementById("table");
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero text-center" aria-label="home" id="home">
      <ul className="hero-slider">
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <li
              key={index}
              className={`slider-item ${index === activeSlide ? "active" : ""}`}
            >
              <div className="slider-bg">
                <img
                  src={slide.imgSrc}
                  width="1880"
                  height="950"
                  alt={slide.title}
                  className="img-cover"
                />
              </div>
              <p>{slide.subtitle}</p>
              <h1 className="display-1 hero-title">{slide.title}</h1>
              <p className="body-2 hero-text">{slide.text}</p>
              <button
                className="btn btn-primary slider-reveal"
                onClick={handleMenuClick}
              >
                <span className="text text-1">View Our Menu</span>
                <span className="text text-2" aria-hidden="true">
                  View Our Menu
                </span>
              </button>
            </li>
          ))
        ) : (
          <li>No slides available</li> // Fallback message if slides are empty or undefined
        )}
      </ul>

      <button
        className="slider-btn prev"
        aria-label="slide to previous"
        onClick={prevSlide}
      >
        <IoChevronBack />
      </button>
      <button
        className="slider-btn next"
        aria-label="slide to next"
        onClick={nextSlide}
      >
        <IoChevronForward />
      </button>

      {/* Book a table button with scroll functionality */}
      <a
        href="#table" // You can still use href for fallback
        className="hero-btn has-after"
        onClick={handleTableClick} // Trigger scroll to "table"
        aria-label="Book a table"
      >
        <MdOutlineRestaurantMenu size={50} color="#000000" />
        <span class="label-2 text-center span">Book A Table</span>
      </a>
    </section>
  );
}
