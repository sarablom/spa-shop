import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StartPage from "./pages/StartPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MassagePage from "./pages/MassagePage";
import OurServicesPage from "./pages/OurServicesPage";
import RehabPage from "./pages/RehabPage";
import RelaxPage from "./pages/RelaxPage";
import TreatmentPage from "./pages/TreatmentPage";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <Wrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/massage" element={<MassagePage />} />
          <Route path="/services" element={<OurServicesPage />} />
          <Route path="/rehab" element={<RehabPage />} />
          <Route path="/relax" element={<RelaxPage />} />
          <Route path="/treatment" element={<TreatmentPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Footer />
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default App;
