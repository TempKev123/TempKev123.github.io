import React from 'react';

const HighlightedCarItem = ({ car, removeCar }) => (
  <div className="highlighted-car-item">
    <img src={car.Img300} alt={car.Model} style={{ width: '150px', height: 'auto' }} />
    <h3>{car.NameMMT}</h3>
    <p>Price: {car.Prc} {car.Currency}</p>
    <button onClick={() => removeCar(car.Cid)}>Remove</button>
  </div>
);

export default HighlightedCarItem;
