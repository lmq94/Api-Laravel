import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginForm({ setIsLoggedInCallback }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
            Cookies.set('token', response.data);
            setIsLoggedInCallback(true);
        } catch (error) {
            console.error('Error:', error);

            console.log('Datos de inicio de sesión:', formData);
        }
    };

        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Iniciar Sesión</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
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