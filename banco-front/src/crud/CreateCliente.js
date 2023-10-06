import React, {useState, useEffect} from "react";
import {AddCliente} from "./Functions";


function CreateCuenta({userRole}) {
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
        <form onSubmit={handleSubmit} className="needs-validation container text-center" noValidate>
            <div className="mb-3">
                <label htmlFor="alias" className="form-label">Alias:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="text"
                        id="alias"
                        name="alias"
                        value={clienteData.alias}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label" >City: </label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={clienteData.city}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="dni" className="form-label"> Dni: </label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="number"
                        id="dni"
                        name="dni"
                        value={clienteData.dni}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="domicilio" className="form-label"> Domicilio: </label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="text"
                        id="domicilio"
                        name="domicilio"
                        value={clienteData.domicilio}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="numero_de_telefono" className="form-label"> Numero de telefono: </label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="number"
                        id="numero_de_telefono"
                        name="numero_de_telefono"
                        value={clienteData.nombre}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
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
            
            
            <button type="submit" className="btn btn-primary">Crear cliente</button>
        </form>
    );



}

export default CreateCuenta;