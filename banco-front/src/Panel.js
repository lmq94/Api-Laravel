
import TableItems from "./TableItems.js"
function AdminPanel() {
    return (
        <div>
            <h2>Panel de Administrador</h2>
            <TableItems ruta="/api/cuentas" />
            <TableItems ruta="/api/clientes" />
            <TableItems ruta="/api/usuarios" />
        </div>
    );
}

function UserPanel() {
    return (
        <div>
            <h2>Panel de Usuario Normal</h2>
            <TablaItems ruta="/api/cuentas-usuario" /> {/* Ruta personalizada para cuentas de usuario */}
            {/* Mostrar datos de usuario y cliente */}
        </div>
    );
}