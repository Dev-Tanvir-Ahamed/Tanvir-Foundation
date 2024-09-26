import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useGetUserDonationStatsQuery } from "@/redux/api/baseApi";

// Register the necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonationStatsChart = () => {
  const email = JSON.parse(localStorage.getItem("user")!).email;
  console.log(email);
  const {
    data: donationStats,
    error,
    isLoading,
  } = useGetUserDonationStatsQuery(email);

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

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, 
      },
      title: {
        display: true,
        text: "User Donation Statistics",
      },
    },
  };

  return (
    <div>
      <h2>Donation Stats Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DonationStatsChart;
