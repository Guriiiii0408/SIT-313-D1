
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Banner from "./Banner.jsx";
import AuthorProfile from "./AuthorProfile.jsx";
import Portfolio from "./Portfolio.jsx";
import Gallery from "./Gallery.jsx";
import NewsLetter from "./NewsLetter.jsx";
import FeaturedArticles from "./FeaturedArticles.jsx";
import FeaturedTutorial from "./FeaturedTutorial.jsx";
import Footer from "./Footer.jsx";
import Pricing from "./pages/Pricing.jsx";

import { AuthProvider } from "./Authorisation.jsx";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import NewPost from "./pages/NewPost.jsx";

import "./App.css";

function Home() {
  return (
    <>
      <Banner />
      <AuthorProfile />
      <Portfolio />
      <Gallery />
      <NewsLetter />
      <FeaturedArticles />
      <FeaturedTutorial />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;