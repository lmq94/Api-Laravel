import {axiosInstance} from "../AxiosConfig";

function UpdateFila(id, item) {
        // Lógica para editar la fila
        console.log('Editar fila:', item);
    }

   async function DeleteFila(id) {
        // Lógica para editar la fila
        try {
            const response = await axiosInstance.delete(`/ruta${id}`);
            return response.data; // Puedes manejar la respuesta según tus necesidades
        } catch (error) {
            throw error;
        }
    }

    export {UpdateFila, DeleteFila}