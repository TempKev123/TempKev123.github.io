import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa'; // Import the FaStar icon from react-icons
import './CarCard.css'; // Import the CSS file

const CarCard = ({ car, onHighlight, buttonText, isHighlighted }) => {
  return (
    <Card className="car-card h-100"> {/* Add the car-card class */}
      <Card.Img variant="top" src={car.Img300} alt={car.Model} />
      <Card.Body>
        <Card.Title>{car.NameMMT}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> {car.Prc} {car.Currency}<br />
          <strong>Province:</strong> {car.Province}<br />
          <strong>Year:</strong> {car.Yr} {/* Display the year */}
        </Card.Text>
        <Button
          variant={isHighlighted ? "danger" : "primary"} // Change button color based on highlight status
          onClick={() => onHighlight(car)}
        >
          {isHighlighted ? <FaStar /> : null} {/* Add icon if highlighted */}
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
