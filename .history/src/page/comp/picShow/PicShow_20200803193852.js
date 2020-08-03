
import React, { useState } from 'react';
import { Result, Button, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const PicShow = () => {
  const [resultType, setResultType] = useState('success');
  return (
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
};

export default PicShow;
