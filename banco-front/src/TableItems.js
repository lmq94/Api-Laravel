
import React, { useEffect, useState } from 'react';
import axios from './AxiosConfig';
function TableItems({ ruta }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(ruta)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, [ruta]);

    return (
        <div>
            <h2>Datos de la tabla</h2>
            <table className = "table table-bordered table-striped">
                <thead className = "thead-dark">
                {/* Agrega encabezados de tabla aquí */}
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {/* Muestra los datos de cada fila de la tabla aquí */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableItems;






