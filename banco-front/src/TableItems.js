
import React, { useEffect, useState } from 'react';
import {axiosInstance, setAuthToken} from './AxiosConfig';
import Cookies from "js-cookie";
function TableItems({ ruta }) {
    const [data, setData] = useState([]);

    let noMostrar = ["email_verified_at", 'created_at',"updated_at","id_cliente"];

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
            <h2>Datos de {ruta.split('/')}</h2>
            <table className="table table-bordered table-striped">
                <thead  className="thead-dark">
                <tr>
                    {data.length > 0 && Object.keys(data[0]).map((key) => (
                        !noMostrar.includes(key) &&
                        <th key={key}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.keys(item).map((key) => (!noMostrar.includes(key) &&
                            <td key={key}>
                                 {item[key]}
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






