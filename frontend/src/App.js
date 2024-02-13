import './App.css';
import {Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./Components/Homepage";
import 'bootstrap/dist/css/bootstrap.css';
import Navbars from "./Components/Navbar";
import Maps from "./Components/Maps";
import Footer from "./Components/Footer";
import AddArea from "./Components/AddArea";
import GDPRText from "./Components/GDPR";
import GDPR from "./Components/GDPR";

function App() {
  return (
    <Container fluid>
        <Row className="justify-content-md-center">
            <Navbars />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/Maps" element={<Maps/> } />
        <Route path="/AddArea" element={<AddArea/> } />
        <Route path="/GDPR" element={<GDPR/> } />
      </Routes>
      </BrowserRouter>
            <Footer />
        </Row>
    </Container>
  );
}

export default App;
