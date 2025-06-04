import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const EngineerDashboard = ({ assignments }) => {
  const engineerName =
    assignments[0]?.engineerId?.name ||
    JSON.parse(localStorage.getItem("user")).name ||
    "Engineer";
  const maxCapacity = assignments[0]?.engineerId?.maxCapacity;

  // Project-wise allocation
  const barData = {
    labels: assignments?.map((a) => a.projectId?.name || "Unnamed Project"),
    datasets: [
      {
        label: "Allocation (%)",
        data: assignments.map((a) => a.allocationPercentage),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentage",
        },
      },
    },
  };

  // Total used vs available allocation
  const totalUsed = assignments?.reduce((acc, { allocationPercentage }) => {
    return acc + allocationPercentage;
  }, 0);

  const pieData = {
    labels: ["Used Capacity", "Available Capacity"],
    datasets: [
      {
        label: "Engineer Allocation",
        data: [totalUsed, Math.max(0, maxCapacity - totalUsed)],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">👨‍💻 {engineerName}'s Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <h5>📊 Allocation by Project</h5>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="col-md-3 mb-4">
          <h5>⚙️ Total Capacity Usage</h5>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default EngineerDashboard;
