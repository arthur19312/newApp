import { RequestType } from "@/type";
import React, { useMemo, useState } from "react";
import {
  FormInput,
  FormItem,
  FormTextarea,
  NewTabs,
  sendMessage,
} from "sugar-design";
import StatusTag from "../StatusTag";
import MockTemplate from "./MockTemplate";
import styles from "./index.module.less";
import OperationIconGroup from "./OperationIconGroup";
import { createForm, Form } from "@formily/core";
import { FormProvider, Field } from "@formily/react";
import { setMockData } from "@/service";
import { rawToPreview } from "@/tool";

const submitMock = ({
  url,
  form,
  resBody,
}: {
  url: string;
  form: Form;
  resBody: string;
}) => {
  setMockData({ url, resBody: form?.values.responseBody || resBody }).then(
    (data) => {
      sendMessage({
        content: "提交成功！Mock数据将在下次请求时生效！",
        type: "success",
      });
    }
  );
};

const RequestDetail = ({ row }: { row: RequestType }) => {
  const { url, code, reqBody, resBody, mockStatus } = row;
  const [activeTab, setActiveTab] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const form = useMemo(() => createForm(), []);

  const requestContent = (
    <div>
      <MockTemplate
        needEdit={false}
        title="Request Header"
        text={
          <div>{`{
               
          }`}</div>
        }
      />
      <MockTemplate
        needEdit={false}
        title="Request Body"
        text={
          <div>
            <pre>{rawToPreview(reqBody)}</pre>
          </div>
        }
      />
    </div>
  );

  const responseContent = (
    <FormProvider form={form}>
      <div>
        <MockTemplate
          title="Response Code"
          editState={isEdit}
          text={<div className={styles.code}>{row?.code || "-"}</div>}
          form={
            <Field
              name="responseCode"
              decorator={[FormItem]}
              component={[FormInput, { placeholder: code }]}
            />
          }
          setEditState={setIsEdit}
          onSave={() => {}}
        />
        <MockTemplate
          title="Response Header"
          editState={isEdit}
          text={
            <div>{`{
               
          }`}</div>
          }
          form={
            <Field
              name="responseHeader"
              decorator={[FormItem]}
              component={[FormTextarea, { placeholder: "Mock Header" }]}
            />
          }
          setEditState={setIsEdit}
          onSave={() => {}}
        />
        <MockTemplate
          title="Response Body"
          editState={isEdit}
          text={
            <div>
              <pre>{rawToPreview(resBody)}</pre>
            </div>
          }
          form={
            <Field
              name="responseBody"
              decorator={[FormItem]}
              component={[
                FormTextarea,
                { className: styles.wrap, height: 200 },
              ]}
              value={rawToPreview(resBody)}
            />
          }
          setEditState={setIsEdit}
          onSave={() => {}}
        />
        <OperationIconGroup
          url={url}
          isEdit={isEdit}
          mockStatus={mockStatus as number}
          setIsEdit={setIsEdit}
          submitMock={() => {
            submitMock({ url, form, resBody });
          }}
          onClose={() => {
            setIsEdit(false);
            // Drawer.close();
          }}
        />
      </div>
    </FormProvider>
  );

  return (
    <div>
      <div className={styles.detail}>
        <NewTabs
          className={styles.tabs}
          contentClassName={styles.tabsContent}
          noBorder
          contentToNavPadding={32}
          activeId={activeTab}
          tabs={[
            { id: 0, title: "Request", content: requestContent },
            { id: 1, title: "Response", content: responseContent },
          ]}
          onChange={(tabKey) => {
            setActiveTab(tabKey);
          }}
        />
      </div>
    </div>
  );
};

export default RequestDetail;

export const getDetailDrawerConfig = (row: RequestType) => {
  return {
    headerClassName: styles.header,
    contentClassName: styles.content,
    width: 900,
    withFooter: false,
    title: (
      <div>
        {row?.url || "-"}
        <StatusTag code={row?.code} withDesc={true} />
      </div>
    ),
    children: <RequestDetail row={row} />,
  };
};
