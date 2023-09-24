import {useEffect, useState} from "react";
import {axiosInstance} from "../AxiosConfig";
import Modal from "bootstrap/js/src/modal";


function UserData ({ show, onHide })  {
    const [userData, setUserData] = useState({});
    const [showData, setShowData] = useState(false);




     useEffect(() => {
        axiosInstance.get("/user")
            .then((response) => {
                console.log('Datos actualizados:', response.data);
                setUserData(response.data);

            })
            .catch((error) => {
                console.error('Error al actualizar los datos:', error);
            });
    }, []);

    const toggleData = () => {
        setShowData(!showData);
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={toggleData}>
                Ver Datos
            </button>
            {showData && (
                <div className="user-data-container bg-light p-4">
                    {/* Contenido del contenedor */}
                    <h2 className="mb-3">Datos del Usuario</h2>
                    <p>Nombre: {userData.name}</p>
                    {/* Otros datos del usuario */}
                    <button className="btn btn-danger" onClick={toggleData}>
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserData;

