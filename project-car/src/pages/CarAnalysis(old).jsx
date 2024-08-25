import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import carData from '../assets/taladrod-cars.json'; // Adjust the path if necessary
import './CarAnalysis.css'; // Import the CSS file

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const CarAnalysis = () => {
  const [modelData, setModelData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!carData || !carData.Cars) {
      console.error("Car data is not available");
      return;
    }

    const cars = carData.Cars;
    setAllCars(cars);

    const brandMap = {};
    const modelMap = {};

    cars.forEach((car) => {
      const { Model, NameMMT, Prc, Yr, Brand } = car;
      const brand = NameMMT ? NameMMT.split(' ')[0] : ''; // Extract the brand from NameMMT

      if (brand && Model) {
        if (!brandMap[brand]) brandMap[brand] = 0;
        brandMap[brand] += 1;

        if (!modelMap[brand]) modelMap[brand] = {};
        if (!modelMap[brand][Model]) modelMap[brand][Model] = 0;
        modelMap[brand][Model] += 1;
      }
    });

    const formattedModelData = Object.entries(modelMap).map(([brand, models]) => ({
      brand,
      models: Object.entries(models).map(([model, count]) => ({ model, count })),
    }));
    setModelData(formattedModelData);

    const formattedBrandData = Object.entries(brandMap).map(([brand, count]) => ({ brand, count }));
    setBrandData(formattedBrandData);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredCars = allCars.filter(car => {
    const searchText = searchQuery.toLowerCase();
    return (
      (car.NameMMT && car.NameMMT.toLowerCase().includes(searchText)) ||
      (car.Model && car.Model.toLowerCase().includes(searchText)) ||
      (car.Prc && car.Prc.toLowerCase().includes(searchText)) ||
      (car.Yr && car.Yr.toString().toLowerCase().includes(searchText)) ||
      (car.Brand && car.Brand.toLowerCase().includes(searchText))
    );
  });

  const pieChartData = {
    labels: brandData.map((data) => data.brand),
    datasets: [{
      data: brandData.map((data) => data.count),
      backgroundColor: brandData.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 1,
    }],
  };

  const barChartData = {
    labels: modelData.flatMap((item) => item.models.map((model) => model.model)),
    datasets: modelData.map((item) => ({
      label: item.brand,
      data: item.models.map((model) => model.count),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 1,
    })),
  };

  return (
    <div className="car-analysis-wrapper">
      <Container className="car-analysis-container">
        <Row className="my-4 justify-content-center">
          <Col md={12} lg={10} xl={8} className="text-center mb-4">
            <h2>Car Analysis Dashboard</h2>
            <Button href="/" variant="primary" className="mb-3">Back to Dashboard</Button>
          </Col>
        </Row>
        <Row className="my-4 justify-content-center">
          <Col md={12} lg={10} className="chart-container">
            <h3 className="chart-title text-center">Car Distribution by Brand</h3>
            <div className="chart">
              <Pie data={pieChartData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value} cars`;
                      }
                    }
                  }
                }
              }} />
            </div>
          </Col>
        </Row>
        <Row className="my-4 justify-content-center">
          <Col md={12} lg={10} className="chart-container">
            <h3 className="chart-title text-center">Car Models by Brand</h3>
            <div className="chart">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem) => {
                          const label = tooltipItem.dataset.label || '';
                          const value = tooltipItem.raw || 0;
                          return `${label}: ${value} models`;
                        }
                      }
                    },
                    title: {
                      display: true,
                      text: 'Number of Car Models by Brand',
                      font: {
                        size: 16,
                      }
                    }
                  },
                  scales: {
                    x: {
                      stacked: true,
                      title: {
                        display: true,
                        text: 'Car Models',
                        font: {
                          size: 14
                        }
                      }
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Cars',
                        font: {
                          size: 14
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={12} lg={10} className="text-center">
            <h3 className="mb-3">All Cars Details</h3>
            <Form.Control
              type="text"
              placeholder="Search for cars..."
              value={searchQuery}
              onChange={handleSearch}
              className="mb-3"
            />
            <ListGroup>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <ListGroup.Item key={car.Cid}>
                    <h5>{car.NameMMT || 'Unknown Name'}</h5>
                    <p><strong>Model:</strong> {car.Model || 'N/A'}</p>
                    <p><strong>Price:</strong> {car.Prc || 'N/A'}</p>
                    <p><strong>Year:</strong> {car.Yr || 'N/A'}</p>
                    <p><strong>Province:</strong> {car.Province || 'N/A'}</p>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No cars found</ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CarAnalysis;
