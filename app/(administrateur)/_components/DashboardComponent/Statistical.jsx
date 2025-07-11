"use client";
import styles from "../../admin.module.css";
import GraphYear from "./GraphYear";
import GraphMonth from "./GraphMonth";
import GraphWeekly from "./GraphWeekly";
import { useState } from "react";
export default function Statistical() {
  const [graphType, setGraphType] = useState("year");
  const renderGraph = () => {
    switch (graphType) {
      case "month":
        return <GraphMonth />;
      case "week":
        return <GraphWeekly />;
      default:
        return <GraphYear />;
    }
  };
  const buttons = [
    { text: "Année", value: "year", ariaLabel: "statistiques de l'année" },
    { text: "Mois", value: "month", ariaLabel: "statistiques du mois" },
    { text: "Semaine", value: "week", ariaLabel: "statistiques de la semaine" },
  ];
  return (
    <article className={styles.statistical} aria-labelledby="statistical-title">
      <h5 id="statistical-title">Statistiques</h5>
      <hr />
      <div className={styles.statisticalButtons}>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => setGraphType(button.value)}
            aria-label={button.ariaLabel}
            className={graphType === button.value ? styles.active : ""}
          >
            {button.text}
          </button>
        ))}
      </div>
      <div className={styles.statisticalGraph}> {renderGraph()}</div>
    </article>
  );
}
