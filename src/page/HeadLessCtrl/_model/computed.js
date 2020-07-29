import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { dispatch, emit } from 'concent';
import * as headlessctrlRd from './reducer';

const Wrapper = styled.div`
  margin: 6px;
`;

export function getListData(data = {}) {
  const dataObj = { qiter: 'good' };
  return dataObj;
};
