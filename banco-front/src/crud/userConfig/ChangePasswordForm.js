import React, { useState } from 'react';
import {axiosInstance} from '../../AxiosConfig'


function ChangePasswordForm({ setPasswordChangeMessage }) {
    const [passwords, setPasswords] = useState({
      currentPassword: '',
      newPassword: '',
      profile_picture: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (passwords.newPassword === confirmPassword) {
        console.log(passwords)
        axiosInstance
          .post('/reset-password', passwords)
          .then((response) => {
            console.log('Datos actualizados:', response.data);
            setPasswordChangeMessage('success');
          })
          .catch((error) => {
            console.error('Error al actualizar los datos:', error);
            setPasswordChangeMessage('error');
          });
      }
      else
            setPasswordChangeMessage('error')
    };
  
    return (
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">Contraseña Actual:</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                currentPassword: e.target.value,
              })
            }
            required // Campo requerido
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">Nueva Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                newPassword: e.target.value,
              })
            }
            required // Campo requerido
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required // Campo requerido
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!passwords.currentPassword || !passwords.newPassword || !confirmPassword}>Cambiar Contraseña</button>
      </form>
    );
  }
  
  export default ChangePasswordForm;