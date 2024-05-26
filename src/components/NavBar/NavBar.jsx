import { Link } from "react-router-dom";
import "./NavBar.css"

export default function NavBar() {
    return (
        <nav>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <Link to="/form">
                <button>Search</button>
            </Link>
            <Link to="/history">
                <button>History</button>
            </Link>
            <Link to="/about">
                <button>About</button>
            </Link>
        </nav>
    )
}