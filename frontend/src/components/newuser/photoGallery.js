import React, { useState, useEffect } from 'react';
import '../assets/style/PhotoGallery.css';

export default function PhotoGallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        const data = await response.json();
        if (data.images) {
          setImages(data.images);
          setFilteredImages(data.images);  
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();  
    const intervalId = setInterval(fetchImages, 5000);  

    return () => clearInterval(intervalId);
  }, []);

  const filterGallery = (category) => {
    setFilteredImages(category === 'All' ? images : images.filter(img => img.category === category));
    setActiveCategory(category);
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <section className="section photo-gallery bg-black-10" aria-label="photo gallery" id="gallery">
      <div className="container">
        <p className="section-subtitle label-2">Gallery</p>
        <h2 className="headline-1 section-title">Explore Our Offerings</h2>

        <div className="filter-container">
          {['All', 'Ambiance', 'Food', 'Drinks', 'Customers'].map((category) => (
            <button
              key={category}
              className={`filter-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => filterGallery(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredImages.length === 0 ? (
          <h2 className="headline-1 section-title text-center">Sorry, the gallery is empty right now.</h2>
        ) : (
          <ul className="photo-grid">
            {filteredImages.map(image => (
              <li key={image._id}>
                <figure
                  className="card-banner img-holder"
                  style={{ '--width': 285, '--height': 336 }}
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={`/uploads/${image.filename}`}  
                    alt={image.alt}
                    width="285"
                    height="336"
                    loading="lazy"
                    className="img-cover"
                  />
                </figure>
              </li>
            ))}
          </ul>
        )}

        {/* Lightbox */}
        {lightboxImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={`/uploads/${lightboxImage.filename}`}
                alt={lightboxImage.alt}
                className="lightbox-image"
              />
              <button className="close-button" onClick={closeLightbox}>
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
