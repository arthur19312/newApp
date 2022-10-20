import { setMockData, stopMock } from "@/service";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Icon, sendMessage, Spacing } from "sugar-design";
import { g60 } from "sugar-design/foundation/variable";
import styles from "./index.module.less";

const OperationIconGroup = ({
  url,
  isEdit,
  mockStatus,
  setIsEdit,
  submitMock,
  onClose,
}: {
  url: string;
  isEdit: boolean;
  mockStatus: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  submitMock: () => void;
  onClose: () => void;
}) => {
  const stopMockFn = () => {
    stopMock({ url })
      .then(() => {
        sendMessage({
          content: "Mock 已关闭",
          type: "info",
        });
      })
      .finally(() => {});
  };

  const [status, setStatus] = useState(!!mockStatus);

  return (
    <Spacing stretched spacing={32}>
      {isEdit ? (
        <Spacing spacing={16}>
          {!isEdit &&
            (status ? (
              <Button
                type="danger"
                rightIcon="substractCircleAlt"
                onClick={() => {
                  stopMockFn();
                  setStatus(!status);
                }}
              >
                停止 Mock
              </Button>
            ) : (
              <Button
                className={styles.startButton}
                type="primary"
                rightIcon="caretRight"
                onClick={() => {
                  submitMock();
                  setStatus(!status);
                }}
              >
                启用 Mock
              </Button>
            ))}
          <Button
            type="primary"
            rightIcon="save"
            onClick={() => {
              submitMock();
              onClose();
            }}
          >
            保存
          </Button>
          <Button type="secondary" rightIcon="close" onClick={onClose}>
            取消
          </Button>
        </Spacing>
      ) : (
        <Button
          type="primary"
          rightIcon="edit"
          onClick={() => {
            setIsEdit(true);
          }}
        >
          编辑
        </Button>
      )}
    </Spacing>
  );
};

export default OperationIconGroup;
