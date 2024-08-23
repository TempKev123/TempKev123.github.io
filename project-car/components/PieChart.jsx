import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ cars }) => {
  if (!cars || !Array.isArray(cars)) {
    console.error("Invalid cars data");
    return null;
  }

  const brandCounts = cars.reduce((acc, car) => {
    if (car.Brand) {
      acc[car.Brand] = (acc[car.Brand] || 0) + 1;
    }
    return acc;
  }, {});

  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  const brandLabels = Object.keys(brandCounts);
  const brandData = Object.values(brandCounts);
  const colors = generateColors(brandLabels.length);

  const data = {
    labels: brandLabels,
    datasets: [{
      data: brandData,
      backgroundColor: colors,
    }]
  };

  return <Pie data={data} />;
};

export default PieChart;
