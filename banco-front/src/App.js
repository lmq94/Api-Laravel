
import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginForm from "./LoginForm";
import { AdminPanel, UserPanel } from "./crud/Panel.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Header} from "./templates/Header";
import UserRegister from "./crud/UserRegister";
import CreateCuenta from "./crud/CreateCuenta";
import UserData from "./crud/UserData";
import Footer from "./templates/Footer";

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
                <Header isLoggedIn={isLoggedIn} setIsLoggedInCallback={setIsLoggedIn} userRole={userRole} />
                <main className="container">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isLoggedIn ? (
                                    userRole === 'admin' ? (
                                        <AdminPanel  />
                                    ) : (
                                        <UserPanel />
                                    )
                                ) : (
                                    <LoginForm setIsLoggedInCallback={setIsLoggedIn}
                                               setUserRoleCallback={setUserRole} />
                                )
                            }
                        />

                        <Route path = "/register" element={<UserRegister />} />
                        <Route path = "/create-account" element ={<CreateCuenta/>}/>
                    </Routes>
                </main>
            </div>
            <div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
