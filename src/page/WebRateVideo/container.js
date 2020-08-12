import React from 'react';
import {
  message,
  Typography,
  Button,
  Divider,
  Input,
  Select } from 'antd';

import {
  PlayCircleOutlined,
  SettingOutlined,
  FileZipOutlined,
} from '@ant-design/icons';


import styled from 'styled-components';
import { useConcent, emit } from 'concent';
import { MODEL_NAME, KEY_VIDEO } from './_model/index';
import marked from 'marked';
import hljs from 'highlight.js';
import loadjs from 'loadjs';
import WebRateVideo from '../comp/picshow/WebRateVideo';
import localStorage from 'localStorage';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const WrapperImg = styled.div`
  width: 400px;
  height: auto;
  margin-bottom: 16px;
  img{
    width:100%;
  }
`;

loadjs(['./css/monokai_sublime.min.css'], 'web2canvas', {
  async: false,
});

const iState = {
  // videoUrl: 'http://video.cross.webdev.com/h5/dist/jzvideo.mp4',
  videoUrl: 'http://video.cross.webdev.com/h5/dist/taotao.mp4',
  videoWidth: 480,
  videoHeight: 360,
  textAreaVideoValue: '',
  timeRate:[{"t":"00:00:00.00", "r":5 },{"t":"00:03:27.00", "r":1 },{"t":"00:03:37.00", "r":5 },{"t":"00:04:05.00", "r":1 },{"t":"00:04:15.00", "r":5 },{"t":"00:05:22.00", "r":1 },{"t":"00:05:32.00", "r":5 },{"t":"00:06:07.00", "r":1 },{"t":"00:06:17.00", "r":5 },{"t":"00:10:56.00", "r":1 },{"t":"00:11:06.00", "r":5 },{"t":"00:12:52.00", "r":1 },{"t":"00:13:02.00", "r":5 },{"t":"00:13:24.00", "r":1 },{"t":"00:13:34.00", "r":5 },{"t":"00:14:02.00", "r":1 },{"t":"00:14:12.00", "r":5 },{"t":"00:14:55.00", "r":1 },{"t":"00:15:05.00", "r":5 },{"t":"00:19:22.00", "r":1 },{"t":"00:19:32.00", "r":5 },{"t":"00:19:58.00", "r":1 },{"t":"00:20:08.00", "r":5 },{"t":"00:22:43.00", "r":1 },{"t":"00:22:53.00", "r":5 },{"t":"00:30:11.00", "r":1 },{"t":"00:30:21.00", "r":5 },{"t":"00:30:13.00", "r":1 },{"t":"00:30:23.00", "r":5 },{"t":"00:31:22.00", "r":1 },{"t":"00:31:32.00", "r":5 },{"t":"00:35:23.00", "r":1 },{"t":"00:35:33.00", "r":5 },{"t":"00:37:03.00", "r":1 },{"t":"00:37:13.00", "r":5 },{"t":"00:37:47.00", "r":1 },{"t":"00:37:57.00", "r":5 },{"t":"00:39:03.00", "r":1 },{"t":"00:39:13.00", "r":5 },{"t":"00:43:00.00", "r":1 },{"t":"00:43:10.00", "r":5 },{"t":"00:45:11.00", "r":1 },{"t":"00:45:21.00", "r":5 },{"t":"00:47:16.00", "r":1 },{"t":"00:47:26.00", "r":5 },{"t":"00:49:01.00", "r":1 },{"t":"00:49:11.00", "r":5 },{"t":"00:52:08.00", "r":1 },{"t":"00:52:18.00", "r":5 },{"t":"00:54:18.00", "r":1 },{"t":"00:54:28.00", "r":5 },{"t":"00:54:39.00", "r":1 },{"t":"00:54:49.00", "r":5 },{"t":"00:56:25.00", "r":1 },{"t":"00:56:35.00", "r":5 },{"t":"00:59:12.00", "r":1 },{"t":"00:59:22.00", "r":5 },{"t":"01:01:35.00", "r":1 },{"t":"01:01:45.00", "r":5 },{"t":"01:04:36.00", "r":1 },{"t":"01:04:46.00", "r":5 },{"t":"01:05:03.00", "r":1 },{"t":"01:05:13.00", "r":5 },{"t":"01:07:28.00", "r":1 },{"t":"01:07:38.00", "r":5 },{"t":"01:08:47.00", "r":1 },{"t":"01:08:57.00", "r":5 },{"t":"01:09:34.00", "r":1 },{"t":"01:09:44.00", "r":5 },{"t":"01:12:27.00", "r":1 },{"t":"01:12:37.00", "r":5 },{"t":"01:14:30.00", "r":1 },{"t":"01:14:40.00", "r":5 }],
  // timeRate: [
  //  { t: "00:00:00.00", r: 5 },
  //  { t: "00:00:06.23", r: 1 },
  //  { t: "00:00:11.24", r: 1 },
  //  { t: "00:01:30.26", r: 1 },
  //  { t: '00:01:35.27', r: 5 },
  //  { t: '00:02:36.11', r: 1 },
  //  { t: '00:02:41.12', r: 5 },
  //  { t: '00:03:36.08', r: 1 },
  //  { t: '00:03:41.09', r: 5 },
  //  { t: '00:04:41.26', r: 1 },
  //  { t: '00:04:46.27', r: 5 },
  //  { t: '00:05:22.26', r: 1 },
  //  { t: '00:05:27.27', r: 5 },
  //  { t: '00:06:01.29', r: 1 },
  //  { t: '00:06:07.00', r: 5 },
  //  { t: '00:06:30.20', r: 1 },
  //  { t: '00:06:35.21', r: 5 },
  //  { t: '00:07:11.14', r: 1 },
  //  { t: '00:07:16.15', r: 5 },
  // ],
  pageWidth: 375,
  pageHeight: 667,
  isVideoShow: false,
  playTitle: '开始播放',
};


const setup = (ctx) => {
  const { fetch } = ctx.moduleReducer;

  ctx.effect(() => {
    localStorage.clear();
    const keyVideoData = localStorage.getItem(KEY_VIDEO);
    if (keyVideoData !== null) {
      // console.log('=====localStorage====');
      const jsonObj = JSON.parse(keyVideoData);
      const newJsonTimeRate = createNewTimeRate(jsonObj.timeRate); 
      settingData({...jsonObj, timeRate:newJsonTimeRate});
    } else {
      console.log('无本地存储数据, 加载默认数据');
      const timeRateObj = createNewTimeRate(ctx.state.timeRate); 
      ctx.setState({timeRate:timeRateObj});
    }
  }, []);

  const createNewTimeRate = (timeRate) => {
    const timeRateObj = timeRate.map((item,index)=>{
      const { t } = item;
      item.t = parseTime(t);
      return item;
    });
    return timeRateObj;
  };

  const parseTime = (time) => {
    // const videoData = { videoUrl: inputVideoValue, timeRate: taValue };
    // const timeStr = "02:30:30.26";
    const timeStr = time;
    const strLen = timeStr.length;
    const pos = timeStr.indexOf(':');
    const hourStr = timeStr.substring(0,pos);
    const totalHourToMinite = Number(hourStr) * 60;
    const leaveStr = timeStr.substring(pos+1, strLen);
    const pos2 = leaveStr.indexOf(':');
    const miniValueStr = leaveStr.substring(0,pos2);
    const totalMiniValue = totalHourToMinite +  Number(miniValueStr);
    //
    const lastPos = timeStr.lastIndexOf(":");
    const timeSecondStr =  timeStr.substring(lastPos, strLen);
    const resultTime = `${totalMiniValue}${timeSecondStr}`;
    // const resultStr = totalMiniValue.length===1 ? `${resultTime}`:`${resultTime}`;
    // console.log(resultStr);
    return resultTime;
  };

  const setRateVideoData = ($refWebRateVideo, $refTaVideoUrl) => {
    try {
      const inputVideoValue = $refWebRateVideo.current.state.value;
      const taValue = JSON.parse($refTaVideoUrl.current.state.value);
      const videoData = { videoUrl: inputVideoValue, timeRate: taValue };
      settingData(videoData);
      setStorage(KEY_VIDEO, videoData);

      message.success('装载数据成功');
    } catch (error) {
      message.error('JSON 数据结构解释失败');
    }
  };

  const setStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const settingData = (videoData) => {
    ctx.setState(videoData);
  };


  const inputVideoUrlOnChange = (value) => {
    // console.log('inputVideoUrlOnChange');
  };

  const textareaOnChange = (data) => {
    // console.log(data);
  };

  return {
    fetch,
    setRateVideoData,
    textareaOnChange,
    inputVideoUrlOnChange
  };
};

const WebRateVideoBox = React.memo((props) => {
  const ops = {
    props,
    module: MODEL_NAME,
    setup,
    state: iState,
  };

  const ctx = useConcent(ops);

  const {
    state: {
      videoUrl,
      timeRate,
      videoWidth,
      videoHeight,
    },
    settings: {
      setRateVideoData,
      textareaOnChange,
      inputVideoUrlOnChange,
    },
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight(code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const $refWebRateVideo = React.createRef();
  const $refInputVideoUrl = React.createRef();
  const $refTaVideoUrl = React.createRef();

  const setPlayTitle = title => ctx.setState({ playTitle: title });

  const playAndPause = () => {
    const { current: ref } = $refWebRateVideo;
    ref.isPause() ? ref.play() : ref.pause();
    ref.isPause() ? setPlayTitle('暂停') : setPlayTitle('开始播放');
  };


  return (
    <>
      <Wrapper>
        <Title level={2}>变速-视频播放器</Title>
        <Paragraph>
          网页视频-变速播放器
        </Paragraph>
        <Divider />
        <WebRateVideo
          ref={$refWebRateVideo}
          videoUrl={videoUrl}
          timeRate={timeRate}
          width={videoWidth}
          height={videoHeight} />
        <Wrapper key={ Math.random() }>
          <Wrapper>
            <Title level={4}>视频地址:</Title>
            <Input ref={$refInputVideoUrl} defaultValue={videoUrl} allowClear onChange={inputVideoUrlOnChange}/>
          </Wrapper>
          <Wrapper>
            <Title level={4}>变速时间点:</Title>
            <TextArea
              defaultValue={JSON.stringify(timeRate)}
              ref={$refTaVideoUrl}
              onChange={textareaOnChange}
              placeholder=""
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <Button
            type="primary"
            shape="round"
            size={'large'}
            onClick={() => {
              setRateVideoData($refInputVideoUrl, $refTaVideoUrl);
            }}
          >
            重新装载数据
          </Button>


        </Wrapper>
        <Divider />
        <Title level={4}>组件调用:</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(`
            <WebRateVideo
            ref={$refWebRateVideo}
            videoUrl={videoUrl}
            timeRate={timeRate}
            width={videoWidth}
            height={videoHeight} />
            `),
          }}
        />
        <Title level={4}>传入参数格式:</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(`

            videoUrl:'http://video.cross.webdev.com/h5/dist/jz.mp4'
            t:为时间节点
            r:为速率

            timeRate: [
              { t: '00:00.00', r: 5 },
              { t: '00:06.23', r: 1 },
              { t: '00:11.24', r: 5 },
              { t: '01:30.26', r: 1 },
              { t: '01:35.27', r: 5 },
              { t: '02:36.11', r: 1 },
              { t: '02:41.12', r: 5 },
              { t: '03:36.08', r: 1 },
              { t: '03:41.09', r: 5 },
              { t: '04:41.26', r: 1 },
              { t: '04:46.27', r: 5 },
              { t: '05:22.26', r: 1 },
              { t: '05:27.27', r: 5 },
              { t: '06:01.29', r: 1 },
              { t: '06:07.00', r: 5 },
              { t: '06:30.20', r: 1 },
              { t: '06:35.21', r: 5 },
              { t: '07:11.14', r: 1 },
              { t: '07:16.15', r: 5 },
            ],
            `),
          }}
        />
        <Paragraph>
          <Text strong>
          </Text>
        </Paragraph>
      </Wrapper>
      {/* <Wrapper>
        <Button
          type="primary"
          shape="round"
          size={'large'}
          onClick={playAndPause}
        >
          {playTitle}
        </Button>
      </Wrapper> */}
    </>
  );
});
export default WebRateVideoBox;
