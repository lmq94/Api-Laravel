
import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from "./LoginForm";
import { AdminPanel, UserPanel } from "./crud/Panel.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./templates/Header";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let userRole = "admin";

    return (
        <Router>
            <div className="App">
                <Header />
                <main className="container">
                        <Routes>
                            <Route path="/" element={isLoggedIn ? <AdminPanel /> : <LoginForm setIsLoggedInCallback={setIsLoggedIn} />} />
                            <Route path="/admin" element={isLoggedIn && userRole === 'admin' ? <AdminPanel /> : <LoginForm setIsLoggedInCallback={setIsLoggedIn} />} />
                            <Route path="/user" element={isLoggedIn ? <UserPanel /> : <LoginForm setIsLoggedInCallback={setIsLoggedIn} />} />
                        </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
