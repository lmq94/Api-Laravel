
import './App.css';
import React from "react";
import LoginForm from "./LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="App">
          <main>
              <LoginForm /> {/* Renderiza el formulario de inicio de sesión aquí */}
          </main>
      </div>
  )
}

export default App;
