/** player documemt */
// https://video-react.js.org/components/player/

import React from "react";
import styled from "styled-components";
import "video-react/dist/video-react.css";
import { Player, ControlBar, BigPlayButton } from "video-react";
import LRC from "lrc.js";
import moment from "moment";
import * as d3 from "d3";

import './d3Style.css';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const WrapperChart = styled.div`
  height: 50px;
  background-color: #000;
`;

const WrapperSpan = styled.span`
  margin-left: 16px;
`;

const TxtBox = styled.span`
  color: red;
`;

class WebChartVideo extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { videoUrl, timeRate, width, height } = props;
    this.state = {
      timeRate,
      videoUrl,
      videoWidth: width,
      videoHeight: height,
      paused: true,
      chartConfig: {},
    };
    this.lyrics = {};
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  drawChart = () => {
    // console.log(this.state.timeRate);
    // const s = this.makeDurationToSeconds('01:00:01.456');
    // console.log(s);

    const { timeRate: rateData } = this.state;
    const data = rateData.map((item, index) => {
      const { t, r } = item;
      const newTimeToSecond = this.makeDurationToSeconds(t);
      // console.log(t + '--->' + newTimeToSecond);
      console.log(`${t}---${newTimeToSecond}`);
      return newTimeToSecond * r;
    });

    // const data = [10, 30, 50, 70, 80, 40, 30, 70];
    const w = this.state.videoWidth;
    const h = 50;

    const margin = { left: 0, top: 0, right: 0, bottom: 0 };
    const svg = d3.select("#d3Container")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    // Scale
    const scaleX = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([h, 0]);
    // 画线函数
    const lineGenerator = d3.line()
      .x((d, i) => {
        return scaleX(i);
      })
      .y((d) => {
        return scaleY(d);
      })
      .curve(d3.curveMonotoneX); // apply smoothing to the line
    // 画路径
    g.append("path")
      .attr("d", lineGenerator(data)); // d="M1,0L20,40.....  d-path data

    // 画面积函数
    const areaGenerator = d3.area()
      .x(function (d, i) {
        return scaleX(i);
      })
      .y0(h)
      .y1(function (d) {
        return scaleY(d);
      })
      .curve(d3.curveMonotoneX);

    // 画面积
    g.append("path")
      .attr("d", areaGenerator(data)) // d="M1,0L20,40.....  d-path data
      .style("fill", "steelblue");

    // // X轴
    // g.append("g")
    //   .call(d3.axisBottom(scaleX))
    //   .attr("transform", `translate(0, ${h})`);

    // // Y轴
    // g.append("g")
    //   .call(d3.axisLeft(scaleY));

    // y轴文字
    // g.append("text")
    //   .text("Price($)")
    //   .attr("transform", "rotate(-90)")
    //   .attr("dy", "1em")
    //   .attr("text-anchor", "end");
  }

  getLyrics = () => {
    const lyr = this.state.timeRate;
    const lyrList = lyr.map((item) => `[${item.t}]${item.r}`);
    const lyrString = lyrList.join("\r\n");
    const lyrics = LRC.parse(lyrString);
    return lyrics;
  };

  makeDurationToSeconds = (time) => {
    const str = time;
    const arr = str.split(':');
    const hs = parseInt(arr[0] * 3600);
    const ms = parseInt(arr[1] * 60);
    const ss = parseInt(arr[2]);
    const seconds = hs + ms + ss;
    return seconds;
  }

  getRate = (currentTime) => this.lyrics.currentLine(currentTime);

  createInit = () => {
    this.lyrics = this.getLyrics();
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));

    this.load();
  }

  componentDidMount = () => {
    this.drawChart();
    this.createInit();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { videoUrl, timeRate } = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (videoUrl !== prevState.videoUrl) {
      return {
        videoUrl,
        timeRate,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { videoUrl, timeRate } = this.props;
    const { videoUrl: prevVideoUrl, timeRate: prevTimeRate } = prevState;
    if (videoUrl !== prevVideoUrl || timeRate !== prevTimeRate) {
      this.setState({ ...this.props });
      this.createInit();
    }
  }

  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate');
  //   console.log(this.props);
  //   return false;
  // }

  setMuted = (muted) => () => {
    this.player.muted = muted;
  };

  handleStateChange = (state, prevState) => {
    const { currentTime } = state;
    const { playbackRate } = this.player;
    let currentRate = 1;
    if (currentTime > 0) {
      try {
        const { text: rate } = this.getRate(currentTime);
        currentRate = rate;
      } catch (error) { }
      this.setUpdateRate(currentRate);
    }
    this.setState({
      player: state,
      playbackRate,
      currentTime,
    });
  };

  /**
   * 对时间点进行操作
   * @param {*} currentTime
   */
  setUpdateRate = (currentRate) => {
    this.player.playbackRate = currentRate;
    this.forceUpdate();
  };

  isPause = () => this.state.paused;

  play = () => {
    this.player.play();
  };

  pause = () => {
    this.player.pause();
  };

  load = () => {
    this.player.load();
  };

  changeCurrentTime = (seconds) => () => {
    const { player } = this.player.getState();
    this.player.seek(player.currentTime + seconds);
  };

  seek = (seconds) => () => {
    this.player.seek(seconds);
  };

  changePlaybackRateRate = (steps) => () => {
    const { player } = this.player.getState();
    this.player.playbackRate = player.playbackRate + steps;
  };

  changeVolume = (steps) => () => {
    const { player } = this.player.getState();
    this.player.volume = player.volume + steps;
  };

  changeSource = (name) => () => {
    this.setState({
      source: this.state.videoUrl,
    });
    this.player.load();
  };

  render = () => (
    <div>
      <Wrapper>
        <Player
          fluid={false}
          width={this.state.videoWidth}
          height={this.state.videoHeight}
          playsInline
          poster=""
          ref={(player) => {
            this.player = player;
          }}
        // autoPlay
        >
          <BigPlayButton position="center" />
          <source src={this.state.videoUrl} />
          <ControlBar autoHide={false} />
        </Player>
        <WrapperChart id="d3Container" style={{ width: this.state.videoWidth }}>
        </WrapperChart>
      </Wrapper>
      <Wrapper style={{ fontSize: 25 }}>
        <WrapperSpan>
          播放时间:
          {moment(this.state.currentTime * 1000).format("mm:ss.SSS")}
        </WrapperSpan>
        <WrapperSpan>
          倍速:<TxtBox>x {this.state.playbackRate}</TxtBox>
        </WrapperSpan>
      </Wrapper>
    </div>
  );
}
export default WebChartVideo;
