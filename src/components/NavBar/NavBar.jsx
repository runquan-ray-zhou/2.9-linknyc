import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/form">
        <button>Find</button>
      </Link>
      <Link to="/starred">
        <button>Starred</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
    </nav>
  );
}
