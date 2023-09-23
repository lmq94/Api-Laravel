import {Link, useNavigate} from "react-router-dom";
import {Logout} from "../crud/Functions";

function Header({ isLoggedIn, setIsLoggedInCallback, userRole } ){

    const navigate = useNavigate();

    const handleLogout = () => {

        Logout ({ setIsLoggedInCallback})

        navigate("/");
    };

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Bienvenidos </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">About</Link>
                    </li>
                    {userRole === "normal" ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-account">
                                Abrir una cuenta
                            </Link>
                        </li>
                    ) : null}
                    {isLoggedIn ?(
                        <li className = "nav-item">
                            <Link className="nav-link" to="/" onClick={() => Logout({ setIsLoggedInCallback })}>
                                Deslogearse
                            </Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Registrarse</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </nav>)
}

export {Header}