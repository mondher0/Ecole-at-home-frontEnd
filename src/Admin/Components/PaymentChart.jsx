/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const PaymentChart = () => {
  const chartRef = useRef(null);
  Chart.register(ChartDataLabels);

  useEffect(() => {
    if (chartRef.current) {
      const chartData = {
        labels: [
          "Septembre  2022",
          "Octobre  2022",
          "Novembre 2022",
          "Décembre  2022",
        ],
        datasets: [
          {
            label: "Solde globale",
            backgroundColor: ["#0BA5EC"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [100, 100, 100, 100],
            borderSkipped: false,
          },
          {
            label: "Solde professeurs",
            backgroundColor: ["#28D6D8"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [70, 70, 70, 70],
            borderSkipped: false,
          },
          {
            label: "Solde plateforme",
            backgroundColor: ["#7CD4FD"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [30, 30, 30, 30],
            borderSkipped: false,
          },
        ],
      };

      const chartConfig = {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          layout: {
            padding: 8,
          },
          scales: {
            y: {
              beginAtZero: true,
              display: false,
            },
          },
          // barThickness: 32,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              color: "#6B778C",
              align: "center",
              offset: "10px",
              anchor: "end",
              formatter: function (value) {
                return value + " €";
              },
            },
          },
        },
      };

      const existingChart = Chart.getChart(chartRef.current);
      if (existingChart) {
        existingChart.destroy();
      }

      const newChart = new Chart(chartRef.current, chartConfig);

      return () => {
        newChart.destroy();
      };
    }
  }, []);

  return (
    <div className="payment_chart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PaymentChart;
