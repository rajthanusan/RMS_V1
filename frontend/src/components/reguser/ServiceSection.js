import React, { useState, useEffect } from 'react';

export default function ServiceSection() {
  const [dishes, setDishes] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('/api/dishes');
        const data = await response.json();
        setDishes(data);  
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);  
      }
    };

    fetchDishes();  
    const interval = setInterval(fetchDishes, 5000);  

    return () => clearInterval(interval);
  }, []);  

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <section className="section service text-center bg-img" aria-label="service">
      <div className="container">
        <p className="section-subtitle label-2">Exquisite Flavors for the Discerning Palate</p>
        <h2 className="headline-1 section-title">Indulge in Our Gourmet Selections</h2>
        <p className="section-text">
          From the finest cuts of meat to delicately crafted desserts, our special foods are designed to tantalize your taste buds.
        </p>

        {/* Check if dishes array is empty */}
        {dishes.length === 0 ? (
          <h2 className="headline-1 section-title text-center">There are no special food items right now. Please check back later!</h2>
        ) : (
          <ul className="grid-list" style={{ display: 'flex', justifyContent: 'space-between', padding: 0, listStyle: 'none' }}>
            {dishes.map((dish) => (
              <li key={dish._id} style={{ flex: '1', textAlign: 'center' }}>
                <div className="service-card">
                  <a href="#menus" className="has-before hover:shine">
                    <figure className="card-banner img-holder" style={{ '--width': 285, '--height': 336 }}>
                      <img
                        src={dish.image}
                        width="285"
                        height="336"
                        loading="lazy"
                        alt={dish.title}
                        className="img-cover"
                      />
                    </figure>
                  </a>
                  <div className="card-content">
                    <h3 className="title-4 card-title">
                      <a href="#menus">{dish.title}</a>
                    </h3>
                    <p className="card-description">{dish.description}</p>
                    <a href="#menus" className="btn-text hover-underline label-2">View Menu</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
