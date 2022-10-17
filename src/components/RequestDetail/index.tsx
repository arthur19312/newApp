import { RequestType } from "@/type";
import React from "react";
import styles from "./index.module.less";

const RequestDetail = ({ row }: { row: RequestType | null }) => {
  return (
    <div>
      <div className="detail">
        <div className="infoTitle">Response Code</div>
        200
        <div className="infoTitle">Response Header</div>
        {`{`}
        {`}`}
        <div className="infoTitle">Response Body</div>
        {}
      </div>
    </div>
  );
};

export default RequestDetail;

export const DetailDrawerConfig = {
  headerClassName: styles.header,
  contentClassName: styles.content,
  size: "lg",
  withFooter: false,
  children: <RequestDetail row={null} />,
  //   onClose: removeParams,
};
