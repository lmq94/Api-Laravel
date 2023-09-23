
import TableItems from "./TableItems.js"
import {setAuthToken} from "../AxiosConfig";
import Cookies from "js-cookie";


function AdminPanel() {
    return (
        <div>
            <h2>Cuentas en el banco</h2>
            <TableItems ruta="/cuentas" edicion={true}/>
            <h2>Clientes en el banco</h2>
            <TableItems ruta="/clientes" edicion={true}/>
            <h2>Cuentas registradas en el banco</h2>
            <TableItems ruta="/users" edicion={true}/>
        </div>
    );
}

function UserPanel() {
    setAuthToken(Cookies.get("api-key"));
    return (
        <div>
            <h2>Tus cuentas</h2>

            <TableItems ruta="/clientes-cuentas"  edicion={false}/>

        </div>
    );
}

export { AdminPanel, UserPanel };