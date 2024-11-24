import React, { useState, useEffect } from "react";
import { FaTrash, FaToggleOn, FaToggleOff, FaEdit } from "react-icons/fa";
import axios from "axios";  
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/ManageFoods.css";

export default function AdminOperator() {
  const [operators, setOperators] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "operator",  
  });
  const [editingId, setEditingId] = useState(null);

   
  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axios.get("/auth/users");
        const filteredOperators = response.data.filter(
          (user) => user.role === "operator"
        );
        setOperators(filteredOperators);
      } catch (error) {
        console.error("Error fetching operators:", error);
        toast.error("Failed to load operators!");
      }
    };

     
    fetchOperators();

     
    const intervalId = setInterval(fetchOperators, 5000);

     
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
        setOperators(
          operators.map((operator) =>
            operator._id === editingId ? response.data : operator
          )
        );
        toast.success("Operator updated successfully!");
        setEditingId(null);  
      } catch (error) {
        console.error("Error updating operator:", error);
        toast.error(
          `Error updating operator: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } else {
       
      try {
        const response = await axios.post(
          "/auth/register-operator",  
          dataToSend
        );
        setOperators((prevOperators) => [...prevOperators, response.data]);
        toast.success("Operator added successfully!");
      } catch (error) {
        console.error("Error adding operator:", error);
        toast.error(
          `Error adding operator: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }

     
    setFormData({ username: "", password: "", role: "operator" });
  };

   
  const handleEdit = (id) => {
    const operator = operators.find((operator) => operator._id === id);
    setFormData({ username: operator.username, password: "" });
    setEditingId(id);
  };

   
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/auth/users/${id}`);
      setOperators(operators.filter((operator) => operator._id !== id));
      toast.success("Operator deleted successfully!");
    } catch (error) {
      console.error("Error deleting operator:", error);
      toast.error("Error deleting operator.");
    }
  };

   
  const toggleOperatorStatus = (id) => {
    setOperators(
      operators.map((operator) =>
        operator._id === id
          ? { ...operator, isActive: !operator.isActive }
          : operator
      )
    );
  };

  return (
    <section className="manage-foods">
      <div className="container">
        <div className="form manage-foods-form bg-eerie-black-3">
          <form onSubmit={handleSubmit} className="form-left">
            <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
              Manage Operators
            </h2>
            <p className="form-text text-center" style={{ color: "var(--quick-silver)" }}>
              Add or Edit Operators
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                placeholder="Operator Username"
                value={formData.username}
                onChange={handleChange}
                className="input-field input-field1"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Operator Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field input-field1"
                required
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              <span className="text text-1">
                {editingId ? "Update Operator" : "Add Operator"}
              </span>
              <span className="text text-2" aria-hidden="true">
                {editingId ? "Update Operator" : "Add Operator"}
              </span>
            </button>
          </form>
        </div>

        <br />
        <div className="operator-table form">
          <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
            Operator List
          </h2>
          <table className="table" style={{ backgroundColor: "var(--white)", color: "var(--smoky-black-2)" }}>
            <thead style={{ backgroundColor: "var(--white)" }}>
              <tr>
                <th>Username</th>
                <th>Password</th>
              
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {operators.map((operator) => (
                <tr key={operator._id}>
                  <td>{operator.username}</td>
                  <td>*****</td>
                 
                  <td>
                    <FaEdit
                      style={{  fontSize: "2rem",
                      cursor: "pointer",marginRight:"1.5rem"}}
                      onClick={() => handleEdit(operator._id)}
                    />
                    <FaTrash
                      style={{  fontSize: "2rem",
                      cursor: "pointer", color: "var(--danger)" }}
                      onClick={() => handleDelete(operator._id)}
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
