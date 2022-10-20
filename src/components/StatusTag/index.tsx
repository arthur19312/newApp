import { RequestType } from "@/type";
import React from "react";
import { Tag } from "sugar-design";
import { CODE_DESC_MAP } from "./config";
import styles from "./index.module.less";

const StatusTag = ({
  code,
  withDesc = true,
}: {
  code: RequestType["code"];
  withDesc?: boolean;
}) => {
  return (
    // @ts-ignore
    <Tag className={styles.tag} type="light" color="green">
      {code}
      {withDesc ? ` ${CODE_DESC_MAP[code]}` : ""}
    </Tag>
  );
};

export default StatusTag;
