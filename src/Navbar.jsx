
// import { Link, useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase";
// import { useAuth } from "./Authorisation.jsx";
// import "./Navbar.css";

// function Navbar() {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);

//       // Remove the user's ID from local storage
//       localStorage.removeItem("userId");

//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/" className="navbar-brand">
//         DEV@Deakin
//       </Link>

//       <input
//         type="search"
//         placeholder="Search..."
//         className="search-input"
//       />

//       <div className="navbar-links">
//         <Link to="/post">Post</Link>

//         {!loading &&
//           (user ? (
//             <>
//               <Link to="/pricing">Pricing</Link>

//               <span>{user.displayName || user.email}</span>

//               <button type="button" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Sign Up</Link>
//             </>
//           ))}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useAuth } from "./Authorisation.jsx";
import "./Navbar.css";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Remove stored user ID and JWT
      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      // Return to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        DEV@Deakin
      </Link>

      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="navbar-links">
        <Link to="/post">Post</Link>

        {user ? (
          <>
            <Link to="/pricing">Pricing</Link>

            <span className="navbar-user">
              {user.displayName || user.email}
            </span>

            <button
              type="button"
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;