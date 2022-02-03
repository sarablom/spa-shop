import React from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
