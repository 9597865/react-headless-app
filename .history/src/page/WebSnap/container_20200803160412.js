import React from 'react';
import {
  Typography,
  Button,
  Divider,
} from 'antd';
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
        <Title level={2}>图片转场服务</Title>
        <Paragraph>
          网页转视频功能，可以提供h5转视频服务。转换后可以下载视频，或者png序列帧。
        </Paragraph>
        <Paragraph>
          <ul>
            <li>两张图片转场效果</li>
            <li>支持网页中带有视频</li>
            <li>支持任务中断</li>
          </ul>
        </Paragraph>
        <Paragraph>
          依赖库:
          <a href="https://github.com/tungs/timesnap" target="blank">
            https://github.com/tungs/timesnap
          </a>
        </Paragraph>
        <Divider />
      </Wrapper>
    </>
  );
});
export default WebSnapBox;
