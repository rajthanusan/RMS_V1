import React, { useEffect, useState } from 'react';

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();

      // Set all reviews directly to the state (no need to filter)
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();  
    const interval = setInterval(fetchReviews, 5000);  // Refresh reviews every 5 seconds

    return () => clearInterval(interval);  // Clear the interval on component unmount
  }, []);

  return (
    <section className="section reviews__container bg-img3 full__screen " id="reviews">
      <p className="section-subtitle label-2">What Our Customers Say</p>
      <h2 className="headline-1 section-title">Reviews and Testimonials</h2>

      {/* Conditional rendering: If there are no reviews, display the message */}
      {testimonials.length === 0 ? (
        <h2 className="headline-1 section-title text-center">Currently, there are no reviews available.</h2>
      ) : (
        <div className="reviews__grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="review__card">
              <p className="review__text">"{testimonial.review}"</p>
              <p className="review__name">{testimonial.name}</p>
              <div className="review__rating">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Testimonial;
