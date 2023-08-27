/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axiosInstance, { baseURl } from "../../utils/utils";

const PaymentChart = ({
  startDate,
  endDate,
  lastFourWeeks,
  lastFourMonths,
  weeks,
  months,
  date,
}) => {
  const chartRef = useRef(null);
  Chart.register(ChartDataLabels);
  useEffect(() => {
    if (chartRef.current) {
      const chartData1 = {
        labels: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"],
        datasets: [
          {
            label: "Solde globale",
            backgroundColor: ["#0BA5EC"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [
              weeks?.firstWeek?.soldeGlobale,
              weeks?.secondWeek?.soldeGlobale,
              weeks?.thirdWeek?.soldeGlobale,
              weeks?.fourthWeek?.soldeGlobale,
            ],
            borderSkipped: false,
          },
          {
            label: "Solde professeurs",
            backgroundColor: ["#28D6D8"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [
              weeks?.firstWeek?.soldeProf,
              weeks?.secondWeek?.soldeProf,
              weeks?.thirdWeek?.soldeProf,
              weeks?.fourthWeek?.soldeProf,
            ],
            borderSkipped: false,
          },
          {
            label: "Solde plateforme",
            backgroundColor: ["#7CD4FD"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [
              weeks?.firstWeek?.soldePlatform,
              weeks?.secondWeek?.soldePlatform,
              weeks?.thirdWeek?.soldePlatform,
              weeks?.fourthWeek?.soldePlatform,
            ],
            borderSkipped: false,
          },
        ],
      };

      const chartData2 = {
        labels: ["Mois 1", "Mois 2", "Mois 3", "Mois 4"],
        datasets: [
          {
            label: "Solde globale",
            backgroundColor: ["#0BA5EC"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [
              months?.firstMonth?.soldeGlobale,
              months?.secondMonth?.soldeGlobale,
              months?.thirdMonth?.soldeGlobale,
              months?.fourthMonth?.soldeGlobale,
            ],
            borderSkipped: false,
          },
          {
            label: "Solde professeurs",
            backgroundColor: ["#28D6D8"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [
              months?.firstMonth?.soldeProf,
              months?.secondMonth?.soldeProf,
              months?.thirdMonth?.soldeProf,
              months?.fourthMonth?.soldeProf,
            ],
            borderSkipped: false,
          },
          {
            label: "Solde plateforme",
            backgroundColor: ["#7CD4FD"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [
              months?.firstMonth?.soldePlatform,
              months?.secondMonth?.soldePlatform,
              months?.thirdMonth?.soldePlatform,
              months?.fourthMonth?.soldePlatform,
            ],
            borderSkipped: false,
          },
        ],
      };
      const dateObject = new Date(startDate);
      const year = dateObject.getUTCFullYear();
      const month = dateObject.getUTCMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month.
      const day = dateObject.getUTCDate();
      const formattedStartDate = `${year}-${month
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      const dateObject2 = new Date(endDate);
      const year2 = dateObject2.getUTCFullYear();
      const month2 = dateObject2.getUTCMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month.
      const day2 = dateObject2.getUTCDate();
      const formattedEndDate = `${year2}-${month2
        .toString()
        .padStart(2, "0")}-${day2.toString().padStart(2, "0")}`;

      const chartData3 = {
        labels: [formattedStartDate + " " + formattedEndDate],
        datasets: [
          {
            label: "Solde globale",
            backgroundColor: ["#0BA5EC"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [date?.soldeGlobale],
            borderSkipped: false,
            barPercentage: 0.2, // Adjust this value to control the width
            categoryPercentage: 0.9, //
          },
          {
            label: "Solde professeurs",
            backgroundColor: ["#28D6D8"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [date?.soldeProf],
            borderSkipped: false,
            barPercentage: 0.2, // Adjust this value to control the width
            categoryPercentage: 0.9, //
          },
          {
            label: "Solde plateforme",
            backgroundColor: ["#7CD4FD"],
            borderColor: ["rgba(255, 255, 255, 0)"],
            borderWidth: 1,
            borderRadius: Number.MAX_VALUE,
            data: [date?.soldePlatform],
            borderSkipped: false,
            barPercentage: 0.2, // Adjust this value to control the width
            categoryPercentage: 0.9, // A
          },
        ],
      };

      const chartConfig = {
        type: "bar",
        options: {
          responsive: true,
          layout: {
            padding: 8,
          },
          scales: {
            y: {
              beginAtZero: true,
              display: true,
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
      if (lastFourWeeks) {
        chartConfig.data = chartData1;
        console.log("1");
      }
      if (lastFourMonths) {
        console.log("2");
        chartConfig.data = chartData2;
      }
      if (!lastFourWeeks && !lastFourMonths && startDate && endDate) {
        console.log("3");
        chartConfig.data = chartData3;
      }

      const existingChart = Chart.getChart(chartRef.current);
      if (existingChart) {
        existingChart.destroy();
      }

      const newChart = new Chart(chartRef.current, chartConfig);

      return () => {
        newChart.destroy();
      };
    }
  }, [lastFourWeeks, lastFourMonths, startDate, endDate]);

  return (
    <div className="payment_chart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PaymentChart;
