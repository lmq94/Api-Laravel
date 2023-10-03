import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginForm({ setIsLoggedInCallback, setUserRoleCallback}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', formData);
            console.log('Respuesta del servidor:', response.data);


            if (response.status === 200) {

                const expirationTimeInSeconds = 3600;
                const expirationDate = new Date( new Date().getTime() + expirationTimeInSeconds * 1000);

                Cookies.set('api-key', response.data.token,{ expires: expirationDate });

                setIsLoggedInCallback(true);
                setUserRoleCallback(response.data.rol);
            }

        } catch (error) {
            console.error('Error:', error);
            console.log('Datos de inicio de sesión:', formData);
            setError("Usuario o contraseña incorrectos");
        }
    };

        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header container text-center">Iniciar Sesión</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} className = "container text-center">
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Ingresa tu email"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Ingresa tu contraseña"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        {error && <div className="alert alert-danger">{error}</div>}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default LoginForm;