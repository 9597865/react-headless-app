import React from "react";
import {
  Progress,
  Button,
  Input,
  Select,
  InputNumber,
  message,
  Modal,
} from "antd";
import styled from "styled-components";
import { useConcent } from "concent";
import { MODEL_NAME } from "./_model/index";
import rcolor from "rcolor";
import { CloseOutlined } from "@ant-design/icons";
let interval = 0;
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
  const {
    joinWebUrl,
    postTimeSnap,
    getTimeSnap,
    postDestoryTimeSnap,
  } = ctx.moduleReducer;

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
    getDataTimes = 1;
    const result = await postTimeSnap(payload);
    ctx.setState({
      percent: -1,
      pngFolderPath: result.timesnameData.folderPath,
    });
    loopUpdate(result);
  };

  const loopUpdate = (payload) => {
    const total = 50;
    clearInterval(interval);
    interval = setInterval(async () => {
      try {
        const result = await getTimeSnap(payload);
        if (result.data !== null) {
          const dat = result.data;
          getDataTimes = getDataTimes + 1;
          ctx.setState({ percent: dat.percent });
          if (dat.a === total) {
            clearInterval(interval);
            // 进度:100%
            ctx.setState({ percent: -1, isDownloadShow: true });
          }
          if (getDataTimes >= 20 && dat.a === 0) {
            getDataTimes = 0;
            // 执行失败，点击按钮 重试
            ctx.setState({ percent: -1, isDownloadShow: false });
            errorFun();
            clearInterval(interval);
          }
        }
      } catch (error) {}
    }, 1000);
  };

  const successFun = () => {
    message.success(
      {
        content: "录制成功！",
        className: "custom-class",
        style: {
          marginTop: "10vh",
        },
      },
      5
    );
  };

  const errorFun = () => {
    Modal.error({
      title: "生成失败，请重试！",
      content: "服务器有点问题，请重试...",
      style: {
        marginTop: "10vh",
      },
    });
  };

  const mutiPoint = (times) => new Array(times).fill(".").join("");

  const destoryRun = async (payload) => {
    clearInterval(interval);
    getDataTimes = 0;
    ctx.setState({ percent: -1, isDownloadShow: false });
    const result = await postDestoryTimeSnap(payload);
    if (result.code === 0) {
    }
  };

  ctx.effect(() => {
    initUpdate();
  }, []);

  // ctx.on('onOpenMemoDetailsEvent', async (payload) => {
  //  await openDrawerMemo(payload);
  //  onShowDrawer('Memo');
  // });

  return {
    settingData: {},
    styleIdHandleChange,
    styleTimeHandlerChange,
    onChangeStageWidth,
    onChangeStageHeight,
    destoryRun,
    loopUpdate,
    initUpdate,
    postStart,
    successFun,
    errorFun,
    mutiPoint,
  };
};

const iState = {
  webUrl: defaultParam.webUrl,
  el: "#content",
  styleId: 1,
  styleTime: 1,
  pageWidth: 375,
  pageHeight: 667,

  pngFolderPath: "",
  percent: 0,
  isDownloadShow: false,
};

const CtrlBox = React.memo((props) => {
  const ops = {
    props,
    module: MODEL_NAME,
    setup,
    state: iState,
  };
  const ctx = useConcent(ops);
  const {
    state: {
      newWebUrlPath,
      img0,
      img1,
      listData,
      percent,
      isDownloadShow,
      pngFolderPath,
    },
    settings: {
      styleIdHandleChange,
      styleTimeHandlerChange,
      onChangeStageWidth,
      onChangeStageHeight,
      destoryRun,
      initUpdate,
      postStart,
      successFun,
      errorFun,
      mutiPoint,
    },
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;

  const exctRun = (ops) => (
    <Button
      type="primary"
      shape="round"
      size={"large"}
      onClick={() => {
        initUpdate();
        postStart(ops);
      }}
    >
      开始-网页转视频
    </Button>
  );

  const progressText = (times) => (
    <div>
      <Button
        shape="circle"
        icon={<CloseOutlined />}
        size="small"
        type="primary"
        danger
        onClick={() => {
          destoryRun();
          console.log("暂停");
        }}
      />
      <span>正在生成中{mutiPoint(times)}</span>
    </div>
  );

  const downZip = (filePath) => {
    const hostUrl = `http://${window.location.host}/dist/${filePath}/snap.zip`;
    setTimeout(() => {
      window.open(hostUrl);
    }, 300);
  };

  return (
    <>
      <Wrapper>
        <WrapperSpan>
          <a
            href={newWebUrlPath}
            target="blank"
            style={{ color: `${rcolor()}` }}
          >
            网页-链接:
          </a>
        </WrapperSpan>
        <WrapperSpan style={{ width: "90%" }}>
          <Input
            addonBefore="http://"
            suffix=""
            value={newWebUrlPath}
            defaultValue={defaultParam.webUrl}
          />
        </WrapperSpan>
      </Wrapper>
      <Wrapper>
        <WrapperSpan>过场-效果:</WrapperSpan>
        <WrapperSpan>
          <Select
            defaultValue="样式-1"
            style={{ width: 120 }}
            onChange={styleIdHandleChange}
          >
            {defaultParam.webStyleArr.map((item, id) => (
              <Option value={id + 1} key={id}>
                样式-{id + 1}
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
      {/* <Wrapper>
        <WrapperSpan>
          <a href={newWebUrlPath} target="blank">
            {newWebUrlPath}
          </a>
        </WrapperSpan>
      </Wrapper> */}
      <Wrapper style={{ width: 170 }}>
        {getDataTimes <= 0
          ? exctRun({
              webUrl: newWebUrlPath,
              img0,
              img1,
              duration: 2,
              width: ctx.state.pageWidth,
              height: ctx.state.pageHeight,
              el: ctx.state.el,
              fps: 25,
              isClickPage: true,
            })
          : isDownloadShow
          ? ""
          : progressText(getDataTimes)}
        {percent === -1 && isDownloadShow
          ? exctRun({
              webUrl: newWebUrlPath,
              img0,
              img1,
              duration: 2,
              width: ctx.state.pageWidth,
              height: ctx.state.pageHeight,
              el: ctx.state.el,
              fps: 25,
              isClickPage: true,
            })
          : ""}
      </Wrapper>
      <Wrapper>
        {percent === -1 && isDownloadShow ? (
          <Button
            onClick={() => {
              downZip(pngFolderPath);
            }}
          >
            下载压缩包
          </Button>
        ) : (
          ""
        )}
      </Wrapper>
      <Wrapper>
        {percent > 0 ? (
          <Wrapper style={{ width: 370 }}>
            <Progress percent={percent} size="small" status="active" />
          </Wrapper>
        ) : (
          ""
        )}
      </Wrapper>
      {/* <Wrapper>
        <Button onClick={() => {
          // success();
          errorFun();
        }}>测试按钮</Button>
      </Wrapper> */}
    </>
  );
});
export default CtrlBox;
