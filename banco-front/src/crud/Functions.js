import {axiosInstance, setAuthToken} from "../AxiosConfig";
import Cookies from "js-cookie";


     function UpdateComponent(ruta,  item) {
        console.log(item);
        axiosInstance.patch(`${ruta}/${item.id}`, item, { headers: {
            "Content-Type": "multipart/form-data",
        }})
            .then((response) => {
                console.log('Datos actualizados:', response.data);

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

    function getComponent(setData, ruta){
        axiosInstance.get(ruta)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }

    function UpdateRol(setUserData){
       
        axiosInstance.get("/user")
        .then((response) => {
          console.log('Datos actualizados:', response.data);
          setUserData(response.data.rol);
        })
        .catch((error) => {
          console.error('Error al actualizar los datos:', error);
        });
    }

    function AddUser(item){
        axiosInstance.post("/users", item,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
                console.log('Datos actualizados:', response.data);
                // Realizar cualquier acción adicional después de la actualización
            })
            .catch((error) => {
                console.error('Error al actualizar los datos:', error);
            });


    }

    function AddCuenta(item){
        axiosInstance.post("/cuentas", item)
            .then((response) => {
                console.log('Datos actualizados:', response.data);

            })
            .catch((error) => {
                console.error('Error al actualizar los datos:', error);
            });

    }

    function Logout ({ setIsLoggedInCallback}) {
        axiosInstance.post("/logout")
            .then((response) => {
                console.log('Datos actualizados:', response.data);
                setIsLoggedInCallback(false);
                Cookies.remove("api-key");

            })
            .catch((error) => {
                console.error('Error al actualizar los datos:', error);
            });

           
            

    }

    async function  UpdateUser(item) {
        const data = new FormData();
        data.append('_method', 'PUT'); // Método HTTP PATCH
        data.append('name', item.name);
        data.append('email', item.email);
        data.append('profile_picture', item.profile_picture);

        console.log(item);

        console.log(data);
      
        const response = await axiosInstance.post(`users/${item.id}`, data)                                               
          .then((response) => {
            console.log('Datos actualizados:', response.data);
          })
          .catch((error) => {
            console.error('Error al actualizar los datos:', error);
          });
      }

 



    export {getComponent,UpdateComponent, DeleteFila, AddUser, AddCuenta, UpdateRol, UpdateUser, Logout}