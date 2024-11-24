import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import Header from "./Header";
import HeroSection from "./HeroSection";

import List from "./List";

import heroSlider1 from "../assets/images/ma5.jpg";
import heroSlider2 from "../assets/images/ma2.jpg";

const slides = [
  {
    imgSrc: heroSlider1,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">
        Leadership & Efficiency
      </p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        Empowering Teams for Success
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Lead with passion & build a culture of collaboration and growth.
      </p>
    ),
  },
  {
    imgSrc: heroSlider2,
    subtitle: (
      <p className="label-2 section-subtitle slider-reveal">Strategic & Visionary</p>
    ),
    title: (
      <h1 className="display-1 hero-title slider-reveal">
        Transforming Ideas into Action
      </h1>
    ),
    text: (
      <p className="body-2 hero-text slider-reveal">
        Drive innovation, lead change, and achieve organizational excellence.
      </p>
    ),
  },
];

const ManagerDashboard = () => {
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
      <Header isHeaderVisible={isHeaderVisible} role="manager" />
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

export default ManagerDashboard;
