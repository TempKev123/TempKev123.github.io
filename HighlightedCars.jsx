import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cars from '../assets/taladrod-cars.json'
const HighlightedCars = () => {
</*MkID 
29:honda
6: BMW
26 volkswagen
37  toyota
33 MITSUBISHI
36 SUZUKI
34 nissan
32 mazda
65 mg
30 ISUZU
 */
  useEffect(() => {
    console.log(Cars)
  });
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/highlighted">Highlighted Cars</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h2>Dashboard</h2>

      </Container>
    </div>
  );
};

export default HighlightedCars;
