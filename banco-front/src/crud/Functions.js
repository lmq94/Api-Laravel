import {axiosInstance} from "../AxiosConfig";
import Cookies from "js-cookie";


     function UpdateComponent(ruta,  item) {
        console.log(item);
        axiosInstance.patch(`${ruta}/${item.id}`, item)
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
            return response.data; 
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

    function AddUser(item, setSuccessMessage, setErrorMessage){
        axiosInstance.post("/users", item,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
                console.log('Datos actualizados:', response.data);
                setSuccessMessage("El usuario se ha creado con éxito");
                setErrorMessage(null); 
            })
            .catch((error) => {
                console.error('Error al actualizar los datos:', error);
                if (error.response && error.response.data && error.response.data.errors) {
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    setErrorMessage(errorMessages.join(", "));
                }
                else{
                setErrorMessage("Error al crear el usuario: " + error.message);
                setSuccessMessage(null); 
                }
            });


    }

    function AddCuenta(item, setSuccessMessage, setErrorMessage){
        axiosInstance.post("/cuentas", item)
            .then((response) => {
                console.log('Datos actualizados:', response.data);
                setSuccessMessage("La cuenta se ha creado con éxito");
                setErrorMessage(null); 

            })
            .catch((error) => {
                console.error('Error al actualizar los datos:', error);
                if (error.response && error.response.data && error.response.data.errors) {
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    setErrorMessage(errorMessages.join(", "));
                }
                else{
                setErrorMessage("Error al crear la cuenta: " + error.message);
                setSuccessMessage(null); 
                }
            });

    }

    function AddCliente(item,  setSuccessMessage, setErrorMessage ){
        axiosInstance.post("/clientes", item)
            .then((response) => {
                console.log('Datos actualizados:', response.data);
                setSuccessMessage("El cliente se ha creado con éxito");
                setErrorMessage(null); 

            })
            .catch((error) => {
                console.error('Error al actualizar los datos:', error);
                if (error.response && error.response.data && error.response.data.errors) {
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    setErrorMessage(errorMessages.join(", "));
                }
                else{
                setErrorMessage("Error al crear el cliente: " + error.message);
                setSuccessMessage(null); 
                }
            });
        };

    

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

    async function  UpdateUser(item, setSuccessMessage, setErrorMessage) {
        const data = new FormData();
        data.append('_method', 'PATCH'); 
        data.append('name', item.name);
        data.append('email', item.email);
        data.append('profile_picture', item.profile_picture);

        console.log(item);

        console.log(data);
      
        const response = await axiosInstance.post(`users/${item.id}`, data)                                               
          .then((response) => {
            console.log('Datos actualizados:', response.data);
            setSuccessMessage("El Usuario se ha Actualizado con éxito");
            setErrorMessage(null); 
        
          })
          .catch((error) => {
            console.error('Error al actualizar los datos:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                setErrorMessage(errorMessages.join(", "));
            }
            else{
            setErrorMessage("Error al actualizar el usuario: " + error.message);
            setSuccessMessage(null); 
            }
        
          });
      }

 



    export {getComponent,UpdateComponent, DeleteFila, AddUser, AddCuenta, AddCliente, UpdateRol, UpdateUser, Logout}