import React, {useState} from "react";
import {AddCuenta} from "./Functions";

function CreateCuenta() {
    const [cuentaData, setcuentaData] = useState({
        saldo: "",
        tipo_de_cuenta: "",
        moneda: "",
        id_cliente: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setcuentaData({
            ...cuentaData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cuentaData);
        AddCuenta(cuentaData);
        setcuentaData({
            saldo: "",
            tipo_de_cuenta: "",
            moneda: "",
            id_cliente: ""
        });
    };

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
            <button type="submit" className="btn btn-primary">Abrir cuenta</button>
        </form>
    );



}

export default CreateCuenta;