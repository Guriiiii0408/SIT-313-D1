
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        DEV@Deakin
      </Link>

      <input
        type="search"
        className="nav-search"
        placeholder="Search..."
        aria-label="Search"
      />

      <div className="nav-actions">
        <Link to="/post">Post</Link>

        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
