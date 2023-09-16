
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
            <TableItems ruta="/api/cuentas-usuario" /> {/* Ruta personalizada para cuentas de usuario */}
            {/* Mostrar datos de usuario y cliente */}
        </div>
    );
}

export { AdminPanel, UserPanel };