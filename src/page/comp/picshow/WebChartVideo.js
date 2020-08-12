/** player documemt */
// https://video-react.js.org/components/player/

import React from "react";
import styled from "styled-components";
import "video-react/dist/video-react.css";
import { Player, ControlBar, BigPlayButton } from "video-react";
import LRC from "lrc.js";
import moment from "moment";
import * as d3 from "d3";

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const WrapperChart = styled.div`
  height: 50px;
  background-color: rgb(135, 135, 135, 0.4);
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

  drawChart() {
    // https://www.jianshu.com/p/fdd77fc22c09
    // const svg = d3
    //   .select("#drawSVG")
    //   .append("svg")
    //   .attr("width", 700)
    //   .attr("height", 300);
    // svg.selectAll("rect").data(data).enter().append("rect");

    const data = [12, 5, 6, 6, 9, 10];
    const w = 300;
    const h = 50;

    const svg = d3.select("#drawSVG")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 100);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 80)
      .attr("y", (d, i) => h - 5 * d)
      .attr("width", 6)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    console.log('-------drawChart()---------');

  }

  getLyrics = () => {
    const lyr = this.state.timeRate;
    const lyrList = lyr.map((item) => `[${item.t}]${item.r}`);
    const lyrString = lyrList.join("\r\n");
    const lyrics = LRC.parse(lyrString);
    return lyrics;
  };

  getRate = (currentTime) => this.lyrics.currentLine(currentTime);

  createInit() {

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
      } catch (error) {}
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
        <WrapperChart style={{ width: this.state.videoWidth, height: 50 }}>
          <div id="drawSVG">qiter</div>
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
