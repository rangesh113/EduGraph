import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = () => {
  const [chartData, setChartData] = useState(null); // State for chart data
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Get roll number from sessionStorage
    const rollno = sessionStorage.getItem("rollno");
    console.log("rollno:", rollno);

    // Fetch marks for the logged-in student
    fetch(`http://localhost:3001/stulogin/${rollno}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the entire fetched data
        if (data) {
          const { sem1, sem2, sem3, sem4 } = data;
          const labels = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];
          const averages = [
            sem1 ? (sem1.mark1 + sem1.mark2 + sem1.mark3) / 3 : null,
            sem2 ? (sem2.mark1 + sem2.mark2 + sem2.mark3) / 3 : null,
            sem3 ? (sem3.mark1 + sem3.mark2 + sem3.mark3) / 3 : null,
            sem4 ? (sem4.mark1 + sem4.mark2 + sem4.mark3) / 3 : null,
          ];

          // Check if any average is null and set error if so
          if (averages.includes(null)) {
            setError("No marks found for the student in one or more semesters.");
          } else {
            setChartData({
              labels,
              datasets: [
                {
                  label: `Average Marks for Roll No: ${rollno}`,
                  data: averages,
                  borderColor: "rgba(75,192,192,1)",
                  backgroundColor: "rgba(75,192,192,0.4)",
                  tension: 0.4,
                },
              ],
            });
          }
        } else {
          setError("No marks found for the student.");
        }
      })
      .catch((error) => setError(`Error fetching data: ${error.message}`));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "#ffffff" },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333333",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Semesters",
          color: "#ffffff",
        },
        ticks: { color: "#ffffff" },
        grid: { color: "#444444", borderColor: "#ffffff", drawTicks: true, drawBorder: true },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Average Marks",
          color: "#ffffff",
        },
        ticks: { color: "#ffffff", stepSize: 10 },
        grid: { color: "#444444", borderColor: "#ffffff", drawTicks: true, drawBorder: true },
      },
    },
    layout: {
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
    },
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>; // Display error if any
  if (!chartData) return <p style={{ color: "#ffffff" }}>Loading...</p>; // Show loading message

  return <Line data={chartData} options={options} />;
};

export default LineChart;
