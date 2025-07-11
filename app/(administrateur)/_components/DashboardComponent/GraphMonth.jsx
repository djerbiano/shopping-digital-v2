"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const monthData = [
  { month: "Jan", count: 2000 },
  { month: "Fev", count: 1900 },
  { month: "Mar", count: 2200 },
  { month: "Avr", count: 2500 },
  { month: "Mai", count: 4200 },
  { month: "Juin", count: 3800 },
  { month: "Juil", count: 5000 },
  { month: "Aout", count: 4000 },
  { month: "Sept", count: 3000 },
  { month: "Oct", count: 2000 },
  { month: "Nov", count: 1900 },
  { month: "Dec", count: 2200 },
];

export default function GraphMonth() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: monthData.map((d) => d.month),
        datasets: [
          {
            label: "Chiffre d'affaires",
            data: monthData.map((d) => d.count),
            backgroundColor: [
              "red", "orange", "yellow", "green", "blue", "purple", "pink",
              "brown", "gray", "cyan", "magenta", "teal"
            ],
            borderColor: "white",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Chiffre d'affaires par mois",
          },
        },
      },
    });
  }, []);

  return <canvas ref={canvasRef} />;
}