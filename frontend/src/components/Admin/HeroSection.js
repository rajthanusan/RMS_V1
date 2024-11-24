 
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function HeroSection({
  slides,
  activeSlide,
  nextSlide,
  prevSlide,
}) {
  return (
    <section className="hero text-center" aria-label="home" id="home">
      <ul className="hero-slider">
        {slides.map((slide, index) => (
          <li
            key={index}
            className={`slider-item ${index === activeSlide ? "active" : ""}`}
          >
            <div className="slider-bg">
              <img
                src={slide.imgSrc}
                width="1880"
                height="950"
                alt=""
                className="img-cover"
              />
            </div>
            <p className="section-subtitle">{slide.subtitle}</p>
            <h1 className="display-1 hero-title">{slide.title}</h1>
            <p className="body-2 hero-text">{slide.text}</p>
           
          </li>
        ))}
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
    </section>
  );
}
