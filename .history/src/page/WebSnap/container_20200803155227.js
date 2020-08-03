import React from 'react';
import {
  Button,
} from 'antd';
import styled from 'styled-components';
import { useConcent } from 'concent';
import { MODEL_NAME } from './_model/index';
import rcolor from 'rcolor';

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
    moduleReducer: mrd,
  } = ctx;
});
