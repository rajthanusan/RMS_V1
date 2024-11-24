import React, { useEffect, useState } from "react";
import badgeImage from "../assets/images/badge-2.png";  
import image1 from '../assets/images/rh.jpg';

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        const data = await response.json();
        setAboutData(data.data);  
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };

     
    fetchAboutData();

     
    const intervalId = setInterval(fetchAboutData, 5000);

     
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      className="section about text-center bg-black-10"
      aria-labelledby="about-label"
      id="about-us"
    >
      <div className="container">
        {/* About Content */}
        <div className="about-content">
          <p className="section-subtitle">Savor the Essence of Sri Lanka</p>
          <h2 className="headline-1 section-title">
            Our Story
          </h2>
          <p className="section-text" style={{ textAlign: "justify" }}>
  {aboutData ? aboutData.description : "We are passionate about providing the best culinary experience! Our mission is to deliver exceptional flavors, unique dishes, and a warm, welcoming atmosphere that makes every visit memorable. Whether you're here for a quick meal or a leisurely dinner, we ensure that each bite is made with the finest ingredients and attention to detail. We are committed to exceeding your expectations and providing an unforgettable dining experience for you and your loved ones."}
</p>

<h3 className="headline-2">
  Our Amazing Team
</h3>

<p className="section-text" style={{ textAlign: "justify" }}>
  {aboutData ? aboutData.teamDescription : "Our team consists of expert chefs dedicated to excellence. With years of culinary experience and a passion for food, our chefs constantly strive to create innovative dishes that delight the taste buds. Our front-of-house team ensures that every guest feels welcome and well taken care of, from the moment they step into the restaurant to the time they leave. Together, we work harmoniously to deliver not just a meal, but a memorable experience for every customer."}
</p>

        </div>

        {/* About Banner */}
        <figure className="about-banner">
          <img
            src={image1}
            alt="About Us Banner"
            className="w-100"
            loading="lazy"
          />
          <div className="abs-img abs-img-2 has-before">
            <img
              src={badgeImage}
              width="133"
              height="134"
              loading="lazy"
              alt="Award badge"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
