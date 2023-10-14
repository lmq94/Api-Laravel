import React, { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import EditUserDataForm from './EditUserDataForm';

function UserConfig() {
    const [activeTab, setActiveTab] = useState(null);
    const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  
    return (
        <div className = "text-center d-flex flex-column align-items-center justify-content-center mt-4">
        {/* Título siempre visible */}
        <h2 className = "mb-4">Configuración de usuario</h2>
      
        <div className = "sticky-top bg-white mb-4">
  {/* Contenedor de botones fijado en la parte superior */}
            <div className = "row">
                <div className = "col-12 col-md-6 mb-2">
                    <button onClick = {() => setActiveTab('changePassword')} className = "btn btn-primary  w-100 text-nowrap">Contraseña</button>
                </div>
                    <div className = "col-12 col-md-6 mb-2">
                <button onClick = {() => setActiveTab('editUserData')} className = "btn btn-primary btn-block w-100 text-nowrap">Editar Datos</button>
                </div>
            </div>
        </div>
      
        {/* Contenido dinámico */}
        {activeTab === 'changePassword' && (
          <div>
            <h4>Cambiar Contraseña</h4>
            {passwordChangeMessage && (
              <p style = {{ backgroundColor: passwordChangeMessage === 'success' ? 'green' : 'red' }}>
                {passwordChangeMessage === 'success'
                  ? '¡Contraseña cambiada correctamente!'
                  : 'Error: los datos ingresados no son correctos.'}
              </p>
            )}
            <ChangePasswordForm setPasswordChangeMessage={setPasswordChangeMessage} />
          </div>
        )}
      
        {activeTab === 'editUserData' && (
          <div>
            <h4>Editar Datos de Usuario</h4>
            <EditUserDataForm />
          </div>
        )}
      </div>
      );
    }
    
    export default UserConfig;