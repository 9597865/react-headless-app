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
};
