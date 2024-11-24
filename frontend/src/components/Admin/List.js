import React, { useState } from 'react';
import ManageFoods from "./ManageFoods";
import AdminEvent from "./AdminEvent";
import AdminReviews from "./AdminReviews";
import AdminAccount from "./AdminAccount";
import AdminManageGallery from "./AdminManageGallery";
import AdminManageStory from "./AdminManageStory";
import AdminManageDishes from "./AdminManageDishes";




function List() {
  const [selectedCategory, setSelectedCategory] = useState('Manage Menu');
  const [fade, setFade] = useState(false); 

  const handleFilterClick = (category) => {
    setFade(true); 
    setSelectedCategory(category);
  };

  const onTransitionEnd = () => setFade(false);

  return (
    <section className="section full__screen bg-img" id="dashboard">
      <div className="container">
        {/* Category Filter */}
        <ul className="filter-list">
          {['Manage Menu', 'Manage Review', 'Manage Events', 'Manage Accounts','Manage Gallary','Manage History','Manage Dishes'].map((category) => (
            <li key={category}>
              <button 
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`} 
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        {/* Render Full-Width Components */}
        <div 
          className={`admin-section ${fade ? 'fade-out' : 'fade-in'}`} 
          onTransitionEnd={onTransitionEnd}
        >
          {selectedCategory === 'Manage Menu' && <ManageFoods />}
          {selectedCategory === 'Manage Review' && <AdminReviews />}
          {selectedCategory === 'Manage Events' && <AdminEvent />}
          {selectedCategory === 'Manage Accounts' && <AdminAccount />} {/* Placeholder for Manage Accounts component */}
          {selectedCategory === 'Manage Gallary' && <AdminManageGallery />}
          {selectedCategory === 'Manage History' && <AdminManageStory />}
          {selectedCategory === 'Manage Dishes' && <AdminManageDishes />}
        </div>
      </div>
    </section>
  );
}

export default List;
