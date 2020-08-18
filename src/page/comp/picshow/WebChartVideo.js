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
    const tempData = rateData.map((item) => {
      const { t: timeRateValue } = item;
      const newTimeToSecond = this.makeDurationToSeconds(timeRateValue);
      return newTimeToSecond;
    });

    let tempNum = 0;
    const degreData = _.map(tempData, (value) => {
      const n = value - tempNum;
      tempNum = value;
      return n < 0 ? 0 : n;
    });


    // 求平均值
    const mean = _.meanBy(degreData);
    const maxNum = _.max(degreData);
    const minNum = _.min(degreData);
    const sumNum = _.sum(degreData);

    const data = _.map(tempData, (value) => {
      const n = value - tempNum;
      const val = n < 0 ? 0 : n;
      tempNum = value;
      const percent = Math.round((val / maxNum) * 100);
      const spanNum = 30;
      let resultVal = 0;
      if (percent > spanNum) {
        resultVal = percent - spanNum;
      } else {
        resultVal = percent + spanNum;
      }

      return resultVal;
    });

    console.log(maxNum);
    console.log(minNum);
    console.log(sumNum);
    console.log(data);



    const chartWidth = this.state.videoWidth;
    const chartHeight = 50;

    const margin = { left: 0, top: 0, right: 0, bottom: 0 };
    const svg = d3.select("#chartVideoContainer")
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scale
    const scaleX = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, chartWidth]);
    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([chartHeight, 0]);
    // 画线函数
    const lineGenerator = d3.line()
      .x((d, i) => scaleX(i))
      .y((d) => scaleY(d))
      .curve(d3.curveMonotoneX);
    // 画路径
    g.append("path")
      .attr("d", lineGenerator(data));

    // 画面积函数
    const areaGenerator = d3.area()
      .x((d, i) => scaleX(i))
      .y0(chartHeight)
      .y1((d) => scaleY(d))
      .curve(d3.curveMonotoneX);

    const colorScale = d3.scaleLinear()
      .domain([0, 150])
      .range([0, 1]);
    // 画面积
    g.append("path")
      .attr("d", areaGenerator(data))
      .style("fill", "rgba(132, 144, 255, 0.5)")
      .on("mouseover", (d, i) => {
      }).on("mouseout", (d, i) => {
      });

    const dataset = [5];
    const circles = svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle");

    circles.attr("cx", (d, i) => (i * 5) + 10)
      .attr("cy", chartHeight)
      .attr("r", (d) => d)
      .style("fill", "rgba(255, 244, 255, 0.8)");

    svg.on("mousemove", (d, i) => {
      const { offsetX, offsetY } = d3.event;
      const totalLen = data.length;
      const mousePercentX = offsetX / chartWidth;
      const index = Math.round(totalLen * mousePercentX);
      const posY = scaleY(data[index]);
      circles.attr("cx", offsetX).attr("cy", posY);
    });

    svg.on("mousedown", () => {
      // console.log(d3.event);
    });

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

  drawChartBar = () => {
    // 画布大小
    const width = 800;
    const height = 400;

    // 在 body 里添加一个 SVG 画布    
    const svg = d3.select("#chartBarContainer")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // 画布周边的空白
    const padding = { left: 50, right: 30, top: 20, bottom: 20 };
    const barWidth = 100;

    // 原始数据
    const datax = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let datay = [];
    for (let i = 1;i <= 7;i++) {
      datay.push(barWidth * i);
    }
    console.log(datay);

    // x轴
    const xScale = d3.scaleOrdinal()
      .domain(datax)
      .range(datay);

    const xAxis = d3.axisBottom()
      .scale(xScale);

    const translateY = height - padding.bottom;

    svg.append('g')
      .call(xAxis)
      .attr("transform", `translate(${0}, ${translateY})`)
      .selectAll("text")
      .attr("dx", barWidth / 2);

    // y轴 
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(datay)])
      .range([height - padding.bottom, padding.top]);

    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(10);

    svg.append('g')
      .call(yAxis)
      .attr("transform", `translate(${barWidth},0)`);

    const bar = svg.selectAll(".bar")
      .data([100, 200, 300, 700, 500, 600, 400])
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", (d, i) => {
        // return `translate(${xScale(i * barWidth)}, ${yScale(d)})`;
        return `translate(${(i + 1) * (barWidth)}, ${yScale(d)})`;
      });

    const rect = bar.append("rect")
      .attr("x", 1)
      .attr("width", barWidth)
      .attr("height", (d) => { return height - yScale(d) - padding.bottom; })
      .attr("stroke", "White")
      .attr("fill", "#f63").on('click', () => {
        rect.attr("fill", "#ccc");
      });

    bar.append("text")
      .attr("dy", ".75em")
      .attr("y", 6)
      .attr("x", barWidth / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .text((d) => d);
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
  /*
  makeDurationToSeconds = (time) => {
    const str = time;
    const arr = str.split(':');
    const hs = parseInt(arr[0] * 3600);
    const ms = parseInt(arr[1] * 60);
    const ss = parseInt(arr[2]);
    const seconds = hs + ms + ss;
    return seconds;
  }
  */
  getRate = (currentTime) => this.lyrics.currentLine(currentTime);

  createInit = () => {
    this.lyrics = this.getLyrics();
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));

    this.load();
  }

  componentDidMount = () => {
    this.drawChartBar();
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
        <div id='chartBarContainer'>
          <div className={'bar'}></div>
        </div>
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
          <BigPlayButton position='center' />
          <source src={this.state.videoUrl} />
          <ControlBar autoHide={false} />
        </Player>
        <WrapperChart id='chartVideoContainer' style={{ width: this.state.videoWidth }}>
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
