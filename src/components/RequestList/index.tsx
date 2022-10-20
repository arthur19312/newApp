import { getQueryList } from "@/service";
import { RequestType } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import { NewTable, Drawer } from "sugar-design";
import MockLoading from "../MockLoading";
import { getDetailDrawerConfig } from "../RequestDetail";
import StatusTag from "../StatusTag";
import styles from "./index.module.less";

const RequestList = () => {
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState<RequestType[]>([]);
  const idRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const getList = () => {
    getQueryList(idRef.current ? { id: idRef.current } : {})
      .then(({ data }) => {
        const list: RequestType[] = (data?.data || []).map(
          (item: RequestType) => {
            return Object.assign({}, item, {
              method: "post",
              code: 200,
              size: "3.1 KB",
              duration: "124 ms",
              time: "16:33 2022-12-10",
            });
          }
        );
        if (!list.length) {
          // clearInterval(intervalRef.current);
        } else {
          setDataList((dataList) => [...dataList, ...list]);
          idRef.current = list[list.length - 1].id;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      getList();
    }, 2000);
  }, []);

  return (
    <div className="table">
      {loading ? (
        <MockLoading />
      ) : (
        <NewTable
          tableAdaptMode="auto"
          rows={dataList}
          headers={headers}
          rowKey="id"
          onRowClick={(row) => {
            //@ts-ignore
            Drawer.open(getDetailDrawerConfig(row));
          }}
        />
      )}
    </div>
  );
};
export default RequestList;

export const headers = [
  {
    title: "url",
    dataIndex: "url",
    key: "url",
    boldText: true,
  },
  {
    title: "method",
    dataIndex: "method",
    key: "method",
    width: 30,
  },
  {
    title: "status code",
    dataIndex: "code",
    key: "code",
    width: 50,
    render: (row: RequestType) => (
      <div className={styles.rowContainer}>
        <StatusTag code={row?.code} />
      </div>
    ),
  },
  {
    title: "size",
    dataIndex: "size",
    key: "size",
    width: 30,
  },
  {
    title: "duration",
    dataIndex: "duration",
    key: "duration",
    width: 30,
  },
  {
    title: "start time",
    dataIndex: "time",
    key: "time",
    width: 100,
  },
];
