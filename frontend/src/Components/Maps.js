import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {MapContainer, TileLayer, Polygon, Popup, Marker, SVGOverlay, Tooltip} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Badge, Button, Card, Col, Container, Form, FormControl, Offcanvas, Row} from "react-bootstrap";
import locationIcon2 from './LocationIcon2.js';

const Maps = () => {
  const [show, setShow] = useState(false);
  const [mapType, setMapType] = useState('openstreetmap'); // Initial map type
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [locations, setLocations] = useState([]);
  const [singleLocation, setSingleLocation] = useState([]);
  const mapRef = useRef(null);
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    axios.get('/api/locations/')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const setAreaOnClick = (clickedArea) => {
    setSingleLocation(clickedArea);
  }

  const getCentroid = (coords) => {
    let latSum = 0, lngSum = 0;
    coords.forEach(([lat, lng]) => {
      latSum += lat;
      lngSum += lng;
    });
    return [latSum / coords.length, lngSum / coords.length];
  };

  const toggleMapType = () => {
    setMapType(prevMapType => (prevMapType === 'google' ? 'openstreetmap' : 'google'));
  }

  return (
    <Container>
      <Row>
        <Col xs={6} lg={3} className="mb-1">
          <Form>
            <Form.Group>
              <Form.Label as='h6'>Filtrează</Form.Label>
              <FormControl
                type="number"
                placeholder="Preț maxim / mp"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <MapContainer
            center={[44.9968, 25.9720]}
            zoom={14}
            whenCreated={mapInstance => { mapRef.current = mapInstance; }}
            style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}
          >
            {mapType === 'google' && (
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={['mt1', 'mt2', 'mt3']}
              />
            )}
            {mapType === 'openstreetmap' && (
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            )}

            {locations.filter(area => maxPrice === '' || area.price <= maxPrice).map((area, index) => (
              <>
                <Polygon
                  key={`polygon-${index}`}
                  positions={area.coordinates}
                  pathOptions={{
                    color: 'white',
                    weight: 1,
                    fillOpacity: 0.6,
                    fillColor: "#0dcaf0"
                  }}
                />

                <Marker
                  key={`marker-${index}`}
                  position={getCentroid(area.coordinates)}
                  icon={locationIcon2}
                >
                  <Tooltip direction="top" offset={[0, 0]} opacity={0.7} permanent>
                    <strong>{area.price}</strong> &euro;/m&sup2;
                  </Tooltip>
                  <Popup>
                    {area.price} &euro;/m&sup2; | <strong>{area.area * area.price} &euro;</strong><br />

                    {area.type} | {area.destination}<br />
                    {area.area} m&sup2;<br />
                    <Badge onClick={() => { setAreaOnClick(area); handleShow() }} className='bg-danger rounded-1'>Detalii</Badge>

                  </Popup>
                </Marker>
              </>
            ))}
          <Button className='bg-info' style={{ position: 'relative', top: '90px', left: '3px', zIndex: 1000 }} onClick={toggleMapType}>{mapType === 'google' ? 'StreetMap' : 'Satellite'}</Button>
          </MapContainer>
        </Col>
      </Row>

      <Offcanvas show={show} onHide={handleClose} className='rounded-end-5 mt-5 bg-success-subtle'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h5>Detalii teren</h5></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card className="text-center border-0">
            <Card.Body>
              <Card.Title><h4 className='text-primary'>{singleLocation.price} &euro;/m&sup2;</h4></Card.Title>
              <Card.Text>
                <h6>{singleLocation.type} | {singleLocation.destination}</h6>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mb-3 text-muted lead shadow-none border-0 rounded-3">{singleLocation.area} m&sup2; / {singleLocation.area * singleLocation.price} &euro;</Card.Footer>
            <Card.Footer className="text-muted lead shadow-none border-0 rounded-4">{singleLocation.description}</Card.Footer>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Maps;
