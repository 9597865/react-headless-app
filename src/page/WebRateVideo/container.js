import React from 'react';
import {
  message,
  Typography,
  Button,
  Divider,
  Input,
  Select } from 'antd';

import {
  PlayCircleOutlined,
  SettingOutlined,
  FileZipOutlined,
} from '@ant-design/icons';


import styled from 'styled-components';
import { useConcent, emit } from 'concent';
import { MODEL_NAME } from './_model/index';
import marked from 'marked';
import hljs from 'highlight.js';
import loadjs from 'loadjs';
import WebRateVideo from '../comp/picshow/WebRateVideo';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const WrapperImg = styled.div`
  width: 400px;
  height: auto;
  margin-bottom: 16px;
  img{
    width:100%;
  }
`;

loadjs(['./css/monokai_sublime.min.css'], 'web2canvas', {
  async: false,
});

const setup = (ctx) => {
  const { fetch } = ctx.moduleReducer;

  ctx.effect(() => {
  }, []);


  const setRateVideoData = ($refWebRateVideo, $refTaVideoUrl) => {
    try {
      const inputVideoValue = $refWebRateVideo.current.state.value;
      const taValue = JSON.parse($refTaVideoUrl.current.state.value);
      ctx.setState({ videoUrl: inputVideoValue, timeRate: taValue });
      message.success('装载数据成功');
    } catch (error) {
      message.error('JSON 数据结构解释失败');
    }
  };

  const textareaOnChange = (data) => {
    console.log(data);
  };

  return {
    fetch,
    setRateVideoData,
    textareaOnChange,
  };
};

const iState = {
  // videoUrl: 'http://video.cross.webdev.com/h5/dist/jzvideo.mp4',
  videoUrl: 'http://video.cross.webdev.com/h5/dist/jz.mp4',
  videoWidth: 480,
  videoHeight: 360,
  textAreaVideoValue: '',
  timeRate: [
    { t: '00:00.00', r: 5 },
    { t: '00:06.23', r: 1 },
    { t: '00:11.24', r: 5 },
    { t: '01:30.26', r: 1 },
    { t: '01:35.27', r: 5 },
    { t: '02:36.11', r: 1 },
    { t: '02:41.12', r: 5 },
    { t: '03:36.08', r: 1 },
    { t: '03:41.09', r: 5 },
    { t: '04:41.26', r: 1 },
    { t: '04:46.27', r: 5 },
    { t: '05:22.26', r: 1 },
    { t: '05:27.27', r: 5 },
    { t: '06:01.29', r: 1 },
    { t: '06:07.00', r: 5 },
    { t: '06:30.20', r: 1 },
    { t: '06:35.21', r: 5 },
    { t: '07:11.14', r: 1 },
    { t: '07:16.15', r: 5 },
  ],
  pageWidth: 375,
  pageHeight: 667,
  isVideoShow: false,
  playTitle: '开始播放',
};

const WebRateVideoBox = React.memo((props) => {
  const ops = {
    props,
    module: MODEL_NAME,
    setup,
    state: iState,
  };

  const ctx = useConcent(ops);

  const {
    state: {
      videoUrl,
      timeRate,
      videoWidth,
      videoHeight,
    },
    settings: {
      setRateVideoData,
      textareaOnChange,
    },
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight(code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const $refWebRateVideo = React.createRef();
  const $refInputVideoUrl = React.createRef();
  const $refTaVideoUrl = React.createRef();

  const setPlayTitle = title => ctx.setState({ playTitle: title });

  const playAndPause = () => {
    const { current: ref } = $refWebRateVideo;
    ref.isPause() ? ref.play() : ref.pause();
    ref.isPause() ? setPlayTitle('暂停') : setPlayTitle('开始播放');
  };


  return (
    <>
      <Wrapper>
        <Title level={2}>变速-视频播放器</Title>
        <Paragraph>
          网页视频-变速播放器
        </Paragraph>
        <Divider />
        <WebRateVideo
          ref={$refWebRateVideo}
          videoUrl={videoUrl}
          timeRate={timeRate}
          width={videoWidth}
          height={videoHeight} />
        <Wrapper>
          <Title level={4}>视频地址:</Title>
          <Input ref={$refInputVideoUrl} defaultValue={videoUrl} />
        </Wrapper>
        <Wrapper>
          <Title level={4}>变速时间点:</Title>
          <TextArea
            defaultValue={JSON.stringify(timeRate)}
            ref={$refTaVideoUrl}
            onChange={textareaOnChange}
            placeholder=""
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Wrapper>
        <Wrapper>
          <Button
            type="primary"
            shape="round"
            size={'large'}
            onClick={() => {
              setRateVideoData($refInputVideoUrl, $refTaVideoUrl);
            }}
          >
            重新装载数据
          </Button>


        </Wrapper>
        <Divider />
        <Title level={4}>组件调用:</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(`
            <WebRateVideo
            ref={$refWebRateVideo}
            videoUrl={videoUrl}
            timeRate={timeRate}
            width={videoWidth}
            height={videoHeight} />
            `),
          }}
        />
        <Title level={4}>传入参数格式:</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(`

            videoUrl:'http://video.cross.webdev.com/h5/dist/jz.mp4'
            t:为时间节点
            r:为速率

            timeRate: [
              { t: '00:00.00', r: 5 },
              { t: '00:06.23', r: 1 },
              { t: '00:11.24', r: 5 },
              { t: '01:30.26', r: 1 },
              { t: '01:35.27', r: 5 },
              { t: '02:36.11', r: 1 },
              { t: '02:41.12', r: 5 },
              { t: '03:36.08', r: 1 },
              { t: '03:41.09', r: 5 },
              { t: '04:41.26', r: 1 },
              { t: '04:46.27', r: 5 },
              { t: '05:22.26', r: 1 },
              { t: '05:27.27', r: 5 },
              { t: '06:01.29', r: 1 },
              { t: '06:07.00', r: 5 },
              { t: '06:30.20', r: 1 },
              { t: '06:35.21', r: 5 },
              { t: '07:11.14', r: 1 },
              { t: '07:16.15', r: 5 },
            ],
            `),
          }}
        />
        <Paragraph>
          <Text strong>
          </Text>
        </Paragraph>
      </Wrapper>
      {/* <Wrapper>
        <Button
          type="primary"
          shape="round"
          size={'large'}
          onClick={playAndPause}
        >
          {playTitle}
        </Button>
      </Wrapper> */}
    </>
  );
});
export default WebRateVideoBox;
