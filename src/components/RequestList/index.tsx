import { RequestType } from "@/type";
import React from "react";
import { NewTable, Drawer } from "sugar-design";
import { DetailDrawerConfig } from "../RequestDetail";

const RequestList = () => {
  const headers = [
    {
      title: "url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "method",
      dataIndex: "method",
      key: "method",
      width: 50,
    },
    {
      title: "status code",
      dataIndex: "code",
      key: "code",
      width: 50,
    },
    {
      title: "size",
      dataIndex: "size",
      key: "size",
      width: 50,
    },
    {
      title: "duration",
      dataIndex: "duration",
      key: "duration",
      width: 50,
    },
    {
      title: "start time",
      dataIndex: "time",
      key: "time",
      width: 100,
    },
  ];

  const data: RequestType[] = [
    {
      id: 432432,
      url: "https://redisdatarecall.csdn.net/recommend/get_head_word",
      method: "post",
      code: 200,
      size: "3.1 KB",
      duration: "124ms",
      time: "16:33 2022-12-10",
    },
  ];

  return (
    <div className="table">
      <NewTable
        tableAdaptMode="auto"
        rows={data}
        headers={headers}
        rowKey="id"
        onRowClick={(row) => {
          //@ts-ignore
          Drawer.open(DetailDrawerConfig);
        }}
      />
    </div>
  );
};
export default RequestList;
