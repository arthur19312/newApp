import { getQueryList } from "@/service";
import { RequestType } from "@/type";
import { createForm } from "@formily/core";
import { Field, FormProvider, ObjectField, VoidField } from "@formily/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  NewTable,
  Drawer,
  Spacing,
  FormInput,
  FormItem,
  Provider,
} from "sugar-design";
import MockLoading from "../MockLoading";
import { getDetailDrawerConfig } from "../RequestDetail";
import StatusTag from "../StatusTag";
import styles from "./index.module.less";

const RequestList = () => {
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState<RequestType[]>([]);
  const idRef = useRef(0);
  const form = useMemo(() => createForm(), []);
  const intervalRef = useRef<NodeJS.Timeout>();

  const [update, setUpdate] = useState(false);
  useEffect(() => {
    console.log(update);
    setUpdate(!update);
  }, [form?.values?.url?.length, form?.values?.duration?.length]);

  const mergeFilterData = (list: RequestType[]) => {
    const { url, duration } = form.values;
    const newList = list.filter((i) => {
      let flag = true;
      if (url) {
        flag = i.url.indexOf(url) > -1;
      }
      if (duration) {
        flag = flag && i.duration >= duration;
      }
      return flag;
    });
    return newList;
  };

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
          let newList: RequestType[] = [];
          setDataList((dataList) => {
            newList = [...dataList, ...list];
            return newList;
          });
          idRef.current = list[list.length - 1].id;
          form.setValuesIn("dataList", mergeFilterData(newList));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      getList();
    }, 500);
  }, []);

  const renderHighLight = (str: string, key: string) => {
    return key?.length
      ? str.replace(
          new RegExp(key, "gi"),
          (match) => `<span class=${styles.highlight}>${match}</span>`
        )
      : str;
  };

  const headers = [
    {
      title: "url",
      dataIndex: "url",
      key: "url",
      boldText: true,
      render: (row: RequestType) => (
        <div
          className={styles.rowContainer}
          dangerouslySetInnerHTML={{
            __html: renderHighLight(row.url, form.values.url),
          }}
        />
      ),
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

  return (
    <div className="table">
      {loading ? (
        <MockLoading />
      ) : (
        <div>
          <FormProvider form={form}>
            {/* <Spacing spacing={16} className={styles.filterBox}>
              <ObjectField name="dataList" value={dataList} />
              <VoidField
                name="filter"
                decorator={[FormItem, { layout: "vertical" }]}
              >
                <Field
                  name="url"
                  component={[
                    FormInput,
                    { placeholder: "搜索 url", clearable: true },
                  ]}
                  reactions={[
                    (field) => {
                      console.log(111);
                      form.setValuesIn(
                        "dataList",
                        dataList.filter(
                          (data) => data.url.indexOf(field.value) > -1
                        )
                      );
                    },
                  ]}
                />
                <Field
                  name="duration"
                  component={[
                    FormInput,
                    {
                      className: styles.marginLeft,
                      placeholder: "至少耗时",
                      suffix: <div className={styles.inputSuffix}>ms</div>,
                    },
                  ]}
                  reactions={[
                    (field) => {
                      form.setValuesIn(
                        "dataList",
                        dataList.filter((data) => data.duration >= field.value)
                      );
                    },
                  ]}
                />
              </VoidField>
            </Spacing> */}
            <NewTable
              tableAdaptMode="auto"
              rows={form.values?.dataList}
              headers={headers}
              rowKey="id"
              onRowClick={(row) => {
                //@ts-ignore
                Drawer.open(getDetailDrawerConfig(row));
              }}
            />
          </FormProvider>
        </div>
      )}
    </div>
  );
};
export default RequestList;
