
import TableItems from "./TableItems.js"
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
    return (
        <div>
            <h2>Panel de Usuario Normal</h2>

        </div>
    );
}

export { AdminPanel, UserPanel };