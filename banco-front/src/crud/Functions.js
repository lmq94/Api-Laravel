import {axiosInstance} from "../AxiosConfig";

    async function UpdateFila(ruta, id, item) {


    }

   async function DeleteFila(ruta, id) {
        try {
            const response = await axiosInstance.delete(`${ruta}` + "/" + `${id}`);
            return response.data; // Puedes manejar la respuesta según tus necesidades
        } catch (error) {
            throw error;
        }
    }

    export {UpdateFila, DeleteFila}