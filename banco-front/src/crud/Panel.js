
import TableItems from "./TableItems.js"
import {setAuthToken} from "../AxiosConfig";
import Cookies from "js-cookie";
function AdminPanel() {
    return (
        <div>
            <h2>Panel de Administrador</h2>
            <TableItems ruta="/cuentas" />
            <TableItems ruta="/clientes" />
            <TableItems ruta="/users"/>
        </div>
    );
}

function UserPanel() {
    setAuthToken(Cookies.get("api-key"));
    return (
        <div>
            <h2>Panel de Usuario Normal</h2>

        </div>
    );
}

export { AdminPanel, UserPanel };