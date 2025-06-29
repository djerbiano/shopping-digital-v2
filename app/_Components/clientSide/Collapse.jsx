"use client";
import { useState } from "react";
import styles from "../../page.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

function Collapse({ title, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapseIcone, setCollapseIcone] = useState(false);
  return (
    <div className={styles.collapse}>
      <button
        className={styles.summary}
        aria-expanded={isOpen}
        aria-controls="collapse-content"
        onClick={() => {
          setCollapseIcone(!collapseIcone);
          setIsOpen(!isOpen);
        }}
      >
        {title}
        <span>{collapseIcone ? <FaChevronDown /> : <FaChevronUp />}</span>
      </button>

      <div id="collapse-content" aria-hidden={!isOpen}  className={`${styles.contentWrapper} ${isOpen ? styles.open : ""}`}>
        <div className={styles.content}>
          <div>{data && Object.values(data).map((value, index) => <p key={index}>{value}</p>)}</div>
        </div>
      </div>
    </div>
  );
}

export default Collapse;
