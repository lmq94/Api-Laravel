import React, { useState } from 'react';

function ChangePasswordForm({ setPasswordChangeMessage }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newPassword === confirmPassword) {
            // Aquí puedes enviar la información al servidor y manejar la respuesta
            // Luego, establecer el mensaje de notificación en función de la respuesta del servidor
            // Ejemplo:
            // setPasswordChangeMessage('success'); // o 'error' si la respuesta indica un error
        } else {
            setPasswordChangeMessage('error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Contraseña Actual:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Nueva Contraseña:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
                <label>Confirmar Contraseña:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit">Cambiar Contraseña</button>
        </form>
    );
}

export default ChangePasswordForm;