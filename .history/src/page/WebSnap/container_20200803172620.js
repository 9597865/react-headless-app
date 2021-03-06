import React from 'react';
import {
  Typography,
  Button,
  Divider,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useConcent } from 'concent';
import { MODEL_NAME } from './_model/index';
import rcolor from 'rcolor';

const { Title, Paragraph, Text } = Typography;

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const setup = (ctx) => {
  const { fetch } = ctx.moduleReducer;
  ctx.effect(() => {

  }, []);
  return {

  };
};

const iState = {
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
  const { state: { },
    settings: {

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
      <Button
        icon={<FileZipOutlined />}
        onClick={() => {
          downZip(pngFolderPath);
        }}
      >
        下载压缩包
      </Button>
    </>
  );
});
export default WebSnapBox;
