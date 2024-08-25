import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav,} from 'react-bootstrap';
import CarCard from '../components/CarCard';
import carData from '../assets/taladrod-cars.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(storedCars);
  }, []);

  const handleRemove = (car) => {
    const updatedCars = highlightedCars.filter((c) => c.Cid !== car.Cid);
    setHighlightedCars(updatedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedCars));
  };

  useEffect(() => {
    const carsList = carData.Cars;
    setCars(carsList);
    const storedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(storedCars);
  }, []);

  const handleHighlight = (car) => {
    const storedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    const isCarHighlighted = storedCars.some((c) => c.Cid === car.Cid);

    if (!isCarHighlighted) {
      const updatedCars = [...storedCars, car];
      localStorage.setItem('highlightedCars', JSON.stringify(updatedCars));
      setHighlightedCars(updatedCars);
    }
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/highlighted">Highlighted Cars</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row className="my-4">
          <Col md={12}>
            <h2>Highlighted Cars</h2>
            <Row xs={1} md={3} className="g-4">
              {highlightedCars.length === 0 ? (
                <Col>
                  <p>No highlighted cars available.</p>
                </Col>
              ) : (
                highlightedCars.map((car) => (
                  <Col key={car.Cid}>
                    <CarCard
                      car={car}
                      onHighlight={handleRemove}
                      buttonText="Remove"
                      isHighlighted={true}
                    />
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>


      <Row className="my-4">
        <Col md={12}>
          <h2>Cars Overview</h2>
          <Row xs={1} md={3} className="g-4">
            {cars.map((car) => (
              <Col key={car.Cid}>
                <CarCard
                  car={car}
                  onHighlight={handleHighlight}
                  buttonText={highlightedCars.some((c) => c.Cid === car.Cid) ? 'Highlighted' : 'Highlight'}
                  isHighlighted={highlightedCars.some((c) => c.Cid === car.Cid)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
