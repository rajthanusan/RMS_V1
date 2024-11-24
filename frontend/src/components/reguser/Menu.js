 
import React from 'react';

 
import menu1 from '../assets/images/menu-1.png';
import menu2 from '../assets/images/menu-2.png';
import menu3 from '../assets/images/menu-3.png';
import menu4 from '../assets/images/menu-4.png';
import menu5 from '../assets/images/menu-5.png';
import menu6 from '../assets/images/menu-6.png';
import menu7 from '../assets/images/menu-2.png';  
import menu8 from '../assets/images/menu-3.png';
import menu9 from '../assets/images/menu-4.png';
import menu10 from '../assets/images/menu-5.png';

const menuItems = [
  {
    category: "Appetizers",
    items: [
      {
        name: "Greek Salad",
        price: "$25.50",
        description: "A refreshing mix of tomatoes, green bell pepper, sliced cucumber, onion, olives, and feta cheese.",
        special: "Vegan, Gluten-Free",
        imgSrc: menu1,
      },
      {
        name: "Lasagne",
        price: "$40.00",
        description: "Layers of pasta, vegetables, cheeses, ground meats, and rich tomato sauce.",
        special: "Contains Dairy, Gluten",
        imgSrc: menu2,
      },
    ],
  },
  {
    category: "Main Courses",
    items: [
      {
        name: "Butternut Pumpkin",
        price: "$10.00",
        description: "A creamy butternut pumpkin dish seasoned to perfection.",
        special: "Vegan, Gluten-Free",
        imgSrc: menu3,
      },
      {
        name: "Tokusen Wagyu",
        price: "$39.00",
        description: "Premium Wagyu beef cooked to your liking.",
        special: "Contains Dairy",
        imgSrc: menu4,
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Olivas Rellenas",
        price: "$25.00",
        description: "Avocados stuffed with crab meat and vegetables.",
        special: "Contains Shellfish",
        imgSrc: menu5,
      },
      {
        name: "Opu Fish",
        price: "$49.00",
        description: "Fresh Opu fish grilled to perfection.",
        special: "Contains Fish",
        imgSrc: menu6,
      },
    ],
  },
  {
    category: "Salads",
    items: [
      {
        name: "Caesar Salad",
        price: "$15.00",
        description: "Crisp romaine lettuce, creamy Caesar dressing, croutons, and Parmesan cheese.",
        special: "Contains Dairy, Gluten",
        imgSrc: menu5,
      },
      {
        name: "Garden Salad",
        price: "$12.00",
        description: "A fresh mix of seasonal vegetables and greens.",
        special: "Vegan, Gluten-Free",
        imgSrc: menu6,
      },
    ],
  },
  {
    category: "Beverages",
    items: [
      {
        name: "Fresh Juice",
        price: "$5.00",
        description: "Freshly squeezed juice from seasonal fruits.",
        special: "Vegan",
        imgSrc: menu7,
      },
      {
        name: "Iced Tea",
        price: "$3.50",
        description: "Refreshing iced tea brewed to perfection.",
        special: "Vegan",
        imgSrc: menu8,
      },
    ],
  },
  {
    category: "Specials",
    items: [
      {
        name: "Chef's Special",
        price: "$30.00",
        description: "A unique dish prepared with seasonal ingredients.",
        special: "Contains Dairy",
        imgSrc: menu9,
      },
      {
        name: "Dessert of the Day",
        price: "$8.00",
        description: "A delightful surprise created by our chef.",
        special: "Contains Dairy",
        imgSrc: menu10,
      },
    ],
  },
];

export default function Menu() {
  return (
    <section id="menu" className="section menu"  aria-label="menu">
      <div className="container">
        <p className="section-subtitle text-center label-2">Special Selection</p>
        <h2 className="headline-1 section-title text-center">Delicious Menu</h2>

        {menuItems.map((category, index) => (
          <div key={index}>
            <h3 className="category-title label-2 section-subtitle">{category.category}</h3>
            <ul className="grid-list">
              {category.items.map((item, idx) => (
                <li key={idx}>
                  <div className="menu-card hover:card">
                    <figure className="card-banner img-holder" style={{ '--width': '100', '--height': '100' }}>
                      <img src={item.imgSrc} width="100" height="100" loading="lazy" alt={item.name} className="img-cover" />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title">{item.name}</a>
                        </h3>
                        <span className="span title-2">{item.price}</span>
                      </div>
                      <p className="card-text label-1">{item.description} <strong>{item.special}</strong></p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
