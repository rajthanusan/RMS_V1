import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import Header from "./Header";
import HeroSection from "./HeroSection";
import List from "./List";

import heroSlider1 from "../assets/images/op3.jpg";
import heroSlider2 from "../assets/images/op.jpg";

const slides = [
  {
    imgSrc: heroSlider1,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">
        Operational Excellence & Quality
      </p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        Exceptional Dining
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Streamline operations & ensure every customer leaves with a smile.
      </p>
    ),
  },
  {
    imgSrc: heroSlider2,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">Efficient & Seamless</p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        Service Quality
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Innovate service delivery & enhance operational efficiency in your restaurant.
      </p>
    ),
  },
];



const OperatorDashboard = () => {
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
      <Header isHeaderVisible={isHeaderVisible} role="operator" />
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

export default OperatorDashboard;
