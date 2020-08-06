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
import { useConcent } from 'concent';
import { MODEL_NAME } from './_model/index';

import h2c from 'html2canvas';
import rcolor from 'rcolor';

import Web2Canvas from '../comp/picshow/Web2Canvas';
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
  const { fetch, fetchPicUrl } = ctx.moduleReducer;

  ctx.effect(() => {
    // console.log('=======Web2Canvas=======');
    // console.log(Web2Canvas);
  }, []);

  return {
    fetchPicUrl,
  };
};

const iState = {
  imagePathArr: [
    // 'http://video.cross.webdev.com/h5/work/headlessWeb/gl/images/01.jpg',
    // 'http://video.cross.webdev.com/h5/work/headlessWeb/gl/images/02.jpg',
    './images/01.jpg',
    './images/02.jpg',
  ],
  webUrl: '',
  el: '#content',
  styleId: 1,
  styleTime: 1,
  pageWidth: 375,
  pageHeight: 667,

  pngFolderPath: '',
  percent: 0,
  isDownloadShow: false,
  isVideoShow: false,
};

const WebSnapBox = React.memo((props) => {
  const ops = {
    props,
    module: MODEL_NAME,
    setup,
    state: iState,
  };
  const ctx = useConcent(ops);
  const { state: { imagePathArr },
    settings: {
      fetchPicUrl,
    },
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;
  return (
    <>
      <Wrapper>
        <Title level={2}>Html2Canvas截图转场服务</Title>
        <Paragraph>
          网页转视频功能，可以提供h5转视频服务。转换后可以下载视频，或者png序列帧。
        </Paragraph>
        <Paragraph>
          依赖:
          <a href="https://github.com/niklasvh/html2canvas" target="blank">
            https://github.com/niklasvh/html2canvas
          </a>
        </Paragraph>
        <Divider />
      </Wrapper>
      <Web2Canvas picList={imagePathArr} style={'demo1'}></Web2Canvas>
      <Wrapper>
        <Button
          icon={<FileZipOutlined />}
          type="primary"
          shape="round"
          size={'large'}
          onClick={() => {
            // h2c(document.body).then((canvas) => {
            //   document.body.appendChild(canvas);
            // });
            // fetchPicUrl({ name: 'html2canvas', imagePathList: imagePathArr });
            alert('暂时装修中...！');
          }}
        >
          开始-网页转视频
        </Button>
      </Wrapper>
    </>
  );
});
export default WebSnapBox;
