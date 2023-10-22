# app-banco

En este documento se explicaran cosas importantes a tener en cuenta para usar la app

BASE DE DATOS
    
    Esta app utiliza una base de datos MySQL Dockerizada (Es decir se encuentra adentro de un contenedor Docker), por lo que deberas contar con Docker y Docker composer para usarla, luego haz click derecho sobre el archivo Docker-composer.yml 
    Y elije la opcion "compose up" para poner en funcionamiento el contenedor con la base de datos.
    
    Proximamente se dockerizara toda la aplicacion...

BACKEND

    La parte del servidor se hizo del estilo API con Laravel, un framework de PHP.
    
    La api cuenta con 3 entidades: Cliente, Cuenta y Usuario. Estas entidades estan relacionadas entre se, un cliente puede tener muchas cuentas pero solo un usuario y este ultimo necesita previamente la existencia de un cliente (excepto el administrador,
    el cual solo podras crear uno).
    
    El lado del servidor tiene sus reglas de validacion con la informacion que se quiere ingresar y cuenta con un sistema de seguridad usando un middleware el cual protege a las rutas mediante un token es cual es otra entidad relacionada con
    el usuario (1 a 1), el cual este ultimo debe tener de manera obligatoria para tener una sesion activa poder acceder a la mayoria de las funcionalidades de la app. Para acceder a dicho Token debera logearse con un email y contraseña validad
    
    A continuacion se listaran los endpoint de la API laravel:
    
      endpoint para logearse:
      
    POST ---> DireccionBase/api/login    Se devuelve un token que luego se debera insertar en el header de una peticion a la api para aquellas rutas protegidas por el middleware (setUserFromToken). Tambien devolvera un rol el cual determinara
    El acceso a algunas rutas (que requieren ser administrador) y por ultimo en la request se guardaran los datos del usuario para facilitar algunas funcionalidades tanto del backend como del frontend


  Endpoints que requieren logeo:

    DireccionBase = 127.0.0.1:8000

    GET ---> DireccionBase/api/clientes   Devuelve todos los clientes (aun no requiere logeo, pero en el futuro si)
    
    
    GET --->DireccionBase/api/users/id    Devuelve un usuario con una determinada id
    GET --->DireccionBase/api/clientes/id    Devuelve un cliente con una determinada id
    GET --->DireccionBase/api/cuentas/id   Devuelve una cuenta con una determinada id
    GET --->DireccionBase/api/user   Devuelve el usuario que esta logeado
    GET --->DireccionBase/api/show/nombre-de-imagen    Devuelve por nombre una imagen
    
    POST ---> DireccionBase/api/cuentas Inserta una nueva cuenta (un usuario normal)
    POST ---> DireccionBase/api/logout   Elimina la sesion destruyendo el token
    POST ---> DirreccionBase/api/reset-password  resetea el password de un usuario logeado
    PATCH ---> DireccionBase/api/user/id    Modifica los datos de un usuario a partir de un id
    
    
    endpoint que requieren logeo + rol admin:
      
      POST ---> DireccionBase/api/cliente Inserta un nuevo cliente
      PATCH ---> DireccionBase/api/user/id Modifica los datos de un cliente a partir de un id
      PATCH ---> DireccionBase/api/user/id  Modifica los datos de una cuenta a partir de un id
      DELETE ---> DireccionBase/api/user/id    Borra un usuario a partir de una id
      DELETE ---> DireccionBase/api/cliente/id    Borra un cliente a partir de una id
      DELETE ---> DireccionBase/api/cuenta/id    Borra una cuenta a partir de una id
  

  Endpoint que no requieren logeo:
    
    POST ---> DireccionBase/api/user Inserta una nuevo usuario


  RECORDAR respestar las reglas de validacion cuando quiera insertar o actualizar algo

  Poner el marcha el backend:

  Antes que nada descargar las dependencia necesarias: Descargar PHP (si no lo tenes instalado en tu equipo) y luego el la raiz (del backend) con el comando install composer descargar el gestor de paquetes para PHP

  Luego con el comando "php artisan serve" para iniciar un servidor local de desarrollo para Laravel


Migraciones:

    Una vez se ponga en marcha el contenedor de Docker por primera vez ejecutar las migraciones hacia la base de datos con el comando "php artisan migrate", esto creara las tablas en la base de datos que esta en el contenedor Docker


Establecer ruta hacia el storage:

    Con el comando php artisan storage:link se creara un vinculo hacia el Storage, esto permitira que las fotos guardadas en este directorio sean publicas para que se pueda acceder a ellas desde la web

FRONTEND

El la interfaz para el usuario fue echa con React Js pero quiero aclarar que no pretendo destacarme como Frontend developer, estoy mas enfocado en el backend

El front hecho con React cuenta con un app.js que es el componente principal donde estan las rutas hacia todo el sitio

Una vez que el usuario se registre podra logearse y dependiendo el rol podra tener mas funcionalidades (el admin puede hacer mas cosas). IMPORTANTE el token de logeo se guardara en la cookie del navegador


Solo puedes crear una cuenta admin

El administrador tendra su panel especial y todos los usuarios tendran un panel personal para modificar sus datos

IMPORTANTE

antes de levantar el front instalar npm (Node Package Manager) para descargar dependencias necesarias para REACT JS, luego con el comando "npm start" el front de la aplicacion esta listo
    







