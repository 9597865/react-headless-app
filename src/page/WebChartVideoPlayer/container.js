import React from "react";
import { Typography, Button, Divider } from "antd";

import { InstagramOutlined } from "@ant-design/icons";

import styled from "styled-components";
import { useConcent } from "concent";
import { MODEL_NAME } from "./_model/index";

import WebChartVideoPlayer from "../comp/picshow/WebChartVideo.js";
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

  ctx.effect(() => {}, []);

  return {
    fetchPicUrl,
  };
};

const iState = {
  videoUrl: "http://video.cross.webdev.com/h5/dist/jz.mp4",
  videoWidth: 480,
  videoHeight: 360,
  textAreaVideoValue: "",
  timeRate: [
    { t: "00:00:00.00", r: 5 },
    { t: "00:00:06.23", r: 1 },
    { t: "00:00:11.24", r: 1 },
    { t: "00:01:30.26", r: 1 },
    { t: "01:35.27", r: 1 },
    { t: "02:36.11", r: 1 },
    { t: "02:41.12", r: 1 },
    { t: "03:36.08", r: 1 },
    { t: "03:41.09", r: 1 },
    { t: "04:41.26", r: 1 },
    { t: "04:46.27", r: 1 },
    { t: "05:22.26", r: 1 },
    { t: "05:27.27", r: 1 },
    { t: "06:01.29", r: 1 },
    { t: "06:07.00", r: 5 },
    { t: "06:30.20", r: 1 },
    { t: "06:35.21", r: 5 },
    { t: "07:11.14", r: 1 },
    { t: "07:16.15", r: 5 },
  ],
  pageWidth: 375,
  pageHeight: 667,
  isVideoShow: false,
  playTitle: "开始播放",
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
    state: { videoUrl, timeRate, videoWidth, videoHeight },
    settings: {},
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;

  const $refWebRateVideo = React.createRef();

  return (
    <>
      <Wrapper>
        <Title level={2}>数据可视 视频播放器</Title>
        <Paragraph>
          网页转视频功能，可以提供h5转视频服务。转换后可以下载视频，或者png序列帧。
        </Paragraph>
        <Divider />
      </Wrapper>
      <WebChartVideoPlayer
        ref={$refWebRateVideo}
        videoUrl={videoUrl}
        timeRate={timeRate}
        width={videoWidth}
        height={videoHeight}
      />
      <Wrapper>
        <Button
          icon={<InstagramOutlined />}
          type="primary"
          shape="round"
          size={"large"}
          onClick={() => {
            alert("暂时装修中...！");
          }}
        >
          开始-网页转视频
        </Button>
      </Wrapper>
    </>
  );
});
export default WebChartVideoBox;
