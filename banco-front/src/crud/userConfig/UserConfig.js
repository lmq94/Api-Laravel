import React, { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import EditUserDataForm from './EditUserDataForm';

function UserConfig() {
    const [activeTab, setActiveTab] = useState(null);
    const [passwordChangeMessage, setPasswordChangeMessage] = useState('');

    return (
        <div>
            <div>
                <button onClick={() => setActiveTab('changePassword')}>Cambiar Contraseña</button>
                <button onClick={() => setActiveTab('editUserData')}>Editar Datos</button>
            </div>

            {activeTab === 'changePassword' && (
                <div>
                    <h2>Cambiar Contraseña</h2>
                    {passwordChangeMessage && (
                        <p style={{ backgroundColor: passwordChangeMessage === 'success' ? 'green' : 'red' }}>
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
                    <h2>Editar Datos de Usuario</h2>
                    <EditUserDataForm />
                </div>
            )}
        </div>
    );
}

export default UserConfig;