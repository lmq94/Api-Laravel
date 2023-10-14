import {useEffect, useState} from "react";
import {axiosInstance, setAuthToken} from "../AxiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCog, faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";



function UserData ({ show, onHide })  {
    const [userData, setUserData] = useState({});
    const [showData, setShowData] = useState(false);


    const image = userData.profile_picture;

    const url = "http://localhost:8000/storage/"


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

    const navigate = useNavigate();

    const navigateToUserConfig = () => {
        navigate('/user-config')
    };

    return (
        <div>
            <button className = "btn btn-primary" onClick = {toggleData}>
                <FontAwesomeIcon icon = {faUser} />
            </button>
            {showData && (
                <div className = "user-data-container bg-light p-4">
                    <div className = "card" style = {{ maxWidth: "300px" }}>
                        <div className = "card-body">
                            <img
                                src = {`${url}${image}`}
                                alt = "Foto de perfil"
                                className = "img-thumbnail"
                                style={{ maxWidth: "100px" }} // Aquí se corrige
                            />
                            <h5 className = "card-title">{userData.name}</h5>
                            <p className = "card-text">Correo electrónico: {userData.email}</p>
                            <button className = "btn btn-primary" onClick = {navigateToUserConfig}>
                                <FontAwesomeIcon icon = {faCog} className = "me-2"/>
                                Configuración
                            </button>
                        </div>
                        <button className = "btn btn-danger" onClick = {toggleData}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default UserData;

