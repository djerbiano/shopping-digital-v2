"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const yearData = [
  { year: 2019, count: 20000 },
  { year: 2020, count: 19000 },
  { year: 2021, count: 22000 },
  { year: 2022, count: 25000 },
  { year: 2023, count: 42000 },
  { year: 2024, count: 38000 },
  { year: 2025, count: 50000 },
];

export default function GraphYear() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: yearData.map((d) => d.year),
        datasets: [
          {
            label: "Chiffre d'affaires",
            data: yearData.map((d) => d.count),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }, []);

  return <canvas ref={canvasRef} />;
}
