import { getQueryList } from "@/service";
import { RequestType } from "@/type";
import React, { useEffect } from "react";
import { NewTable, Drawer } from "sugar-design";
import { getDetailDrawerConfig } from "../RequestDetail";
import StatusTag from "../StatusTag";
import styles from "./index.module.less";

const MockLoading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="222"
          height="160"
          viewBox="0 0 222 160"
          fill="none"
        >
          <path
            d="M56.1436 24C62.302 13.3333 77.698 13.3333 83.8564 24L125.426 96C131.584 106.667 123.886 120 111.569 120H28.4308C16.114 120 8.41596 106.667 14.5744 96L56.1436 24Z"
            fill="url(#paint0_linear_4_19)"
          />
          <path
            d="M128.144 24C134.302 13.3333 149.698 13.3333 155.856 24L197.426 96C203.584 106.667 195.886 120 183.569 120H100.431C88.114 120 80.416 106.667 86.5744 96L128.144 24Z"
            fill="url(#paint1_linear_4_19)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4_19"
              x1="-10"
              y1="0"
              x2="150"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B6D5EC" stopOpacity="0.52" />
              <stop offset="1" stopColor="#D8E2E9" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_4_19"
              x1="101"
              y1="0"
              x2="222"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7BB8DA" stopOpacity="0.41" />
              <stop offset="1" stopColor="#937ADC" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
export default MockLoading;
