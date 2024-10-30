import { useGetUserDonationStatsQuery } from "@/redux/api/baseApi";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// Register the necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonationStatsChart = () => {
  const email = JSON.parse(localStorage.getItem("user")!).email;
  const {
    data: donationStats,
    error,
    isLoading,
  } = useGetUserDonationStatsQuery(email);

  // State to hold the current label color
  const [labelColor, setLabelColor] = useState("white");

  useEffect(() => {
    // Detect dark mode using prefers-color-scheme
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setLabelColor(darkModeMediaQuery.matches ? "white" : "black");

    // Listen for changes in dark mode preference
    const handleChange = (e) => setLabelColor(e.matches ? "white" : "black");
    darkModeMediaQuery.addEventListener("change", handleChange);

    // Clean up listener on unmount
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading donation stats</div>;

  // Prepare the data for the chart
  const chartData = {
    labels: ["Last Donation", "Min Donation", "Max Donation", "Total Amount"],
    datasets: [
      {
        label: "Donation Stats",
        data: [
          donationStats.lastDonation.amount,
          donationStats.minDonation,
          donationStats.maxDonation,
          donationStats.totalDonationAmount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options with dynamic label color
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: labelColor, // Dynamic label color based on theme
        },
      },
      title: {
        display: true,
        text: "User Donation Statistics",
        color: labelColor, // Dynamic title color based on theme
      },
    },
    scales: {
      x: {
        ticks: {
          color: labelColor, // Dynamic X-axis label color based on theme
        },
      },
      y: {
        ticks: {
          color: labelColor, // Dynamic Y-axis label color based on theme
        },
      },
    },
  };

  return (
    <div className="dark:text-dark-text">
      <h2>Donation Stats Chart</h2>
      <Bar data={chartData} options={options} className="dark:bg-dark_mode" />
    </div>
  );
};

export default DonationStatsChart;
