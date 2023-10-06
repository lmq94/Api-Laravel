import React, {useState, useEffect} from "react";
import {AddCuenta} from "./Functions";
import {axiosInstance} from "../AxiosConfig";

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
        <form onSubmit={handleSubmit} className="needs-validation container text-center" noValidate>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Cargue un saldo inicial:</label>
                <div className="col-md-6 mx-auto">
                    <input
                        type="number"
                        id="saldo"
                        name="saldo"
                        value={cuentaData.saldo}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Seleccione el tipo de cuenta que desea abrir:</label>
                <div className="col-md-6 mx-auto">
                    <select
                        id="tipo_de_cuenta"
                        name="tipo_de_cuenta"
                        value={cuentaData.tipo_de_cuenta}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="Caja de ahorro">Caja de ahorro</option>
                        <option value="Plazo fijo">Plazo fijo</option>
                        <option value="Cuenta Corriente">Cuenta Corriente</option>

                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Seleccione una moneda:</label>
                <div className="col-md-6 mx-auto">
                    <select
                        id="moneda"
                        name="moneda"
                        value={cuentaData.moneda}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="Peso">Peso</option>
                        <option value="Dolar">Dolar</option>
                        <option value="Euro">Euro</option>
                        <option value="Yen">Yen</option>
                        <option value="yuan">yuan</option>
                    </select>
                </div>
            </div>
            {userRole === "admin" && (<div className="mb-3 text-center">
                <label htmlFor="id_cliente" className="form-label">Cliente:</label>
                <div className="col-md-6 mx-auto">
                    <select
                        id="id_cliente"
                        name="id_cliente"
                        value={cuentaData.id_cliente}
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
            </div> )}   

            {successMessage && (
                <div className="alert alert-success mt-3">
                    {successMessage}
                </div>
            )}

            {/* Mostrar mensaje de error si errorMessage tiene un valor */}
            {errorMessage && (
                <div className="alert alert-danger mt-3 error-message">
                    {errorMessage}
                </div>
            )}
            
            <button type="submit" className="btn btn-primary">Abrir cuenta</button>
        </form>
    );



}

export default CreateCuenta;