import React, {useEffect, useState} from "react";
import {AddUser} from "./Functions";
import {axiosInstance} from "../AxiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus } from "@fortawesome/free-solid-svg-icons";

function UserRegister() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        rol: "normal",
        id_cliente: "",
        profile_picture: ""

    });



    const [clienteOptions, setClienteOptions] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleClienteChange = (e) => {
        const selectedCliente = e.target.value;
        setUserData({
            ...userData,
            id_cliente: selectedCliente,
        });
    };
    const [selectedImage, setSelectedImage] = useState(null);



    const handleImageChange = (e) => {
            const imageFile = e.target.files[0];
        console.log("Imagen seleccionada:", imageFile);
            setUserData({
                ...userData,
                profile_picture: imageFile,
            });


        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(imageFile);
        }
};


    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        AddUser(userData, setSuccessMessage, setErrorMessage);

        setUserData({
            name: "",
            email: "",
            password: "",
            rol: "normal",
            id_cliente: "",
            profile_picture: ""
        });
    };

    useEffect(() => {
        axiosInstance.get("clientes")
            .then((response) => {
                console.log(response.data);
                setClienteOptions(response.data);

            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, []);

    return (

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <h2 className="text-center mt-3 mb-5">Fomulario de registro de usuario</h2>
            <div className="mb-3 text-center">
                <label htmlFor="name" className="form-label ">Nombre de usuario:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                   />
                </div>
            </div>
            <div className="mb-3 text-center">
                <label htmlFor="email" className="form-label">Correo electrónico:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3 text-center">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3 text-center">
                <label htmlFor ="id_cliente" className="form-label">Cliente:</label>
                <div className ="col-md-6 mx-auto">
                    <select
                        id="id_cliente"
                        name="id_cliente"
                        value={userData.id_cliente}
                        onChange={handleClienteChange}
                        className="form-control"
                        required
                    >
                        <option value="" disabled>
                            Seleccione un cliente
                        </option>
                        {clienteOptions.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.alias}
                            </option>
                        ))}
                    </select>
                    <p className = "mt-2" >Recordar que un cliente solo puede tener 1 solo usuario</p>
                </div>
                <div className="mb-3 text-center">
                    <label htmlFor="profile_picture" className="form-label">Imagen:</label>
                    <div className="col-md-6 mx-auto">
                        <input
                            type="file"
                            id="profile_picture"
                            name="profile_picture"
                            onChange={handleImageChange}
                            className="form-control"
                            accept="image/*"
                            required
                        />
                    </div>
                </div>
                {selectedImage && (
                    <div className="col-md-6 mx-auto">
                        <h2>Vista previa de la imagen:</h2>
                        <img src={selectedImage} alt="Imagen seleccionada" style={{ maxWidth: '100px' }} />
                    </div>

                )}


            </div>
            {successMessage && (
                <div className="alert alert-success mt-3">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-danger mt-3 error-message">
                    {errorMessage}
                </div>
            )}
            <div className="text-center mt-3">
                <button type="submit" className="btn btn-info ms-4"><FontAwesomeIcon icon={faPlus} className="me-2"> </FontAwesomeIcon>Crear Usuario</button>
            </div>

        </form>
    );
}

export default UserRegister;