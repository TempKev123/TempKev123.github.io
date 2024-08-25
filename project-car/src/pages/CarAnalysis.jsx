import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table,Navbar, Nav  } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import carData from '../assets/taladrod-cars.json'; // Adjust the path if necessary
import './CarAnalysis.css'; // Import the CSS file

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const CarAnalysis = () => {
  const [modelData, setModelData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log("running")
    if (!carData || !carData.Cars) {
      console.error("Car data is not available");
      return;
    }

    const cars = carData.Cars;

    const brandMap = {};
    const modelMap = {};
    const valueMap = {}; // To store total values in baht

    cars.forEach((car) => {
      const { Model, NameMMT, Prc } = car;
      const brand = NameMMT ? NameMMT.split(' ')[0] : ''; // Extract the brand from NameMMT
     // console.log(brand, Model, Prc);
      // Ensure Value is a number
      const numericValue = parseInt(Prc.replace(/[,*]/g, ''),10);

      if (brand && Model) {
        if (!brandMap[brand]) brandMap[brand] = 0;
        brandMap[brand] += 1;

        if (!modelMap[brand]) modelMap[brand] = [];
        const modelEntry = modelMap[brand].find((item) => item.model === Model);
        if (modelEntry) {
          modelEntry.count += 1;
          modelEntry.value = numericValue; // Ensure the latest value is used
        } else {
          modelMap[brand].push({ model: Model, count: 1, value: numericValue });
        }

        if (!valueMap[brand]) valueMap[brand] = {};
        if (!valueMap[brand][Model]) valueMap[brand][Model] = 0;
        valueMap[brand][Model] += numericValue;
      }
    });

    const formattedModelData = Object.entries(modelMap).map(([brand, models]) => ({
      brand,
      models: models.sort((a, b) => a.model.localeCompare(b.model)),
    }));

    // Prepare table data with models grouped by brand
    const formattedTableData = formattedModelData.map((brandData) => ({
      brand: brandData.brand,
      models: brandData.models.map(model => ({
        ...model,
        totalPrice: (model.count * model.value).toFixed(2) // Ensure proper calculation and format
      })),
    }));
    setTableData(formattedTableData);

    setModelData(formattedModelData);

    const formattedBrandData = Object.entries(brandMap).map(([brand, count]) => ({ brand, count }));

    // Sort brand data by count in ascending order
    formattedBrandData.sort((a, b) => a.count - b.count);

    // Sort model data by brand total count
    formattedModelData.sort((a, b) => {
      const totalA = a.models.reduce((sum, model) => sum + model.count, 0);
      const totalB = b.models.reduce((sum, model) => sum + model.count, 0);
      return totalA - totalB;
    });

    setBrandData(formattedBrandData);

  }, []);

  const pieChartData = {
    labels: brandData.map((data) => data.brand),
    datasets: [{
      data: brandData.map((data) => data.count),
      backgroundColor: brandData.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 1,
    }],
  };
//console.log
  const barChartData = {
    labels: modelData.map((item) => item.brand),
    datasets: modelData.flatMap((item) => {
      return item.models.map((model) => ({
        label: model.model,
        data: modelData.map((data) => {
          const modelData = data.models.find(m => m.model === model.model);
          return modelData ? modelData.count : 0;
        }),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
        borderWidth: 1,
      }));
    }),
  };

  return (
    <div className="car-analysis-wrapper">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/highlighted">Highlighted Cars</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="car-analysis-container">
        <Row className="my-4 justify-content-center">
          <Col md={12} lg={10} xl={8} className="text-center mb-4">
            <h2>Car Analysis Dashboard</h2>
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={12} lg={10} xl={8} className="d-flex justify-content-center">
            <div className="table-wrapper">
              <h3 className="table-title text-center">Car Brands and Models</h3>
              <Table striped bordered hover className="fixed-table">
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Count</th>
                    <th>Total Price (Baht)</th> {/* New column for total price */}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <React.Fragment key={index}>
                      {row.models.map((model, modelIndex) => (
                        <tr key={`${index}-${modelIndex}`}>
                          {modelIndex === 0 && <td rowSpan={row.models.length}>{row.brand}</td>}
                          <td>{model.model}</td>
                          <td>{model.count}</td>
                          <td>{model.totalPrice.toLocaleString('en-TH', { style: 'currency', currency: 'THB' })}</td> {/* Format total price */}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row className="my-4 justify-content-center">
          <Col md={12} lg={10} className="chart-container">
            <h3 className="chart-title text-center">Car by Brands</h3>
            <div className="chart pie-chart">
              <Pie data={pieChartData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      boxWidth: 20,
                      padding: 10,
                      font: {
                        size: 16, // Increased font size for the legend
                      }
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value} cars`;
                      }
                    }
                  },
                  title: {
                    display: true,
                    text: 'Distribution of Cars by Brand',
                    font: {
                      size: 24, // Increased title size
                    }
                  }
                }
              }} />
            </div>
          </Col>
        </Row>
        <Row className="my-4 justify-content-center">
          <Col md={12} lg={10} className="chart-container">
            <h3 className="chart-title text-center">Brand Model Distribution</h3>
            <div className="chart bar-chart">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        boxWidth: 20,
                        padding: 10,
                        font: {
                          size: 16, // Increased font size for the legend
                        }
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem) => {
                          const label = tooltipItem.dataset.label || '';
                          const value = tooltipItem.raw || 0;
                          return `${label}: ${value} cars`;
                        }
                      }
                    },
                    title: {
                      display: true,
                      text: 'Brand Model Distribution',
                      font: {
                        size: 24, // Increased title size
                        weight: 'bold',
                      },
                      padding: {
                        top: 20,
                        bottom: 20,
                      },
                    }
                  },
                  scales: {
                    x: {
                      stacked: true,
                      title: {
                        display: true,
                        text: 'Brands',
                        font: {
                          size: 18,
                        }
                      },
                      ticks: {
                        maxRotation: 45,  // Reduced rotation for better visibility
                        minRotation: 0,
                        autoSkip: false,
                        font: {
                          size: 16, // Increased font size for x-axis labels
                        }
                      },
                      grid: {
                        display: false, // Hides vertical grid lines
                      }
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Counts',
                        font: {
                          size: 18,
                        }
                      },
                      ticks: {
                        stepSize: 20, // Set the step size for the y-axis
                        callback: (value) => `${value}`, // Ensure values are displayed
                        padding: 10,
                        font: {
                          size: 16, // Increased font size for y-axis labels
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CarAnalysis;
