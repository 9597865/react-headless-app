import React from "react";
import { Typography, Button, Divider } from "antd";

import { InstagramOutlined } from "@ant-design/icons";

import styled from "styled-components";
import { useConcent } from "concent";
import { MODEL_NAME } from "./_model/index";
import WebD3Chart from "../comp/picshow/WebD3Chart.js";
const { Title, Paragraph, Text } = Typography;

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const WrapperImg = styled.div`
  width: 400px;
  height: auto;
  margin-bottom: 16px;
  img {
    width: 100%;
  }
`;

const setup = (ctx) => {
  const { fetch, fetchPicUrl } = ctx.moduleReducer;

  ctx.effect(() => { }, []);

  return {
    fetchPicUrl,
  };
};

const iState = {
  pageWidth: 375,
  pageHeight: 667,
  isVideoShow: false,
};

const WebChartVideoBox = React.memo((props) => {
  const ops = {
    props,
    module: MODEL_NAME,
    setup,
    state: iState,
  };
  const ctx = useConcent(ops);
  const {
    state: { },
    settings: { },
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;

  const $refD3Chart = React.createRef();

  return (
    <>
      <Wrapper>
        <Title level={2}>数据可视 动态柱状图</Title>
        <Paragraph>
        </Paragraph>
        <Divider />
        <WebD3Chart
          ref={$refD3Chart}
        />
      </Wrapper>
    </>
  );
});
export default WebChartVideoBox;
