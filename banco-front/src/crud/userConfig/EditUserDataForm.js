import React, { useState, useEffect } from 'react';
import { UpdateUser, getComponent} from "../Functions";

function EditUserDataForm() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profile_picture: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

   
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
    };
    reader.readAsDataURL(imageFile); 

    setUserData({
      ...userData,
      profile_picture: imageFile,
    });
  };

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateUser(userData, setSuccessMessage, setErrorMessage);
  
  };

  useEffect(() => {
    getComponent(setUserData, '/user')
      }
    , [])


  return (
    <form onSubmit = {handleSubmit}>
        <div className = "mb-3">
          <label htmlFor = "name" className = "form-label">
            Nombre:
          </label>
          <input
            type = "text"
            className = "form-control"
            id = "name"
            name = "name"
            value = {userData.name}
            onChange = {handleInputChange}
          />
        </div>
        <div className = "mb-3">
          <label htmlFor = "email" className = "form-label">
            Correo electrónico:
          </label>
          <input
            type = "email"
            className = "form-control"
            id = "email"
            name = "email"
            value = {userData.email}
            onChange = {handleInputChange}
          />
        </div>
        <div className = "mb-3 text-center">
          <label htmlFor = "profile_picture" className = "form-label">
            Imagen:
          </label>
          <div className = "col-md-12 mx-auto">
            <input
              type = "file"
              id = "profile_picture"
              name = "profile_picture"
              onChange = {handleImageChange}
              className = "form-control"
              accept = "image/*"
              
            />
          </div>
        </div>
        {selectedImage && (
          <div className = "col-md-6 mx-auto">
            <h4>Vista previa:</h4>
            <img src = {selectedImage} alt = "Imagen seleccionada" style = {{ maxWidth: '100px' }} />
          </div>
        )}

        {successMessage && (
                  <div className = "alert alert-success mt-3">
                      {successMessage}
                  </div>
              )}

        {errorMessage && (
                  <div className="alert alert-danger mt-3 error-message">
                      {errorMessage}
                  </div>
              )} 
        <button type = "submit" className = "btn btn-primary mt-4">
          Guardar cambios
        </button>
    </form>
  );
}

export default EditUserDataForm;