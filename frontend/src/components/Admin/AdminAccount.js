import React, { useState } from 'react';
import { FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import '../assets/style/ManageFoods.css';
import AdminUser from './AdminUser';
import AdminManager from './AdminManager';
import AdminOperator from './AdminOperator';

export default function AdminAccount() {
  const [selectedCategory, setSelectedCategory] = useState('Manage User');
  const [fade, setFade] = useState(false);

   
  const handleFilterClick = (category) => {
    if (selectedCategory !== category) {
      setFade(true);
      setTimeout(() => {
        setSelectedCategory(category);
        setFade(false);
      }, 300);  
    }
  };

   
  const renderSelectedComponent = () => {
    switch (selectedCategory) {
      case 'Manage User':
        return <AdminUser />;
      case 'Manage Manager':
        return <AdminManager />;
      case 'Manage Operator':
        return <AdminOperator />;
      default:
        return null;
    }
  };

  return (
    <section className="manage-foods full__screen bg-img" id="dashboard">
      <div className="container">
      <div className="form manage-foods-form bg-eerie-black-3">
        <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Manage Accounts</h2>
        
        {/* Category Filter */}
        <ul className="filter-list">
          {['Manage User', 'Manage Manager', 'Manage Operator'].map((category) => (
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
        >
          {renderSelectedComponent()}
        </div>
      </div>
      </div>
    </section>
  );
}
