
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");

    if (name.trim() === "") {
      setError("Please enter your full name.");
      return;
    }

    if (email.trim() === "") {
      setError("Please enter your email.");
      return;
    }

    if (password === "") {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name.trim(),
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name.trim(),
        email: user.email,
        createdAt: serverTimestamp(),
      });

      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Unable to create account. Please try again.");
      }
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSignup}>
        <h1>Create an Account</h1>

        <p>Join the DEV@Deakin community</p>

        <label htmlFor="signup-name">Name</label>
        <input
          id="signup-name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
        />

        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />

        <label htmlFor="signup-confirm-password">
          Confirm password
        </label>
        <input
          id="signup-confirm-password"
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">
          Create Account
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default Signup;