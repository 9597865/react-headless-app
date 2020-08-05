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
  pageWidth: 375,
  pageHeight: 667,
  isVideoShow: false,
};

const WebRateVideoBox = React.memo((props) => {
  const ops = {
    props,
    module: MODEL_NAME,
    setup,
    state: iState,
  };
  const ctx = useConcent(ops);
  const { state: { videoUrl },
    settings: {
    },
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;

  const webRateVideo = React.createRef();

  return (
    <>
      <Wrapper>
        <Title level={2}>变速-视频播放器</Title>
        <Paragraph>
          网页视频-变速播放器
        </Paragraph>
        <Divider />
      </Wrapper>
      <WebRateVideo ref={webRateVideo} videoUrl={videoUrl} ></WebRateVideo>
      <Wrapper>
        <Button
          icon={<FileZipOutlined />}
          type="primary"
          shape="round"
          size={'large'}
          onClick={() => {
            if (webRateVideo.current.isPause()) {
              webRateVideo.current.play();
            } else {
              webRateVideo.current.pause();
            }
          }}
        >
          {/* {(webRateVideo.current.isPause()) ? '开始播放' : '暂停'} */}
          开始播放
        </Button>
      </Wrapper>
    </>
  );
});
export default WebRateVideoBox;
