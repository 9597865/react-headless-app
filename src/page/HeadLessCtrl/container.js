import React from "react";
import { Progress, Button, Input, Select, InputNumber } from "antd";
import styled from "styled-components";
import { useConcent } from "concent";
import { MODEL_NAME } from "./_model/index";
import { divide } from "lodash";
import { SettingOutlined } from "@ant-design/icons";

let getDataTimes = 0;
const { Option } = Select;
const webUrlPath = "video.cross.webdev.com/h5/work/headlessWeb/gl/page.html";
const defaultParam = {
  webStyleArr: [1, 2, 3, 4, 5, 6, 7, 8],
  webStyleSecondArr: [1, 2, 3, 4, 5, 6],
  styleId: 0,
  webUrl: `${webUrlPath}?sid=1&img=images/01.jpg|images/02.jpg`,
  width: 375,
  height: 667,
};

const Wrapper = styled.div`
  margin-bottom: 16px;
`;
const WrapperSpan = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

const setup = (ctx) => {
  const { fetch, joinWebUrl, postTimeSnap, getTimeSnap } = ctx.moduleReducer;
  const { current, pageSize } = ctx.moduleState;

  const payload = {
    current,
    pageSize,
  };

  const styleIdHandleChange = (value) => {
    ctx.setState({ styleId: value });
    initUpdate();
  };
  const styleTimeHandlerChange = (value) => {
    ctx.setState({ styleTime: value });
    initUpdate();
  };

  const onChangeStageWidth = (value) => {
    ctx.setState({ pageWidth: value });
    initUpdate();
  };

  const onChangeStageHeight = (value) => {
    ctx.setState({ pageHeight: value });
    initUpdate();
  };

  const initUpdate = () => {
    joinWebUrl({ ...ctx.state, webUrl: webUrlPath });
  };

  const postStart = async (payload) => {
    const result = await postTimeSnap(payload);
    loopUpdate(result);
  };

  const loopUpdate = (payload) => {
    let interval = 0;
    interval = setInterval(async () => {
      try {
        if (result.data !== null) {
          const dat = result.data;
          getDataTimes = getDataTimes + 1;
          const total = 50;
          if (dat.a >= total) {
            // 进度:100%
            clearInterval(interval);
          }
          if (getDataTimes >= 20 && dat.a === 0) {
            getDataTimes = 0;
            // 执行失败，点击按钮 重试
            clearInterval(interval);
          }
        }
        const result = await getTimeSnap(payload);
      } catch (error) {}
    }, 1000);
  };

  ctx.effect(() => {
    initUpdate();
  }, []);

  // ctx.on('onOpenMemoDetailsEvent', async (payload) => {
  //  await openDrawerMemo(payload);
  //  onShowDrawer('Memo');
  // });

  return {
    settingData: { msg: "setting msg" },
    styleIdHandleChange,
    styleTimeHandlerChange,
    onChangeStageWidth,
    onChangeStageHeight,
    initUpdate,
    postStart,
  };
};

const iState = {
  webUrl: defaultParam.webUrl,
  el: "#content",
  styleId: 1,
  styleTime: 1,
  pageWidth: 375,
  pageHeight: 667,
};

const CtrlBox = React.memo((props) => {
  const ops = {
    props,
    module: MODEL_NAME,
    // connect: ["loading"],
    setup,
    state: iState,
  };
  const ctx = useConcent(ops);
  const {
    state: { newWebUrlPath, listData },
    settings: {
      styleIdHandleChange,
      styleTimeHandlerChange,
      onChangeStageWidth,
      onChangeStageHeight,
      initUpdate,
      postStart,
    },
    // connectedState: {
    //   loading: { serverlist: serverLoading },
    // },
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;

  return (
    <>
      <Wrapper>
        <WrapperSpan>网页链接:</WrapperSpan>
        <Input
          addonBefore="http://"
          suffix=""
          defaultValue={defaultParam.webUrl}
        />
      </Wrapper>
      <Wrapper>
        <WrapperSpan>过场-效果:</WrapperSpan>
        <WrapperSpan>
          <Select
            defaultValue="样式-1"
            style={{ width: 120 }}
            onChange={styleIdHandleChange}
          >
            {defaultParam.webStyleArr.map((item, index) => (
              <Option value={index} key={index}>
                样式-{index}
              </Option>
            ))}
          </Select>
        </WrapperSpan>
      </Wrapper>
      <Wrapper>
        <WrapperSpan>过场-时长:</WrapperSpan>
        <WrapperSpan>
          <Select
            defaultValue="1秒"
            style={{ width: 120 }}
            onChange={styleTimeHandlerChange}
          >
            {defaultParam.webStyleSecondArr.map((item, index) => (
              <Option value={index} key={index}>
                {index}秒
              </Option>
            ))}
          </Select>
        </WrapperSpan>
      </Wrapper>
      <Wrapper>
        <WrapperSpan>
          <WrapperSpan>网页-宽度:</WrapperSpan>
          <InputNumber
            min={1}
            max={440}
            defaultValue={defaultParam.width}
            onChange={onChangeStageWidth}
          />
        </WrapperSpan>
      </Wrapper>
      <Wrapper>
        <WrapperSpan>
          <WrapperSpan>网页-高度:</WrapperSpan>
          <InputNumber
            min={1}
            max={1500}
            defaultValue={defaultParam.height}
            onChange={onChangeStageHeight}
          />
        </WrapperSpan>
      </Wrapper>
      <Wrapper>
        <WrapperSpan>
          <a href={newWebUrlPath} target="blank">
            {newWebUrlPath}
          </a>
        </WrapperSpan>
      </Wrapper>
      <Button
        type="primary"
        onClick={() => {
          initUpdate();
          postStart({
            webUrl: newWebUrlPath,
            duration: 2,
            width: ctx.state.pageWidth,
            height: ctx.state.pageHeight,
            el: ctx.state.el,
            fps: 25,
            isClickPage: true,
          });
        }}
      >
        开始截图
      </Button>
      <Wrapper style={{ width: 170 }}>
        <Progress percent={0} size="small" status="active" />
      </Wrapper>
      ,
    </>
  );
});
export default CtrlBox;
