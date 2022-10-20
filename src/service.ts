import axios from "axios";

const AxiosIns = axios.create({
  baseURL: "https://hcm-staging-20.mokahr.com/api/universal/notoken/mock/",
  method: "post",
  params: {
    bus: 20,
  },
  timeout: 100000,
  //@ts-ignore
  //   headers: {
  //     req: "{ userId: USER_ID }",
  //     "Content-Type": "application/json",
  //     withCredentials: true,
  //   },
});

const USER_ID = 28812;

const request = ({
  url,
  data,
  params,
}: {
  url: string;
  data?: unknown;
  params?: unknown;
}) => {
  return AxiosIns({
    url,
    data,
    params,
  });
};

export const getQueryList = ({ id }: { id?: number }) => {
  return request({
    url: "/queryList",
    params: {
      req: JSON.stringify(
        id ? { userId: USER_ID, lastId: id } : { userId: USER_ID }
      ),
    },
  });
};

export const setMockData = ({
  url,
  resBody,
}: {
  url: string;
  resBody: string;
}) => {
  return request({
    url: "/setMockData",
    params: { req: JSON.stringify({ userId: USER_ID, url, resBody }) },
  });
};

export const stopMock = ({ url }: { url: string }) => {
  return request({
    url: "/stopMock",
    params: { req: JSON.stringify({ userId: USER_ID, url }) },
  });
};
