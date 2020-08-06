import React from 'react';
import {
  Typography,
  Button,
  Divider,
} from 'antd';

import {
  FileZipOutlined,
} from '@ant-design/icons';

import styled from 'styled-components';
import { useConcent, emit } from 'concent';
import { MODEL_NAME } from './_model/index';
import marked from 'marked';
import hljs from 'highlight.js';
import loadjs from 'loadjs';
import WebRateVideo from '../comp/picshow/WebRateVideo';

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

  return {
    fetch,
  };
};

const iState = {
  videoUrl: 'http://video.cross.webdev.com/h5/dist/jz.mp4',
  timeRate: [
    { t: '00:03.59', r: 5 },
    { t: '00:25.97', r: 3 },
    { t: '00:33.91', r: 1.5 },
    { t: '00:40.53', r: 5 },
    { t: '00:55.29', r: 1 },
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
      playTitle,
      timeRate,
    },
    settings: {
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

  const webRateVideo = React.createRef();

  const setPlayTitle = title => ctx.setState({ playTitle: title });

  const playAndPause = () => {
    const { current: ref } = webRateVideo;
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
        <WebRateVideo ref={webRateVideo} videoUrl={videoUrl} timeRate={timeRate} ></WebRateVideo>
        <Divider />
        <Title level={4}>组件调用</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(`
              <WebRateVideo videoUrl={videoUrl} timeRate = {timeRate} ></WebRateVideo>
            `),
          }}
        />
        <Title level={4}>传入参数格式</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(`

            videoUrl:'http://video.cross.webdev.com/h5/dist/jz.mp4'
            t:为时间节点
            r:为速率

            timeRate: [
              {t: '00:03.59', r: 5 },
              {t: '00:25.97', r: 3 },
              {t: '00:33.91', r: 1.5 },
              {t: '00:40.53', r: 5 },
              {t: '00:55.29', r: 1 },
            ]
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
