// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     setError("");

//     if (email.trim() === "") {
//       setError("Please enter your email.");
//       return;
//     }

//     if (password === "") {
//       setError("Please enter your password.");
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(
//         auth,
//         email.trim(),
//         password
//       );

//       navigate("/");
//     } catch (error) {
//       console.log(error);

//       if (
//         error.code === "auth/invalid-credential" ||
//         error.code === "auth/wrong-password" ||
//         error.code === "auth/user-not-found"
//       ) {
//         setError(
//           "Incorrect email or password. Please try again or sign up."
//         );
//       } else if (error.code === "auth/invalid-email") {
//         setError("Please enter a valid email address.");
//       } else if (error.code === "auth/too-many-requests") {
//         setError("Too many attempts. Please try again later.");
//       } else {
//         setError("Unable to log in. Please try again.");
//       }
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setError("");

//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/");
//     } catch (error) {
//       console.log("Google login error:", error);

//       if (error.code === "auth/popup-closed-by-user") {
//         setError("Google sign-in was cancelled.");
//       } else if (error.code === "auth/account-exists-with-different-credential") {
//         setError(
//           "An account already exists with this email. Try your original sign-in method."
//         );
//       } else {
//         setError("Unable to sign in with Google. Please try again.");
//       }
//     }
//   };

//   return (
//     <main className="auth-page">
//       <form className="auth-card" onSubmit={handleLogin}>
//         <h1>Login</h1>

//         <p>Welcome back to DEV@Deakin.</p>

//         <label htmlFor="login-email">Email</label>
//         <input
//           id="login-email"
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           autoComplete="email"
//           required
//         />

//         <label htmlFor="login-password">Password</label>
//         <input
//           id="login-password"
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//           autoComplete="current-password"
//           required
//         />

//         {error && (
//           <p className="auth-error" role="alert">
//             {error}
//           </p>
//         )}

//         <button type="submit">
//           Login
//         </button>

//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           className="google-login-button"
//         >
//           Continue with Google
//         </button>

//         <p>
//           Don't have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </form>
//     </main>
//   );
// }

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (email.trim() === "") {
      setError("Please enter your email.");
      return;
    }

    if (password === "") {
      setError("Please enter your password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Store the Firebase user's unique ID
      localStorage.setItem("userId", userCredential.user.uid);

      // Get and store the Firebase ID token (JWT)
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.log(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError(
          "Incorrect email or password. Please try again or sign up."
        );
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Unable to log in. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Store the Firebase user's unique ID
      localStorage.setItem("userId", result.user.uid);

      // Get and store the Firebase ID token (JWT)
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.log("Google login error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        setError(
          "An account already exists with this email. Try your original sign-in method."
        );
      } else {
        setError("Unable to sign in with Google. Please try again.");
      }
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Login</h1>

        <p>Welcome back to DEV@Deakin.</p>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Login</button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="google-login-button"
        >
          Continue with Google
        </button>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;