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

    // Leer la imagen seleccionada y crear una URL de datos
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result); // Establecer la URL de datos como vista previa
    };
    reader.readAsDataURL(imageFile); // Leer el archivo como una URL de datos

    setUserData({
      ...userData,
      profile_picture: imageFile,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateUser(userData);
    // ...
  };

  useEffect(() => {
    getComponent(setUserData, '/user')
      }
    , [])


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Correo electrónico:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3 text-center">
        <label htmlFor="profile_picture" className="form-label">
          Imagen:
        </label>
        <div className="col-md-6 mx-auto">
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            onChange={handleImageChange}
            className="form-control"
            accept="image/*"
            
          />
        </div>
      </div>
      {selectedImage && (
        <div className="col-md-6 mx-auto">
          <h4>Vista previa:</h4>
          <img src={selectedImage} alt="Imagen seleccionada" style={{ maxWidth: '100px' }} />
        </div>
      )}
      <button type="submit" className="btn btn-primary mt-4">
        Guardar cambios
      </button>
    </form>
  );
}

export default EditUserDataForm;