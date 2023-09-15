
import './App.css';
import React, {useState} from "react";
import LoginForm from "./LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
      return (
          <div className="App">
              <main>
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
