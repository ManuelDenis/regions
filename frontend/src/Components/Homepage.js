import React, { useState } from 'react';
import {Button, Col, Container, Form, Row, Alert, Image} from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

const HomePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationError, setValidationError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setValidationError('');
    setConfirmationMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^\d{10}$/.test(phoneNumber)) {
      setValidationError('Număr invalid!');
      return;
    }

    try {
      const response = await axios.post('/api/add-phone/', {
        phone: phoneNumber,
      });
      console.log(response.data);
      setPhoneNumber('');
      setConfirmationMessage('Numărul de telefon a fost trimis!');

      // Ascunde mesajul de confirmare după 3 secunde
      setTimeout(() => {
        setConfirmationMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting phone number:', error);
    }
  };

  return (
    <Container fluid>
      <Row className='title-row pt-5 pb-5 p-3'>
        <Col lg={7}>
          <h1 className='title pb-5'><strong>Găsirea terenului potrivit<br /> nu a fost niciodată<br /> mai simplă</strong></h1>
          <Button className='title-button m-1' href="/Maps">Oferte vânzare</Button>
          <Button className='title-button m-1' href="/AddArea">Vinde</Button>

          <Form className='mt-5' style={{ maxWidth: '300px' }} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-light'>Sau completează numărul de telefon și te vom contacta noi!</Form.Label>
              <Form.Control
                className={`pt-2 pb-2 rounded-5 ${validationError ? 'is-invalid custom-invalid' : ''}`}
                type="text"
                placeholder="Telefon"
                maxLength="10"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              {validationError && <Form.Control.Feedback type="invalid" className='text-warning'><div className='text-light'>{validationError}</div></Form.Control.Feedback>}
             <Button className='bg-success-subtle border-0 text-dark rounded-5 mt-2' type="submit"> Trimite </Button>
            </Form.Group>
          </Form>

          {confirmationMessage && (
            <Alert
              variant="success"
              className={`confirmation-message border-0 text-light`}
            >
              {confirmationMessage}
            </Alert>
          )}


        </Col>
        <Col lg={5}>
  <Image src="static/media/hsm.png" alt="Background" fluid rounded className="rounded-pill mt-5" />
        </Col>
      </Row>
      <Row className="mt-5">

      </Row>


    </Container>
  );
};

export default HomePage;
