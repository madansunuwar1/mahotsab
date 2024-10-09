import React from "react";
import { Card, Row, Col } from "antd";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard = () => {
  // Sample data for the graphs
  const lineData = {
    labels: ["जनवरी", "फेब्रुअरी", "मार्च"], // Add more labels as necessary
    datasets: [
      {
        label: "उत्पादन",
        data: [300, 400, 350],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "productionAxis",
        fill: true,
      },
      {
        label: "बिक्री",
        data: [200, 250, 300],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "salesAxis",
        fill: true,
      },
      {
        label: "स्टक",
        data: [100, 150, 50],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "stockAxis",
        fill: true,
      },
      {
        label: "फोहोर",
        data: [50, 30, 20],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        yAxisID: "wasteAxis",
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      productionAxis: {
        type: "linear",
        position: "left",
      },
      salesAxis: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
      stockAxis: {
        type: "linear",
        position: "left",
      },
      wasteAxis: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="mt-6">
      <Card title="उत्पादन र बिक्री को रेखा ग्राफ" className="mb-6">
        <Row gutter={16}>
          <Col span={24}>
            <Line data={lineData} options={lineOptions} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;
