import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Polygon, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import locationIcon from './LocationIcon.js';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const AddArea = () => {
    const [mapType, setMapType] = useState('openstreetmap');
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [subRegions, setSubRegions] = useState([]);
    const [selectedSubRegion, setSelectedSubRegion] = useState('');
    const [markers, setMarkers] = useState([]);

    const [phone, setPhone] = useState('');
    const [validationError, setValidationError] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('INTRAVILAN');
    const [destination, setDestination] = useState('CONSTRUCTII');
    const [open, setOpen] = useState('');
    const [description, setDescription] = useState('');
    const [terms, setTerms] = useState(false);

    const handlePhoneNumberChange = (event) => {
    setPhone(event.target.value);
    setValidationError('');
  };

    useEffect(() => {
        getRegions();
        // handleRegionChange();
        // handleSubRegionsChange();
        getSubRegions();
    }, []);
    const getRegions = async () => {
        try {
            const response = await axios.get('/api/region-list/');
            const data = response.data;
            setRegions(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const handleRegionChange = async (value) => {
    setSelectedRegion(value);
    try {
        const response = await axios.get('/api/subregion-list/', { params: { reg: value } });
        setSubRegions(response.data);
    } catch (error) {
    }
};
    const handleSubRegionsChange = (event) => {
    setSelectedSubRegion(event.target.value);
    };
    const getSubRegions = async () => {
        try {
            const response = await axios.get('/api/subregion-list/');
            const data = response.data;

        if (!selectedRegion) {
        setSubRegions([]);
        return;
        }
            setSubRegions(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };


    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const newMarker = [e.latlng.lat, e.latlng.lng];
                setMarkers(markers => [...markers, newMarker]);
            },
        });
        return null;
    };
    const sendCoordinates = () => {
    if (!/^\d{10}$/.test(phone)) {
      setValidationError('Număr invalid!');
      return;
    }
    if (markers.length < 3) {
    alert('Te rugam sa punctezi locatia terenului pe harta!');
    console.error('Adăugați cel puțin un punct pe hartă.');
    return;
    }
    if (!terms) {
    alert('Trebuie sa acceptati termenii si conditiile!');
    console.error('Trebuie să acceptați Termenii și Condițiile.');
    return;
    }
        axios.post('/api/add-area/', { coordinates: markers, region: selectedRegion, subregion: selectedSubRegion, phone, area, price, type, destination, open, terms })
            .then(response => {

                setSelectedRegion('');
                setSelectedSubRegion('');
                setSubRegions([]);

                setMarkers([]);
                setPhone('');
                setArea('');
                setPrice('');
                setType('INTRAVILAN');
                setDestination('CONSTRUCTII');
                setDescription('');
                setOpen('');
                setTerms(false);
                console.log('Coordonatele au fost trimise cu succes:', response.data);
            })
            .catch(error => {
                console.error('A apărut o eroare la trimiterea coordonatelor:', error);
            });
    };
    const resetMarkers = () => {
        setMarkers([]);
    };
    const toggleMapType = () => {
    setMapType(prevMapType => (prevMapType === 'google' ? 'openstreetmap' : 'google'));
  }

    return (
        <Container fluid>
            <Row className='add-area-row p-2 rounded-5'>
                    <h2 className='pt-5 text-center pb-5'>Adauga un anunt</h2>
                <Col lg={6} className='mb-5'>
            <p className='pt-5'>Puncteaza pe harta colturile terenului, se va forma o arie evidentiata a terenului.
                Apoi adauga in formular restul detaliilor<br /><br />
            </p>
            <Button className='button mt-1 mb-2 text-end indigo' onClick={resetMarkers}>Resetare zona</Button>
            <MapContainer center={[44.9968, 25.9720]} zoom={13} style={{ height: '500px', width: '100%'}}>

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

                {markers.map((marker, idx) =>
                    <Marker key={idx} position={marker} icon={locationIcon}></Marker>
                )}
                {markers.length > 2 && <Polygon positions={markers} />}
                <MapClickHandler />
          <Button className='bg-info' style={{ position: 'relative', top: '90px', left: '3px', zIndex: 1000 }} onClick={toggleMapType}>{mapType === 'google' ? 'StreetMap' : 'Satellite'}</Button>
            </MapContainer>
                </Col>

                <Col lg={6} className='p-3 add-area-form rounded-3 mt-4 mb-5'>
                    <Form>
                        <Row className='mt-3'>
                        <Form.Group className="mb-4">
                            <Form.Label>Telefon contact*<br /></Form.Label>
                            <Form.Control
                                className={`pt-2 pb-2 rounded-5 ${validationError ? 'is-invalid custom-invalid' : ''}`}
                                type="text"
                                placeholder="07..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        </Row>
                        <Row className='mb-4'>

                            <Col>
                <Form.Group controlId="regionSelect">
                    <Form.Label>Judetul:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedRegion}
                        onChange={e => handleRegionChange(e.target.value)}
                        >
                        <option value="" disabled>Prahova</option>
                        {regions.map(region => (
                            <option key={region.id} value={region.id}>
                                {region.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                            </Col>


                            <Col>
<Form.Group>
    <Form.Label>Localitate:</Form.Label>
    <Form.Control
        as="select"
        value={selectedSubRegion}
        onChange={handleSubRegionsChange}
        >

        <option value="" disabled>Localitate...</option>

        {subRegions.map(subregion => (
            <option key={subregion.id} value={subregion.id}>
                {subregion.name}
            </option>
        ))}
    </Form.Control>
</Form.Group>
                            </Col>
                        </Row>

                        <Row>


                            <Col>
                        <Form.Group className="mb-4">
                            <Form.Label>Suprafața (mp)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Suprafața totala(mp)"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                            />
                        </Form.Group>
                            </Col>
                            <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Preț/mp(euro)</Form.Label>
                            <Form.Control

                                type="number"
                                placeholder="Preț/mp(euro)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                            </Col>

                        <Form.Group className="mb-1">
                            <Form.Label>Deschidere(metri)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Deschidere..."
                                value={open}
                                onChange={(e) => setOpen(e.target.value)}
                            />
                        </Form.Group>
                        <p className='small'>Deschidere(metri). Se pot adauga mai multe deschideri in functie de configuratia terenului, ex: (25m sosea, 15m drum comunal... )</p>


                        </Row>

                        <Row>
                            <Col>
                        <Form.Group className="mb-4">
                            <Form.Label>Tip</Form.Label>
                            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="INTRAVILAN">Intravilan</option>
                                <option value="EXTRAVILAN">Extravilan</option>
                            </Form.Select>
                        </Form.Group>
                            </Col>
                            <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Destinatie teren</Form.Label>
                            <Form.Select value={destination} onChange={(e) => setDestination(e.target.value)}>
                                <option value="CONSTRUCTII">Constructii</option>
                                <option value="ARABIL">Arabil</option>
                                <option value="FORESTIER">Forestier</option>
                            </Form.Select>
                        </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Descriere</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={7}
                                placeholder="Descriere..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        </Row>
<Row>
  <Form.Group controlId="termsCheckbox" className="mb-3">
    <Form.Check
      type="checkbox"
      label="Am citit și accept Termenii și Condițiile"
      checked={terms}
      onChange={(e) => setTerms(e.target.checked)}
    />
  </Form.Group>
</Row>

                        <Button className='mt-3 mb-5 button indigo' onClick={sendCoordinates}>Trimite</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddArea;
