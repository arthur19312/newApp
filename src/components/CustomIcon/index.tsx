import React, { ReactNode } from "react";
import styles from "./index.module.less";

export const IconTemplate = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>{children}</div>
);

export const StartIcon = ({ color }: { color: string }) => (
  <IconTemplate>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 18"
      fill="none"
    >
      <path
        d="M14 7.26795C15.3333 8.03775 15.3333 9.96225 14 10.7321L3.5 16.7942C2.16667 17.564 0.5 16.6018 0.5 15.0622L0.5 2.93782C0.5 1.39822 2.16667 0.435971 3.5 1.20577L14 7.26795Z"
        fill={color}
      />
    </svg>
  </IconTemplate>
);

export const StopIcon = ({ color }: { color: string }) => (
  <IconTemplate>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 19 18"
      fill="none"
    >
      <rect x="12" width="7" height="18" rx="2" fill={color} />
      <rect x="2" width="7" height="18" rx="2" fill={color} />
    </svg>
  </IconTemplate>
);
