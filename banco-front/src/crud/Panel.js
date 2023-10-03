
import TableItems from "./TableItems.js"
import {setAuthToken} from "../AxiosConfig";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function AdminPanel() {

    const navigate = useNavigate();


    const handleCrearCliente = () => {
        // Aquí puedes manejar la lógica para crear un cliente
        console.log('Crear cliente');
      }
      
      function handleCrearUsuario() {
        navigate('/register');
      }
      
      function handleAbrirCuenta() {
        navigate('/create-account');
        
      }


    return (
        <div>
            <h2>Cuentas en el banco</h2>
            <TableItems ruta="/cuentas" edicion={true}/>
            <h2>Clientes en el banco</h2>
            <TableItems ruta="/clientes" edicion={true}/>
            <h2>Usuarios en el banco</h2>
            <TableItems ruta="/users" edicion={true}/>

            <div style={{ marginTop: '20px' }}>
                <button className="btn btn-info ms-4" onClick={handleCrearCliente}>Crear Cliente</button>
                <button className="btn btn-info ms-4" onClick={handleCrearUsuario}>Crear Usuario</button>
                <button className="btn btn-info ms-4" onClick={handleAbrirCuenta}>Abrir Cuenta</button>
            </div>
    </div>
  );
        
    
}

function UserPanel() {
    setAuthToken(Cookies.get("api-key"));
    return (
        <div>
            <h2>Tus cuentas</h2>

            <TableItems ruta="/clientes-cuentas"  edicion={false}/>

            <p>Recuerda que si quieres dar de baja o modificar algunos datos de tu cuenta debes comunicarte con el administrador</p>
        </div>

        
    );
}

export { AdminPanel, UserPanel };