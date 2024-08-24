import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Cars} from '../assets/taladrod-cars.json'
import PieChart from '../components/PieChart.jsx'

const HighlightedCars = () => {
 const keys={
    "2": "ASTON MARTIN", "3": "AUDI", "4": "BENTLEY", "5": "BENZ", "6": "BMW", "9": "FIAT", "10": "FORD", "11": "JAGUAR", "12": "LAMBORGHINI", "14": "LANDROVER",
    "18": "PEUGEOT", "19": "PORSCHE", "22": "ROVER", "26": "VOLKSWAGEN", "27": "VOLVO", "29": "HONDA", "30": "ISUZU", "31": "LEXUS", "32": "MAZDA", "33": "MITSUBISHI",
    "34": "NISSAN", "35": "SUBARU", "36": "SUZUKI", "37": "TOYOTA", "40": "CHEVROLET", "44": "HYUNDAI", "45": "JEEP", "46": "KIA", "50": "THAI RUNG", "58": "HINO",
    "60": "MINI", "65": "MG", "69": "TESLA", "71": "BYD", "72": "HAVAL", "73": "ORA"
}
const [brandCounts, setBrandCounts] = useState({});


useEffect(() => {

  // Debugging: Log cars and intermediate counts console.log('Cars data:', Cars);

  const counts = Cars.reduce((acc, car) => {
    if (car.MkID) {
      acc[car.MkID] = (acc[car.MkID] || 0) + 1;
    }
    return acc;
  }, {});

  //console.log('Counts:', counts);  Debugging: Log counts
  setBrandCounts(counts);
  const newCounts = Object.fromEntries(
    Object.entries(counts).map(([key, value]) => [keys[key] || key, value])
  );

  setBrandCounts(newCounts);
  //console.log(brandCounts)

}, []); // Only runs once on mount
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
      <table border="1">
      <thead>
        <tr>
          <th rowSpan="2">Cars per brand</th>
          <th>Pie</th>
          <th>Stacked bar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan="2"><ul>
        {Object.entries(brandCounts).map(([brand, count]) => (
          <li key={brand}>{brand}: {count}</li>
        ))}</ul></td>
          <td rowSpan="2">
          <PieChart make ={brandCounts}/>
            
          </td>
          <td rowSpan="2">Cell 3</td>
        </tr>
      </tbody>
    </table>
      
        

      </Container>
    </div>
  );
};

export default HighlightedCars;
