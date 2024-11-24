import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import '../assets/style/ManageFoods.css';

export default function AdminUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/auth/users'); 
        
        const filteredUsers = response.data.filter(user => user.role === 'user');
        setUsers(filteredUsers);  
      } catch (error) {
        console.error("There was an error fetching the user data:", error);
      }
    };

  
    fetchUsers();

   
    const intervalId = setInterval(fetchUsers, 5000);

   
    return () => clearInterval(intervalId);
  }, []);  

  const deleteUser = async (id) => {
    try {
    
      await axios.delete(`/auth/users/${id}`);  
       
      setUsers(users.filter(user => user._id !== id));

       
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <section className="manage-foods">
      <div className="container">
        <div className="form manage-foods-form bg-eerie-black-3">
          <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>
            Manage Users
          </h2>
          <table className="table">
            <thead style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>*****</td> {/* Masking the password */}
                  <td>
                    <FaTrash 
                      onClick={() => deleteUser(user._id)} 
                      style={{ fontSize: "2rem",
                      cursor: "pointer", color: 'var(--danger)' }} 
                      aria-label="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Include the ToastContainer component at the bottom of the component tree */}
      <ToastContainer />
    </section>
  );
}
