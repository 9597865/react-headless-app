
import React, { useState } from './node_modules/react';
import { Result, Button, Typography } from './node_modules/antd';


const PicShow = () => (
  <Result
    status="error"
    title="Submission Failed"
    subTitle="Please check and modify the following information before resubmitting."
    extra={[
      // <Button type="primary" key="console">
      //    确定
      // </Button>,
      <Button key="buy">关闭</Button>,
    ]}
  >
  </Result>
);

export default PicShow;
