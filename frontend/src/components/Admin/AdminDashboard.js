import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import Header from "./Header";
import HeroSection from "./HeroSection";

import List from "./List";


import heroSlider1 from "../assets/images/a3.jpg";
import heroSlider2 from "../assets/images/as2.jpg";

const slides = [
  {
    imgSrc: heroSlider1,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">
        Manage Operations Effortlessly
      </p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        Seamless Control
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Oversee restaurant operations, manage staff, and monitor orders in real-time.
      </p>
    ),
  },
  {
    imgSrc: heroSlider2,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">
        Real-Time Analytics & Insights
      </p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        Make Smarter Decisions
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Gain insights into restaurant performance and optimize processes for efficiency.
      </p>
    ),
  },
];


const AdminDashboard = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsTopbarVisible(scrollY <= 50);
    setIsHeaderVisible(scrollY <= 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Topbar isTopbarVisible={isTopbarVisible} />
      <Header isHeaderVisible={isHeaderVisible} role="admin" />
      <HeroSection
        slides={slides}
        activeSlide={activeSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
      <List />
     
    </div>
  );
};

export default AdminDashboard;
