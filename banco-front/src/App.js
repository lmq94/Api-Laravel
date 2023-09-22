
import './App.css';
import React, {useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginForm from "./LoginForm";
import { AdminPanel, UserPanel } from "./crud/Panel.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Header} from "./templates/Header";
import UserRegister from "./crud/UserRegister";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const handleLogin = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);
    };


    console.log(isLoggedIn);
    console.log(userRole);



    return (
        <Router>
            <div className="App">
                <Header isLoggedIn={isLoggedIn} setIsLoggedInCallback={setIsLoggedIn} />
                <main className="container">
                    <Routes>
                        {/* Ruta por defecto */}
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
                                    <LoginForm setIsLoggedInCallback={setIsLoggedIn}
                                               setUserRoleCallback={setUserRole} />
                                )
                            }
                        />

                        {/* Ruta para el registro */}
                        <Route path="/register" element={<UserRegister />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
