import http from "@/services/http";
import Mock from "mockjs";
import map from "lodash/map";

const URL_SERVER_DATAS = "txcloud/server_list_data";

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

// console.log(mockListData);
// export const getItems = params => mockListData;
