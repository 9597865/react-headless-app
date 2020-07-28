import { conModule } from "./_model";
import box from "./container";
conModule();
export default box;

/*
import React, { useEffect } from "react";
import styled from "styled-components";
import { List, Button } from "antd";

const Wrapper = styled.div`
  overflow-y: auto;
  position: relative;
  background-color: #f0f2f5;
  height: 100% !important;
  padding: 16px;
`;
const HeadLessCtrl = (data) => {
  const setDataObj = {};
  useEffect(() => {}, [setDataObj]);

  return (
    <Wrapper>
      <div>qiter</div>
    </Wrapper>
  );
};
export default HeadLessCtrl;
*/
