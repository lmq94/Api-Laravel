import React, {useEffect, useState} from "react";
import {AddUser} from "./Functions";
import {axiosInstance} from "../AxiosConfig";

function UserRegister() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        rol: "",
        id_cliente: ""

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        AddUser(userData);
        // Limpia el formulario después de enviar los datos
        setUserData({
            name: "",
            email: "",
            password: "",
            rol: "normal",
            id_cliente: ""
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
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre de usuario:</label>
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
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
                <label htmlFor="id_cliente" className="form-label">Cliente:</label>
                <div className="col-md-6 mx-auto">
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
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Crear Usuario</button>
        </form>
    );
}

export default UserRegister;