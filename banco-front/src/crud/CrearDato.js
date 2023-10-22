
import React, {useState, useEffect} from "react";
import {AddCliente, AddCuenta, AddUser} from "./Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{} from "@fortawesome/free-solid-svg-icons";
import {faPlus } from "@fortawesome/free-solid-svg-icons";
import {axiosInstance} from "../AxiosConfig" ;



function CreateCuenta({userRole}) {
    const [cuentaData, setcuentaData] = useState({
        saldo: "0",
        tipo_de_cuenta: "Caja de ahorro",
        moneda: "Peso",
        id_cliente: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setcuentaData({
            ...cuentaData,
            [name]: value,
        });
    };


    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cuentaData);
        AddCuenta(cuentaData, setSuccessMessage,setErrorMessage );
        setcuentaData({
            saldo: "",
            tipo_de_cuenta: "",
            moneda: "",
            id_cliente: ""
        });
    };

    const [clienteOptions, setClienteOptions] = useState([]);

    const handleClienteChange = (e) => {
        const selectedCliente = e.target.value;
        setcuentaData({
            ...cuentaData,
            id_cliente: selectedCliente,
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
        <form onSubmit = {handleSubmit} className = "needs-validation container text-center" noValidate>
            <div className = "mb-3">
                <label htmlFor = "name" className = "form-label">Cargue un saldo inicial:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type = "number"
                        id = "saldo"
                        name = "saldo"
                        value = {cuentaData.saldo}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    />
                </div>
            </div>
            <div className = "mb-3">
                <label htmlFor = "email" className = "form-label">Seleccione el tipo de cuenta que desea abrir:</label>
                <div className = "col-md-6 mx-auto">
                    <select
                        id = "tipo_de_cuenta"
                        name = "tipo_de_cuenta"
                        value = {cuentaData.tipo_de_cuenta}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    >
                        <option value = "Caja de ahorro">Caja de ahorro</option>
                        <option value = "Plazo fijo">Plazo fijo</option>
                        <option value = "Cuenta Corriente">Cuenta Corriente</option>

                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor = "email" className = "form-label">Seleccione una moneda:</label>
                <div className = "col-md-6 mx-auto">
                    <select
                        id = "moneda"
                        name = "moneda"
                        value = {cuentaData.moneda}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    >
                        <option value = "Peso">Peso</option>
                        <option value = "Dolar">Dolar</option>
                        <option value = "Euro">Euro</option>
                        <option value = "Yen">Yen</option>
                        <option value = "Yuan">Yuan</option>
                    </select>
                </div>
            </div>
            {userRole === "admin" && (<div className = "mb-3 text-center">
                <label htmlFor = "id_cliente" className = "form-label">Cliente:</label>
                <div className = "col-md-6 mx-auto">
                    <select
                        id = "id_cliente"
                        name = "id_cliente"
                        value = {cuentaData.id_cliente}
                        onChange = {handleClienteChange}
                        className = "form-control"
                        required
                    >
                        <option value = " " disabled>
                            Seleccione un cliente
                        </option>
                        {clienteOptions.map((cliente) => (
                            <option key = {cliente.id} value = {cliente.id}>
                                {cliente.alias}
                            </option>
                        ))}
                    </select>
                </div>
            </div> )}   

            {successMessage && (
                <div className = "alert alert-success mt-3">
                    {successMessage}
                </div>
            )}

            {/* Mostrar mensaje de error si errorMessage tiene un valor */}
            {errorMessage && (
                <div className = "alert alert-danger mt-3 error-message">
                    {errorMessage}
                </div>
            )}
            
            <button type = "submit" className = "btn btn-info ms-4"><FontAwesomeIcon icon = {faPlus} className = "me-2"> </FontAwesomeIcon>Abrir cuenta</button>
        </form>
    );



}


function CreateCliente() {
    const [clienteData, setclienteData] = useState({
        alias: "",
        city: "",
        dni: "",
        domicilio: "",
        numero_de_telefono: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setclienteData({
            ...clienteData,
            [name]: value,
        });
    };

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(clienteData);
        AddCliente(clienteData, setSuccessMessage, setErrorMessage);
        setclienteData({
            alias: "",
            city: "",
            dni: "",
            domicilio: "",
            numero_de_telefono: ""
        });
    };


    return (
        <form onSubmit = {handleSubmit} className = "needs-validation container text-center" noValidate>
            <h2 className = "mt-4">Crear cliente</h2>
            <div className = "mb-3">
                <label htmlFor = "alias" className = "form-label">Alias:</label>
                <div className = "col-md-6 mx-auto">
                    <input
                        type = "text"
                        id = "alias"
                        name = "alias"
                        value = {clienteData.alias}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    />
                </div>
            </div>
            <div className = "mb-3">
                <label htmlFor = "city" className = "form-label" >City: </label>
                <div className = "col-md-6 mx-auto">
                    <input
                        type = "text"
                        id = "city"
                        name = "city"
                        value = {clienteData.city}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    />
                </div>
            </div>
            <div className = "mb-3">
                <label htmlFor = "dni" className = "form-label"> Dni: </label>
                <div className = "col-md-6 mx-auto">
                    <input
                        type = "number"
                        id = "dni"
                        name = "dni"
                        value = {clienteData.dni}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    />
                </div>
            </div>
            <div className = "mb-3">
                <label htmlFor = "domicilio" className = "form-label"> Domicilio: </label>
                <div className = "col-md-6 mx-auto">
                    <input
                        type = "text"
                        id = "domicilio"
                        name = "domicilio"
                        value = {clienteData.domicilio}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    />
                </div>
            </div>
            <div className = "mb-3">
                <label htmlFor = "numero_de_telefono" className = "form-label"> Numero de telefono: </label>
                <div className = "col-md-6 mx-auto">
                    <input
                        type = "number"
                        id = "numero_de_telefono"
                        name = "numero_de_telefono"
                        value = {clienteData.nombre}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    />
                </div>
            </div>
            {successMessage && (
                <div className = "alert alert-success mt-3">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className = "alert alert-danger mt-3 error-message">
                    {errorMessage}
                </div>
            )}
            
            
            <button type = "submit" className = "btn btn-info ms-4"><FontAwesomeIcon icon = {faPlus} className = "me-2"> </FontAwesomeIcon>Crear cliente</button>
        </form>
    );



}


function UserRegister() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        rol: "normal",
        id_cliente: "",
        profile_picture: ""

    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
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

 

    return (

        <form onSubmit = {handleSubmit} className = "needs-validation" noValidate>
            <h2 className = "text-center mt-3 mb-5">Fomulario de registro de usuario</h2>
            <div className = "mb-3 text-center">
                <label htmlFor = "name" className = "form-label ">Nombre de usuario:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type = "text"
                        id = "name"
                        name = "name"
                        placeholder = " Ingrese un nombre de usuario"
                        value = {userData.name}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                   />
                </div>
            </div>
            <div className = "mb-3 text-center">
                <label htmlFor = "email" className = "form-label">Correo electrónico:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type = "email"
                        id = "email"
                        name = "email"
                        placeholder = "Ingrese un email"
                        value = {userData.email}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    />
                </div>
            </div>
            <div className = "mb-3 text-center">
                <label htmlFor = "password" className = "form-label">Contraseña:</label>
                <div className = "col-md-6 mx-auto">
                    <input
                        type = "password"
                        id = "password"
                        name = "password"
                        placeholder = "Ingrese una contraseña"
                        value = {userData.password}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    />
                </div>
            </div>
            <div className = "mb-3 text-center">
                <label htmlFor = "id_cliente" className="form-label">Cliente:</label>
                <div className = "col-md-6 mx-auto">
                    <input
                        type = "number"
                        id = "id_cliente"
                        name = "id_cliente"
                        placeholder = "Ingrese el identificador de su cliente"
                        value = {userData.id_cliente}
                        onChange = {handleChange}
                        className = "form-control"
                        required
                    >
                    
                    </input>
                    <p className = "mt-2" >Recordar que un cliente solo puede tener 1 solo usuario</p>
                </div>
                <div className = "mb-3 text-center">
                    <label htmlFor = "profile_picture" className = "form-label">Imagen:</label>
                    <div className = "col-md-6 mx-auto">
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
                        <h2>Vista previa de la imagen:</h2>
                        <img src = {selectedImage} alt = "Imagen seleccionada" style = {{ maxWidth: '100px' }} />
                    </div>

                )}


            </div>
            {successMessage && (
                <div className = "alert alert-success mt-3">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className = "alert alert-danger mt-3 error-message">
                    {errorMessage}
                </div>
            )}
            <div className = "text-center mt-3">
                <button type = "submit" className = "btn btn-info ms-4"><FontAwesomeIcon icon = {faPlus} className = "me-2"> </FontAwesomeIcon>Crear Usuario</button>
            </div>

        </form>
    );
}



export{CreateCuenta, CreateCliente, UserRegister}