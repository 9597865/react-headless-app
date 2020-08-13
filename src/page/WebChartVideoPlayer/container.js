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

  ctx.effect(() => { }, []);

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
    { t: "00:03:27.00", r: 1 },
    { t: "00:03:37.00", r: 5 },
    { t: "00:04:05.00", r: 1 },
    { t: "00:04:15.00", r: 5 },
    { t: "00:05:22.00", r: 1 },
    { t: "00:05:32.00", r: 5 },
    { t: "00:06:07.00", r: 1 },
    { t: "00:06:17.00", r: 5 },
    { t: "00:10:56.00", r: 1 },
    { t: "00:11:06.00", r: 5 },
    { t: "00:12:52.00", r: 1 },
    { t: "00:13:02.00", r: 5 },
    { t: "00:13:24.00", r: 1 },
    { t: "00:13:34.00", r: 5 },
    { t: "00:14:02.00", r: 1 },
    { t: "00:14:12.00", r: 5 },
    { t: "00:14:55.00", r: 1 },
    { t: "00:15:05.00", r: 5 },
    { t: "00:19:22.00", r: 1 },
    { t: "00:19:32.00", r: 5 },
    { t: "00:19:58.00", r: 1 },
    { t: "00:20:08.00", r: 5 },
    { t: "00:22:43.00", r: 1 },
    { t: "00:22:53.00", r: 5 },
    { t: "00:30:11.00", r: 1 },
    { t: "00:30:21.00", r: 5 },
    { t: "00:30:13.00", r: 1 },
    { t: "00:30:23.00", r: 5 },
    { t: "00:31:22.00", r: 1 },
    { t: "00:31:32.00", r: 5 },
    { t: "00:35:23.00", r: 1 },
    { t: "00:35:33.00", r: 5 },
    { t: "00:37:03.00", r: 1 },
    { t: "00:37:13.00", r: 5 },
    { t: "00:37:47.00", r: 1 },
    { t: "00:37:57.00", r: 5 },
    { t: "00:39:03.00", r: 1 },
    { t: "00:39:13.00", r: 5 },
    { t: "00:43:00.00", r: 1 },
    { t: "00:43:10.00", r: 5 },
    { t: "00:45:11.00", r: 1 },
    { t: "00:45:21.00", r: 5 },
    { t: "00:47:16.00", r: 1 },
    { t: "00:47:26.00", r: 5 },
    { t: "00:49:01.00", r: 1 },
    { t: "00:49:11.00", r: 5 },
    { t: "00:52:08.00", r: 1 },
    { t: "00:52:18.00", r: 5 },
    { t: "00:54:18.00", r: 1 },
    { t: "00:54:28.00", r: 5 },
    { t: "00:54:39.00", r: 1 },
    { t: "00:54:49.00", r: 5 },
    { t: "00:56:25.00", r: 1 },
    { t: "00:56:35.00", r: 5 },
    { t: "00:59:12.00", r: 1 },
    { t: "00:59:22.00", r: 5 },
    { t: "01:01:35.00", r: 1 },
    { t: "01:01:45.00", r: 5 },
    { t: "01:04:36.00", r: 1 },
    { t: "01:04:46.00", r: 5 },
    { t: "01:05:03.00", r: 1 },
    { t: "01:05:13.00", r: 5 },
    { t: "01:07:28.00", r: 1 },
    { t: "01:07:38.00", r: 5 },
    { t: "01:08:47.00", r: 1 },
    { t: "01:08:57.00", r: 5 },
    { t: "01:09:34.00", r: 1 },
    { t: "01:09:44.00", r: 5 },
    { t: "01:12:27.00", r: 1 },
    { t: "01:12:37.00", r: 5 },
    { t: "01:14:30.00", r: 1 },
    { t: "01:14:40.00", r: 5 }],
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
    settings: { },
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
