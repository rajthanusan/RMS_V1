import React, { useState, useEffect, useRef } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/style/ManageFoods.css';

export default function AdminManageGallery() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ alt: '', category: 'Ambiance', file: null });
  const [editingImage, setEditingImage] = useState(null);  
  const fileInputRef = useRef(null);  

  useEffect(() => {
     
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images');  
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching images', error);
        toast.error('Error fetching images!');
      }
    };
    fetchImages();
    const intervalId = setInterval(fetchImages, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewImage((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,  
    }));
  };

   
  const addImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('alt', newImage.alt);
    formData.append('category', newImage.category);
    formData.append('file', newImage.file);

    try {
      const response = await axios.post('/api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },  
      });
      setImages([...images, response.data.image]);  
      setNewImage({ alt: '', category: 'Ambiance', file: null });  
      if (fileInputRef.current) fileInputRef.current.value = '';  
      toast.success('Image added successfully!');
    } catch (error) {
      console.error('Error adding image', error);
      toast.error('Error adding image!');
    }
  };

   
  const editImage = (id) => {
    const imageToEdit = images.find((image) => image._id === id);
    if (imageToEdit) {
      setEditingImage(imageToEdit);
      setNewImage({
        alt: imageToEdit.alt,
        category: imageToEdit.category,
        file: null,  
      });
      if (fileInputRef.current) fileInputRef.current.value = '';  
    }
  };

   
  
 const updateImage = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('alt', newImage.alt);
  formData.append('category', newImage.category);
  if (newImage.file) {
    formData.append('file', newImage.file);  
  }

  try {
    const response = await axios.put(`/api/images/${editingImage._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setImages(images.map((image) => (image._id === response.data.image._id ? response.data.image : image)));  
    setNewImage({ alt: '', category: 'Ambiance', file: null });
    setEditingImage(null);
    toast.success('Image updated successfully!');
  } catch (error) {
    console.error('Error updating image:', error.response ? error.response.data.message : error);
    toast.error('Error updating image!');
  }
};


 
const deleteImage = async (id) => {
  try {
    const response = await axios.delete(`/api/images/${id}`);
    setImages(images.filter((image) => image._id !== id));  
    toast.success('Image deleted successfully!');
  } catch (error) {
    console.error('Error deleting image:', error.response ? error.response.data.message : error);
    toast.error('Error deleting image!');
  }
};


  return (
    <section className="manage-foods full__screen">
      <div className="container">
        <div className="form manage-gallery-form bg-eerie-black-3">
          <form
            className="form-left"
            onSubmit={editingImage ? updateImage : addImage}
            encType="multipart/form-data"
          >
            <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>
              {editingImage ? 'Edit Image' : 'Add Image'}
            </h2>
            <p className="form-text text-center" style={{ color: 'var(--quick-silver)' }}>
              {editingImage ? 'Update the image details' : 'Add a new image to the gallery'}
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="alt"
                placeholder="Image Description"
                required
                autoComplete="off"
                value={newImage.alt}
                onChange={handleInputChange}
                className="input-field input-field1"
              />
              <select
                name="category"
                className="input-field input-field1"
                value={newImage.category}
                onChange={handleInputChange}
              >
                <option value="Ambiance">Ambiance</option>
                <option value="Food">Food</option>
                <option value="Drinks">Drinks</option>
                <option value="Customers">Customers</option>
              </select>
            </div>

            <div className="input-wrapper">
              <input
                type="file"
                name="file"
                accept="image/*"
                className="input-field input-field1"
                onChange={handleInputChange}
                ref={fileInputRef}  
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              <span className="text text-1">
                {editingImage ? 'Update Image' : 'Add Image'}
              </span>
              <span className="text text-2" aria-hidden="true">
                {editingImage ? 'Update Image' : 'Add Image'}
              </span>
            </button>
          </form>
        </div>
        <br />
        <div className="image-table form">
          <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>
            Gallery Images List
          </h2>
          <table className="table">
            <thead style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'var(--white)', color: 'var(--smoky-black-2)' }}>
              {images.map((image) => (
                <tr key={image._id}>
                  <td>{image.alt}</td>
                  <td>{image.category}</td>
                  <td>
                    <img src={`/uploads/${image.filename}`} alt={image.alt} width="50" />
                  </td>
                  <td>
                    <FaEdit
                      onClick={() => editImage(image._id)}
                      style={{
                        fontSize: "2rem",
                        cursor: "pointer",
                        color: "var(--yellow-crayola)",
                        marginRight: "1.5rem",
                        marginLeft:"1rem"
                      
                      }}
                      aria-label="Edit"
                    />
                    <FaTrash
                      onClick={() => deleteImage(image._id)}
                      style={{
                        fontSize: "2rem",
                        cursor: "pointer",
                        color: "var(--yellow-crayola)",
                    
                      
                      }}
                      aria-label="Delete"
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
