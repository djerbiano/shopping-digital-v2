"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const weekData = [
  { day: "Lundi", count: 50 },
  { day: "Mardi", count: 150 },
  { day: "Mercredi", count: 180 },
  { day: "Jeudi", count: 250 },
  { day: "Vendredi", count: 300 },
  { day: "Samedi", count: 420 },
  { day: "Dimanche", count: 190 },
];

export default function GraphWeekly() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: weekData.map((d) => d.day),
        datasets: [
          {
            label: "Chiffre d'affaires par jour",
            data: weekData.map((d) => d.count),
            backgroundColor: "#00800061",
            borderColor: "green",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return <canvas ref={canvasRef} />;
}
