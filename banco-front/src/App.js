
import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import LoginForm from "./LoginForm";
import { AdminPanel, UserPanel } from "./crud/Panel.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Header} from "./templates/Header";
import UserRegister from "./crud/UserRegister";
import CreateCuenta from "./crud/CreateCuenta";
import CreateCliente from "./crud/CreateCliente"
import Footer from "./templates/Footer";
import UserConfig from "./crud/userConfig/UserConfig";
import Cookies from 'js-cookie';
import {UpdateRol} from "./crud/Functions";
import {setAuthToken} from "./AxiosConfig";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [checkingAuth, setCheckingAuth] = useState(true)

    
   
        const fakeAuthenticationCheck = async () => {
            try {
         
              await new Promise(resolve => setTimeout(resolve, 1000));
          
              const token = Cookies.get('api-key');
              setAuthToken(token);
              console.log(token) 
              if (token) {
                setIsLoggedIn(true);
                console.log(userRole);
                UpdateRol(setUserRole);
                
              
              }
            } catch (error) {
              console.error('Error en la comprobación de autenticación:', error);
            } finally {
              
              setCheckingAuth(false);
            }
          };
          
  
          useEffect(() => {
            fakeAuthenticationCheck();
          }, []);

   

        const handleLogin = (role) => {
            setIsLoggedIn(true);
            setUserRole(role);
        };

        if (checkingAuth) {
        
            return <p>Cargando...</p>;
        }

        return (
            <Router>
                <div className="App">
                    <Header isLoggedIn={isLoggedIn} setIsLoggedInCallback={setIsLoggedIn} userRole={userRole} />
                    <main className="container">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    isLoggedIn ? (
                                        userRole === 'admin' ? (
                                            <AdminPanel />
                                        ) : (
                                            <UserPanel />
                                        )
                                    ) : (
                                        <LoginForm setIsLoggedInCallback={setIsLoggedIn} setUserRoleCallback={setUserRole} />
                                    )
                                }
                            />

                            <Route path = "/register" element = {<UserRegister />} />
                            <Route path ="/create-account" element = {<CreateCuenta userRole={userRole}  />} />
                            <Route path = "/user-config" element = {<UserConfig />} />
                            <Route path = "/create-cliente" element = {<CreateCliente />} />
                            {/* Agrega una redirección para rutas no encontradas */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </div>
                <div>
                    <Footer />
                </div>
            </Router>
        );
}

export default App;
