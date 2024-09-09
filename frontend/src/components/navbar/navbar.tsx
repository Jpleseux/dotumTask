import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import './style.css';


function NavBar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home/index">LseuxLink</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item me-4 itens">
                            <Link className="nav-link active" aria-current="page" to="/home/index">
                                <FaHome className="icon" /> Inicio
                            </Link>
                        </li>

                    </ul>
                </div> 
            </div>
        </nav>
    );
}

export default NavBar;
