import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/ManageFoods.css";

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "Main Courses",
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    image: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFoodId, setEditFoodId] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get("/food/get-food-items");
      if (Array.isArray(response.data)) {
        setFoods(response.data);
      } else {
        toast.error("Error: Server returned invalid data.");
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast.error("Failed to fetch food items.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "image" && formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (formData.image) {
      data.append("image", formData.image);
    } else if (isEditMode && existingImage) {
      data.append("existingImage", existingImage);
    }

    try {
      if (isEditMode) {
        await axios.put(`/food/update-food-item/${editFoodId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Food item updated successfully.");
      } else {
        await axios.post("/food/add-food-items", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Food item added successfully.");
      }
      resetForm();
      fetchFoodItems();
    } catch (error) {
      console.error("Error saving food item:", error);
      toast.error("Failed to save food item.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Main Courses",
      price: "",
      originalPrice: "",
      discount: "",
      description: "",
      image: null,
    });
    setExistingImage(null);
    setIsEditMode(false);
    setEditFoodId(null);
    document.querySelector('input[name="image"]').value = "";
  };

  const handleEdit = (id) => {
    const foodToEdit = foods.find((food) => food._id === id);
    if (foodToEdit) {
      setFormData({
        name: foodToEdit.name || "",
        category: foodToEdit.category || "Main Courses",
        price: foodToEdit.price || "",
        originalPrice: foodToEdit.originalPrice || "",
        discount: foodToEdit.discount || "",
        description: foodToEdit.description || "",
        image: null,
      });
      setExistingImage(foodToEdit.image);
      setIsEditMode(true);
      setEditFoodId(id);
    }
  };

  const deleteFood = async (id) => {
    try {
      await axios.delete(`/food/delete-food-item/${id}`);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
      toast.success("Food item deleted successfully.");
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error("Failed to delete food item.");
    }
  };

  return (
    <section className="manage-foods">
      <div className="container">
        <div className="form manage-foods-form bg-eerie-black-3">
          <form className="form-left" onSubmit={handleSubmit}>
            <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
              Manage Food Items
            </h2>
            <p className="form-text text-center" style={{ color: "var(--quick-silver)" }}>
              Add or Edit Food Items in the Menu
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Food Name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field input-field1"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input-field input-field1"
              >
                <option value="Main Courses">Main Courses</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Desserts">Desserts</option>
                <option value="Drinks">Drinks</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div className="input-wrapper">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="input-field input-field1"
              />
              <input
                type="number"
                name="originalPrice"
                placeholder="Original Price"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="input-field input-field1"
              />
              <input
                type="text"
                name="discount"
                placeholder="Discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="input-field input-field1"
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="input-field input-field1"
            ></textarea>

            <div className="input-wrapper">
              {isEditMode && existingImage && (
                <div>
                  <p>Current Image:</p>
                  <img src={existingImage} alt="Current Food" width="50" />
                </div>
              )}
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="input-field input-field1"
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              <span className="text text-1">{isEditMode ? "Update Item" : "Save Item"}</span>
              <span className="text text-2" aria-hidden="true">
                {isEditMode ? "Update Item" : "Save Item"}
              </span>
            </button>
          </form>
        </div>
<br />
        <div className="food-table form">
          <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
            Food Items List
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Original Price</th>
                <th>Discount</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>{food.category}</td>
                  <td>{food.price ? `$${food.price.toFixed(2)}` : "N/A"}</td>
                  <td>{food.originalPrice ? `$${food.originalPrice.toFixed(2)}` : "N/A"}</td>
                  <td>{food.discount}</td>
                  <td>{food.description}</td>
                  <td>
                    <img src={food.image} alt={food.name} width="50" />
                  </td>
                  <td>
                    <FaEdit
                      onClick={() => handleEdit(food._id)}
                      style={{ fontSize: "2rem", cursor: "pointer", color: "var(--yellow-crayola)" }}
                    />
                    <FaTrash
                      onClick={() => deleteFood(food._id)}
                      style={{ fontSize: "2rem", cursor: "pointer", color: "var(--crimson)" }}
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
