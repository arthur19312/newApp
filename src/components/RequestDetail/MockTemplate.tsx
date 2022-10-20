import React, { ReactNode } from "react";
import { Icon } from "sugar-design";
import { b50, g60, y60 } from "@SDVariableJS";
import OperationIconGroup from "./OperationIconGroup";
import styles from "./index.module.less";
import { StartIcon, StopIcon } from "../CustomIcon";

const MockTemplate = ({
  title,
  text,
  form,
  needEdit = true,
  editState,
  setEditState = () => {},
  onSave = () => {},
}: {
  title: string;
  text: ReactNode;
  form?: ReactNode;
  needEdit?: boolean;
  editState?: boolean;
  setEditState?: (editState: boolean) => void;
  onSave?: () => void;
}) => {
  return (
    <div className={styles.info}>
      <div className={styles.infoTitle}>{title}</div>
      <div className={styles.infoContent}>
        {needEdit ? (editState ? form : text) : text}
      </div>
    </div>
  );
};

export default MockTemplate;
