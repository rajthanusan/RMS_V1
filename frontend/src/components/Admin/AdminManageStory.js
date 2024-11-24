import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/ManageFoods.css";

export default function AdminManageStory() {
  const [storyContent, setStoryContent] = useState({
    description: "",  
    teamDescription: "",  
  });
  const [loading, setLoading] = useState(false);

   
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/about");
        const { data } = response.data;

         
        setStoryContent({
          description: data?.description || "",  
          teamDescription: data?.teamDescription || "",  
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching About Us information:", error);
        setLoading(false);
        toast.error("Failed to load About Us information.");
      }
    };

    fetchAboutData();
    
  }, []);

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryContent({
      ...storyContent,
      [name]: value,
    });
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/about", storyContent);

      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      console.error("Error saving About Us information:", error);
      toast.error("Failed to save changes.");
      setLoading(false);
    }
  };

  return (
    <section className="manage-foods">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
        <div className="form manage-gallery-form bg-eerie-black-3">
          <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
            Manage Our Story
          </h2>

          {loading ? (
            <div className="loading-spinner">
              <p>Loading...</p>
            </div>
          ) : (
            <form className="form-left" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <textarea
                  name="description"
                  value={storyContent.description}
                  onChange={handleChange}
                  placeholder="Description"
                  autoComplete="off"
                  className="input-field input-field1"
                />
              </div>

              <div className="input-wrapper">
                <textarea
                  name="teamDescription"
                  value={storyContent.teamDescription}
                  onChange={handleChange}
                  placeholder="Team Description"
                  autoComplete="off"
                  className="input-field input-field1"
                />
              </div>

              <button type="submit" className="btn btn-secondary text-light mt-3">
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
