import http from "@/services/http";
import Mock from "mockjs";
import map from "lodash/map";

const URL_SERVER_DATAS = "headless/config";
const URL_SERVER_TIMESNAP = "headless/post";
const URL_SERVER_GET_PERCENT_TIMESNAP = "headless/percent";
const URL_SERVER_GET_DESTORY_TIMESNAP = "headless/destory";
// http://9.134.16.93:8080/headless/post
const mockListData = { data: [], page: { total: 10 } };
const initMockListData = () => {
  const tableData = [];
  for (let i = 0; i < 10; i++) {
    const item = {
      id: Mock.mock("@increment()"),
      name: `crossAE-API-${Mock.mock("@word(4)")}`,
      ip: `192.${Mock.Random.integer(1, 250)}.0.${Mock.Random.integer(1, 250)}`,
      sever_status: "运行中",
      svr_status: "running", // stop, error
      uuid: Mock.mock("@word(8)"),
      os: "centos",
      create_time: `${Mock.Random.date("yyyy-MM-dd")} ${Mock.Random.time()}`, // '20200426 12:45',
      dist_size: `${Mock.Random.integer(10, 250)}G/500G`,
    };
    tableData.push(item);
  }
  return tableData;
};
mockListData.data = initMockListData();

export const getItems = (params) => http.get(URL_SERVER_DATAS, params);
export const postTimeSnap = (params) =>
  http.post(URL_SERVER_TIMESNAP, params, "", params);
export const getTimeSnapPercent = (params) =>
  http.get(URL_SERVER_GET_PERCENT_TIMESNAP, params);
export const destoryTimeSnap = (params) =>
  http.get(URL_SERVER_GET_DESTORY_TIMESNAP, params);
// console.log(mockListData);
// export const getItems = params => mockListData;
