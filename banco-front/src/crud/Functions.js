import {axiosInstance} from "../AxiosConfig";

     function UpdateFila(ruta,  item) {
        axiosInstance.patch(`${ruta}/${item.id}`, item)
            .then((response) => {
                console.log('Datos actualizados:', response.data);
                // Realizar cualquier acción adicional después de la actualización
            })
            .catch((error) => {
                console.error('Error al actualizar los datos:', error);
            });


    }

   async function DeleteFila(ruta, id) {
        try {
            const response = await axiosInstance.delete(`${ruta}` + "/" + `${id}`);
            return response.data; // Puedes manejar la respuesta según tus necesidades
        } catch (error) {
            throw error;
        }
    }

    function UpdateComponent(setData, ruta){
        axiosInstance.get(ruta)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }

    export {UpdateFila,UpdateComponent, DeleteFila}