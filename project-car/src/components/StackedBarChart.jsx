import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const StackedBarChart = ({ data }) => {
  const labels = data.flatMap((brand) => brand.models.map((model) => model.model));
  const datasets = data.map((brand) => ({
    label: brand.brand,
    data: brand.models.map((model) => model.value),
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
  }));

  const chartData = {
    labels,
    datasets,
  };

  return <Bar data={chartData} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />;
};

export default StackedBarChart;
