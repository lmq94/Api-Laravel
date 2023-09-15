
import React, { useEffect, useState } from 'react';
import {axiosInstance, setAuthToken} from './AxiosConfig';
import Cookies from "js-cookie";
function TableItems({ ruta }) {
    const [data, setData] = useState([]);

    let noMostrar = ["id", "email_verified_at", 'created_at',"updated_at","id_cliente",]

    useEffect(() => {
        let token = Cookies.get('token');
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
        <div>
            <h2>Datos de la tabla</h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                {/* Agrega encabezados de tabla aquí */}
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.keys(item).map((key) => (
                            <td key={key}>
                                {key}: {item[key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableItems;






