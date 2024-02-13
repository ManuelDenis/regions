import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';


function Navbars() {

  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand href="/">VreauTeren.ro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    className="custom-toggle-icon"
  >
    <rect width="30" height="30" fill="transparent" />
    <path
      d="M4 7h22M4 15h22M4 23h22"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</Navbar.Toggle>


          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/Maps">Oferte</Nav.Link>
            <Nav.Link href="/AddArea">Vinde</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;