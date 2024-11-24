import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/ManageFoods.css";

export default function AdminManager() {
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "manager",  
  });
  const [editingId, setEditingId] = useState(null);

   
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("/auth/users");
        const filteredManagers = response.data.filter(
          (user) => user.role === "manager"
        );
        setManagers(filteredManagers);
      } catch (error) {
        console.error("Error fetching managers:", error);
        toast.error("Failed to load managers!");
      }
    };

     
    fetchManagers();

     
    const intervalId = setInterval(fetchManagers, 5000);

     
    return () => clearInterval(intervalId);
  }, []);
   
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();

     
    if (!formData.password) {
      toast.error("Password is required!");
      return;
    }

    const { username, password, role } = formData;

     
    const dataToSend = { username, password, role };

     
    if (editingId) {
      try {
        const response = await axios.put(
          `/auth/users/${editingId}`,
          dataToSend
        );
        setManagers(
          managers.map((manager) =>
            manager._id === editingId ? response.data : manager
          )
        );
        toast.success("Manager updated successfully!");
        setEditingId(null);  
      } catch (error) {
        console.error("Error updating manager:", error);
        toast.error(
          `Error updating manager: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } else {
       
      try {
        const response = await axios.post(
          "/auth/register-manager",  
          dataToSend
        );
        setManagers((prevManagers) => [...prevManagers, response.data]);
        toast.success("Manager added successfully!");
      } catch (error) {
        console.error("Error adding manager:", error);
        toast.error(
          `Error adding manager: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }

     
    setFormData({ username: "", password: "", role: "manager" });
  };

   
  const handleEdit = (id) => {
    const manager = managers.find((manager) => manager._id === id);
    setFormData({ username: manager.username, password: "" });
    setEditingId(id);
  };

   
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/auth/users/${id}`);
      setManagers(managers.filter((manager) => manager._id !== id));
      toast.success("Manager deleted successfully!");
    } catch (error) {
      console.error("Error deleting manager:", error);
      toast.error("Error deleting manager.");
    }
  };

  return (
    <section className="manage-foods">
      <div className="container">
        <div className="form manage-foods-form bg-eerie-black-3">
          <form onSubmit={handleSubmit} className="form-left">
            <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
              Manage Managers
            </h2>
            <p className="form-text text-center" style={{ color: "var(--quick-silver)" }}>
              Add or Edit Managers
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                placeholder="Manager Username"
                value={formData.username}
                onChange={handleChange}
                className="input-field input-field1"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Manager Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field input-field1"
                required
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              <span className="text text-1">
                {editingId ? "Update Manager" : "Add Manager"}
              </span>
              <span className="text text-2" aria-hidden="true">
                {editingId ? "Update Manager" : "Add Manager"}
              </span>
            </button>
          </form>
        </div>

        <br />
        <div className="food-table form">
          <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
            Manager List
          </h2>
          <table
            className="table"
            style={{ backgroundColor: "var(--white)", color: "var(--smoky-black-2)" }}
          >
            <thead style={{ backgroundColor: "var(--white)" }}>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager) => (
                <tr key={manager._id}>
                  <td>{manager.username}</td>
                  <td>********</td> {/* Masked password for security */}
                  <td>
                    <FaEdit
                      style={{  fontSize: "2rem",
                      cursor: "pointer",marginRight:"1.5rem"}}
                      onClick={() => handleEdit(manager._id)}
                    />
                    <FaTrash
                      style={{ fontSize: "2rem",
                      cursor: "pointer", color: "var(--danger)" }}
                      onClick={() => handleDelete(manager._id)}
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
