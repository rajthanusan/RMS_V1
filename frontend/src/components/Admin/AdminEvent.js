import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/ManageFoods.css";

export default function AdminEvent() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    location: "",
    eventDate: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

   
  const locations = ["Room 1", "Room 2", "Room 3", "Hall 01", "Hall 02"];

   
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to load events!");
      }
    };

    fetchEvents();
    const intervalId = setInterval(fetchEvents, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = editingId
        ? await axios.put(`/api/events/${editingId}`, formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post("/api/events", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      const updatedEvent = response.data.event;
      setEvents((prev) =>
        editingId
          ? prev.map((event) =>
              event._id === updatedEvent._id ? updatedEvent : event
            )
          : [...prev, updatedEvent]
      );

      toast.success(
        editingId ? "Event updated successfully!" : "Event added successfully!"
      );
      resetForm();
    } catch (error) {
      toast.error(editingId ? "Error updating event." : "Error adding event.");
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      location: "",
      eventDate: "",
      image: null,
    });
    setPreviewImage(null);  
    setEditingId(null);  

     
    const fileInput = document.querySelector('input[name="image"]');
    if (fileInput) {
      fileInput.value = "";  
    }
  };

  const handleEdit = (id) => {
    const event = events.find((e) => e._id === id);

     
    setFormData({
      title: event.title,
      subtitle: event.subtitle,
      location: event.location,
      eventDate: event.eventDate.split("T")[0],  
      image: null,  
    });
    setPreviewImage(`/uploads/${event.image}`);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event.");
    }
  };

  return (
    <section className="manage-foods">
      <div className="container">
        <div className="form manage-foods-form bg-eerie-black-3">
          <form onSubmit={handleSubmit} className="form-left">
            <h2
              className="headline-1 text-center"
              style={{ color: "var(--gold-crayola)" }}
            >
              Manage Events
            </h2>
            <p
              className="form-text text-center"
              style={{ color: "var(--quick-silver)" }}
            >
              Add or Edit Events in the Schedule
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={formData.title}
                onChange={handleChange}
                className="input-field input-field1"
                required
              />
              <input
                type="text"
                name="subtitle"
                placeholder="Event Subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="input-field input-field1"
                required
              />
            </div>

            <div className="input-wrapper">
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-field input-field1"
                required
              >
                <option value="" disabled>
                  Select Room or Hall
                </option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-wrapper">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="input-field input-field1"
                accept="image/*"
                required={!editingId}
              />
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Preview" width="100" />
                </div>
              )}
            </div>

            <div className="input-wrapper">
              <input
                type="date"
                name="eventDate"
                placeholder="Event Display Date"
                value={formData.eventDate}
                onChange={handleChange}
                className="input-field input-field1"
                required
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              <span className="text text-1">
                {editingId ? "Update Event" : "Add Event"}
              </span>
              <span className="text text-2" aria-hidden="true">
                {editingId ? "Update Event" : "Add Event"}
              </span>
            </button>
          </form>
        </div>
        <br />
        <div className="food-table form">
          <h2
            className="headline-1 text-center"
            style={{ color: "var(--gold-crayola)" }}
          >
            Event List
          </h2>
          <table className="table">
            <thead
              style={{
                backgroundColor: "var(--white)",
                color: "var(--smoky-black-2)",
              }}
            >
              <tr>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Location</th>
                <th>Date</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody
              style={{
                backgroundColor: "var(--white)",
                color: "var(--smoky-black-2)",
              }}
            >
              {events.map((event) => {
                const formattedDate = new Date(event.eventDate)
                  .toISOString()
                  .split("T")[0];  
                return (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td>{event.subtitle}</td>
                    <td>{event.location}</td>
                    <td>{formattedDate}</td> {/* Show only the date */}
                    <td>
                      <img
                        src={`/uploads/${event.image}`}
                        alt={event.title}
                        width="50"
                      />
                    </td>
                    <td>
                      <FaEdit
                        style={{
                          fontSize: "2rem",
                          cursor: "pointer",
                          color: "var(--yellow-crayola)",
                          marginRight: "1.5rem",
                          marginLeft:"1rem"
                        
                        }}
                        onClick={() => handleEdit(event._id)}
                      />
                      <FaTrash
                        style={{
                          fontSize: "2rem",
                          cursor: "pointer",
                          color: "var(--yellow-crayola)",
                          
                          
                        }}
                        onClick={() => handleDelete(event._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
