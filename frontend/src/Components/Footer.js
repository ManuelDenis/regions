import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="text-light py-5">
      <Container fluid>
        <Row className="justify-content-md-center bg-light-subtle p-5">
          <Col lg='3' className='p-3 text-center'>
            <p>&copy; 2024 VreauTeren.ro<br />All rights reserved.</p>
            <a href="/GDPR" className='custom-link'>GDPR</a>
              <p>Contact<br />
              Prahova, Blejoi<br />
              Tel 0733047417<br />
              Email: office@vreauteren.ro</p>
              </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
