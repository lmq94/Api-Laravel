
import React, { useEffect, useState } from 'react';
import {axiosInstance, setAuthToken} from '../AxiosConfig';
import Cookies from "js-cookie";
import {DeleteFila, UpdateComponent, UpdateFila} from "./Functions";


function TableItems({ ruta, edicion }) {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});

    let mostrar = ['alias', 'city', 'dni','saldo', 'tipo_de_cuenta', 'moneda', 'name',
        'email','rol'];

    const openEditForm = (rowData) => {
        setIsEditing(true);
        setEditingData(rowData);
    };

    const closeEditForm = () => {
        setIsEditing(false);
        setEditingData({});
    };


    const handleUpdate = (updatedData) => {
        console.log(updatedData);
        UpdateFila(ruta, updatedData);


        // Cierra el formulario de edición
        closeEditForm();
        UpdateComponent(setData, ruta);
    };


    useEffect(() => {
        let token = Cookies.get('api-key');
        setAuthToken(token);
        console.log(ruta);
        axiosInstance.get(ruta)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, [ruta]);

    console.log(data);
    return (
        <div className= "table-responsive">
            <table className="table table-bordered table-striped">
                <thead  className="thead-dark">
                <tr>
                    {data.length > 0 && Object.keys(data[0]).map((key) => (
                        mostrar.includes(key) &&
                        <th key={key}>{key}</th>
                    ))}
                    {edicion &&<th> <h3>Moderacion</h3></th>}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.keys(item).map((key) => (mostrar.includes(key) &&
                            <td key={key}>
                                 {item[key]}
                            </td>
                        ))}

                        {edicion && <td> <button onClick={() => openEditForm(item) } className = "m-1">Editar</button>
                                        <button onClick={() => DeleteFila(ruta,item['id'])&&UpdateComponent(setData, ruta)} className = "m-1">Borrar</button> </td> }
                    </tr>

                ))}
                </tbody>
            </table>

        {isEditing && (

            <div className = "d-flex justify-content-center align-items-center" >
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editingData); }} className = "form-group">
                    {Object.keys(editingData).map((key) => (mostrar.includes(key) &&
                        <div key={key} className="form">
                            <label htmlFor={key} className="form-label ">{key}:</label>
                            <input
                                type="text"
                                id={key}
                                name={key}
                                value={editingData[key]}
                                onChange={(e) => setEditingData({ ...editingData, [key]: e.target.value })}
                                className="form-control form-control-sm"
                            />
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary m-4 ">Guardar</button>
                    <button onClick={closeEditForm} className="btn btn-secondary">Cancelar</button>
                </form>
            </div>
        )}
    </div>
    );
}



export default TableItems;






