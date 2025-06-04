import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const ManagerDashboard = ({ engineers, assignments }) => {
  // Engineers capacity data for Bar Chart
  const engineerNames = engineers.map((e) => e.name);
  const capacities = engineers.map((e) => e.maxCapacity);

  const capacityData = {
    labels: engineerNames,
    datasets: [
      {
        label: "Max Capacity (%)",
        data: capacities,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const capacityOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  // Calculate left capacity per engineer
  const leftCapacities = engineers.map((engineer) => {
    const engineerAssignments = assignments.filter(
      (a) => a.engineerId._id === engineer._id
    );
    const used = engineerAssignments.reduce(
      (total, a) => total + a.allocationPercentage,
      0
    );
    return engineer.maxCapacity - used;
  });

  const capacityDataleft = {
    labels: engineerNames,
    datasets: [
      {
        label: "Left Capacity (%)",
        data: leftCapacities,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const capacityOptionsleft = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  // Department distribution for Pie Chart
  const departmentCount = engineers.reduce((acc, eng) => {
    acc[eng.department] = (acc[eng.department] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(departmentCount),
    datasets: [
      {
        label: "Engineers by Department",
        data: Object.values(departmentCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Manager Dashboard</h1>

      <div className="row mb-5 ">
        <div className="col-md-6">
          <h4>Engineer Full Capacity</h4>
          <Bar data={capacityData} options={capacityOptions} />
        </div>
        <div className="col-md-6">
          <h4>Engineers Left Capacity</h4>
          <Bar data={capacityDataleft} options={capacityOptionsleft} />
        </div>
        <div className="col-md-4">
          <h4>Engineers Department</h4>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
