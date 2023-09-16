
import './App.css';
import React, {useState} from "react";
import LoginForm from "./LoginForm";
import { AdminPanel, UserPanel } from "./crud/Panel.js"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    let userRole = "admin";
    return (
          <div className="App">
              <main className="container">
                  <div>
                      {isLoggedIn ? (
                          <div>
                              {userRole === 'admin' ? (
                                  <AdminPanel />
                              ) : (
                                  <UserPanel />
                              )}
                          </div>

                      ) : (
                          // Mostrar el formulario de inicio de sesión si el usuario no está autenticado
                          <LoginForm setIsLoggedInCallback={setIsLoggedIn} />

                      )}
                  </div>
              </main>
          </div>
  )
}

export default App;
