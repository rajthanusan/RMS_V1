import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/style/ManageFoods.css';

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);

   
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('/food/get-food-items');
         
        setFoods(response.data.map(food => ({
          ...food,
          isActive: food.status === 'Active',  
        })));
      } catch (error) {
        console.error('Error fetching food items:', error);
        toast.error('Error fetching food items!');
      }
    };
    fetchFoodItems();
  }, []);   

   
  const toggleFoodStatus = async (_id) => {   
    const updatedFood = foods.find(food => food._id === _id);   

    if (!updatedFood) {
      console.error('Food item not found!');
      toast.error('Food item not found!');
      return;
    }

    const newStatus = updatedFood.isActive ? 'Inactive' : 'Active';   
  
    try {
       
      await axios.put(`/food/update-food-item-status/${_id}`, { status: newStatus });
  
       
      setFoods(foods.map(food =>
        food._id === _id ? { ...food, isActive: !food.isActive } : food
      ));
      toast.success(`Food item status updated to ${newStatus}!`);
    } catch (error) {
      console.error('Error updating food item status:', error);
      toast.error('Error updating food item status!');
    }
  };

  return (
    <section className="manage-foods">
      <div className="container">
      <div className="form manage-subscribers-form bg-eerie-black-3">
        <div className="food-table">
          <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Food Items List</h2>
          <table className="table">
            <thead  style={{
                backgroundColor: "var(--white)",
                color: "var(--smoky-black-2)",
              }}>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Description</th>
                <th>Image</th>
                <th>Status</th>
                <th>Toggle Status</th>
              </tr>
            </thead>
            <tbody  style={{
                backgroundColor: "var(--white)",
                color: "var(--smoky-black-2)",
              }}>
              {foods.map(food => (
                <tr key={food._id}>  {/* Use _id for consistency */}
                  <td>{food.name}</td>
                  <td>{food.category}</td>
                  <td>${food.price.toFixed(2)}</td>
                  <td>{food.discount}</td>
                  <td>{food.description}</td>
                  <td><img src={food.image} alt={food.name} width="50" /></td>
                  <td>{food.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    {food.isActive ? (
                      <FaToggleOn
                        onClick={() => toggleFoodStatus(food._id)}   
                        style={{ color: 'hsl(38, 61%, 73%)', cursor: 'pointer', fontSize: '3rem' }}
                        aria-label="Deactivate"
                      />
                    ) : (
                      <FaToggleOff
                        onClick={() => toggleFoodStatus(food._id)}   
                        style={{ color: 'hsl(38, 61%, 73%)', cursor: 'pointer', fontSize: '3rem' }}
                        aria-label="Activate"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      <ToastContainer />
    </section>
  );
}
