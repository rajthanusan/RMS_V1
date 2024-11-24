import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/style/ManageFoods.css';

export default function AdminManageDishes() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    title: '',
    description: '',
    image: null,  
  });
  const [editingDishId, setEditingDishId] = useState(null);

   
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('/api/dishes');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
        toast.error('Error fetching dishes');
      }
    };
    fetchDishes();
  }, []);

  const handleSubmitDish = async () => {
    const formData = new FormData();
    formData.append('title', newDish.title);
    formData.append('description', newDish.description);
    if (newDish.image) formData.append('image', newDish.image);

    try {
      let response;
      if (editingDishId) {
        response = await axios.put(`/api/dishes/${editingDishId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setDishes(dishes.map(dish => (dish._id === editingDishId ? response.data : dish)));
        setEditingDishId(null);
        toast.success('Dish updated successfully');
      } else {
        response = await axios.post('/api/dishes', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setDishes([...dishes, response.data]);
        toast.success('Dish added successfully');
      }
      setNewDish({ title: '', description: '', image: null });
    } catch (error) {
      console.error('Error saving dish:', error);
      toast.error('Error saving dish');
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await axios.delete(`/api/dishes/${id}`);
      setDishes(dishes.filter(dish => dish._id !== id));
      toast.success('Dish deleted successfully');
    } catch (error) {
      console.error('Error deleting dish:', error);
      toast.error('Error deleting dish');
    }
  };

  const handleEditDish = (id) => {
    const dish = dishes.find(dish => dish._id === id);
    setNewDish({ title: dish.title, description: dish.description, image: null });
    setEditingDishId(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewDish(prevState => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  return (
    <section className="manage-foods">
    <div className="container">
      {/* Add New Dish Form */}
      <div className="form manage-dishes-form bg-eerie-black-3">
        <form className="form-left">
          <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Manage Special Dishes</h2>
          <p className="form-text text-center" style={{ color: 'var(--quick-silver)' }}>
            Add or Edit Dishes to the Menu
          </p>
            <div className="input-wrapper">
              <input
                type="text"
                name="title"
                placeholder="Dish Name"
                value={newDish.title}
                onChange={handleInputChange}
                className="input-field input-field1"
                required
              />
              <textarea
                name="description"
                placeholder="Dish Description"
                value={newDish.description}
                onChange={handleInputChange}
                className="input-field input-field1"
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="input-field input-field1"
                required={!editingDishId}
              />
            </div>
           

            <button type="submit" className="btn btn-secondary" onClick={handleSubmitDish}>
  <span className="text text-1">
    {editingDishId ? "Update Dish" : "Add Dish"}
  </span>
  <span className="text text-2" aria-hidden="true">
    {editingDishId ? "Update Dish" : "Add Dish"}
  </span>
</button>

          </form>
        </div>
        <br />
        <div className="dishes-list form">
          <h2 className="headline-1 text-center">Special Dishes</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map(dish => (
                <tr key={dish._id}>
                  <td>{dish.title}</td>
                  <td>{dish.description}</td>
                  <td>
                    <img src={dish.image} alt={dish.title} width="50" />
                  </td>
                  <td>
  <FaEdit
    onClick={() => handleEditDish(dish._id)}
    style={{
      fontSize: "2rem",
      cursor: "pointer",
      color: "var(--yellow-crayola)",
      marginRight: "2rem",  
    }}
  />
  <FaTrash
    onClick={() => handleDeleteDish(dish._id)}
    style={{
      fontSize: "2rem",
      cursor: "pointer",
      color: "var(--crimson)",
    }}
  />
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
