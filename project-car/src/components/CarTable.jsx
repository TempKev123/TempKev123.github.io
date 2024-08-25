import React from 'react';

const CarTable = ({ cars }) => {
  const carDataByBrand = cars.reduce((acc, car) => {
    const { MkID, Model, Prc } = car;
    const brand = acc[MkID] || { models: {}, totalValue: 0 };
    brand.models[Model] = (brand.models[Model] || 0) + 1;
    brand.totalValue += parseInt(Prc.replace(/,/g, ''));
    acc[MkID] = brand;
    return acc;
  }, {});

  return (
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Number of Cars</th>
          <th>Total Value (Baht)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(carDataByBrand).map(([brand, data]) => (
          <React.Fragment key={brand}>
            {Object.entries(data.models).map(([model, count], index) => (
              <tr key={model}>
                {index === 0 && (
                  <td rowSpan={Object.keys(data.models).length}>{brand}</td>
                )}
                <td>{model}</td>
                <td>{count}</td>
                {index === 0 && (
                  <td rowSpan={Object.keys(data.models).length}>
                    {data.totalValue.toLocaleString()}
                  </td>
                )}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;
