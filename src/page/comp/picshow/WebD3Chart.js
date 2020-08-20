/** player documemt */
// https://video-react.js.org/components/player/

import React from "react";
import { Typography, Button, Divider } from "antd";
import styled from "styled-components";
import h2c from 'html2canvas';
import rcolor from 'rcolor';
import * as d3 from "d3";
import './d3Style.css';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

class WebD3Chart extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { width, height } = props;
    this.state = {
      chartDomId: 'chartBarContainer',
      chartDomIdHor: 'chartBarContainer_hor',
      chartConfig: {
        list: [
          { time: '2008', 北京: 21, 天津: 5866, 河北: 22986, 山西: 21506, 内蒙古: 34869, 辽宁: 31739 },
          { time: '2009', 北京: 96, 天津: 62574, 河北: 24581, 山西: 21522, 内蒙古: 39735, 辽宁: 35149 },
          { time: '2010', 北京: 739, 天津: 72994, 河北: 28, 山西: 26283, 内蒙古: 4747, 辽宁: 42355 },
          { time: '2011', 北京: 858, 天津: 85213, 河北: 33969, 山西: 31357, 内蒙古: 57974, 辽宁: 50760 },
          { time: '2012', 北京: 7475, 天津: 93173, 河北: 36584, 山西: 33628, 内蒙古: 6886, 辽宁: 649 },
          { time: '2013', 北京: 9468, 天津: 100105, 河北: 38909, 山西: 34984, 内蒙古: 67836, 辽宁: 56649 },
          { time: '2014', 北京: 9995, 天津: 105231, 河北: 39984, 山西: 34984, 内蒙古: 71046, 辽宁: 61996 },
          { time: '2015', 北京: 160907, 天津: 107960, 河北: 40255, 山西: 35070, 内蒙古: 71101, 辽宁: 65201 },
        ]
      },
    };
  }

  componentDidMount = () => {
    this.drawChartBarHor();
    // this.drawChartBar();

    // let len = this.state.chartConfig.datas[0].length;
    // let times = 0;
    // let durationTime = 1000;
    // setInterval(() => {
    //   console.log(times);
    //   if (times >= len) times = 0;
    //   times++;
    // }, durationTime);

  };


  drawChartBarHor = () => {

    // 画布大小
    let spaceWidth = 500;
    let spaceHeight = 200;
    let chartWidth = document.documentElement.clientWidth - spaceWidth;
    let chartHeight = document.documentElement.clientHeight - spaceHeight;

    window.addEventListener('resize', this.onResize);

    const colors = ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'];

    const chartDatas = [
      { time: '2008', 北京: 21, 天津: 5866, 河北: 22986, 山西: 21506, 内蒙古: 34869, 辽宁: 31739 },
      { time: '2009', 北京: 96, 天津: 62574, 河北: 24581, 山西: 21522, 内蒙古: 39735, 辽宁: 35149 },
      { time: '2010', 北京: 739, 天津: 72994, 河北: 28, 山西: 26283, 内蒙古: 4747, 辽宁: 42355 },
      { time: '2011', 北京: 858, 天津: 85213, 河北: 33969, 山西: 31357, 内蒙古: 57974, 辽宁: 50760 },
      { time: '2012', 北京: 7475, 天津: 93173, 河北: 36584, 山西: 33628, 内蒙古: 6886, 辽宁: 649 },
      { time: '2013', 北京: 9468, 天津: 100105, 河北: 38909, 山西: 34984, 内蒙古: 67836, 辽宁: 56649 },
      { time: '2014', 北京: 9995, 天津: 105231, 河北: 39984, 山西: 34984, 内蒙古: 71046, 辽宁: 61996 },
      { time: '2015', 北京: 160907, 天津: 107960, 河北: 40255, 山西: 35070, 内蒙古: 71101, 辽宁: 65201 },
      { time: '2016', 北京: 260907, 天津: 207960, 河北: 80255, 山西: 55070, 内蒙古: 31101, 辽宁: 25201 },
      { time: '2017', 北京: 300907, 天津: 192960, 河北: 90255, 山西: 25070, 内蒙古: 51101, 辽宁: 65201 },
    ];

    const formatData = [
      { year: 2011, entities: [{ name: "A", value: 100 }, { name: "B", value: 50 }, { name: "C", value: 60 }, { name: "D", value: 20 }, { name: "E", value: 10 }] },
    ];

    let values = [];


    const imgList = [
      "http://cross.webdev.com/builder/assets/images/home/showcase/10.png",
      "http://cross.webdev.com/builder/assets/images/home/showcase/11.png",
      "http://cross.webdev.com/builder/assets/images/home/showcase/12.jpg",
      "http://cross.webdev.com/builder/assets/images/home/showcase/13.jpg",
      "http://cross.webdev.com/builder/assets/images/home/showcase/14.jpg",
      "http://cross.webdev.com/builder/assets/images/home/showcase/15.jpg",
      "http://cross.webdev.com/builder/assets/images/home/showcase/16.jpg",
    ];

    const data = chartDatas.map((item, index) => {
      const groupKeys = Object.keys(item);
      let entitiesArr = [];
      const o = {};
      const arr = groupKeys.map((key, i) => {
        const value = item[key];
        const iconUrl = imgList[i];
        if (key === 'time') {
          o.year = value;
        } else {
          entitiesArr.push({ name: key, name2: `${value}`, value: value, iconUrl: iconUrl });
          values.push(value);
        }
      });
      o.entities = entitiesArr;
      return o;
    });

    // console.log(JSON.stringify(data))
    const rect = { height: 100, marginV: 10, marginH: 30, marginT: 80 };
    const font = { height: 20, margin: 80 };

    rect.height = (chartHeight - rect.marginT - font.margin) / data.length;

    const svg = d3.select(`#${this.state.chartDomId}`)
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    let scale = d3.scaleLinear().domain([10, d3.max(values) * 1.2]).range([40, (chartWidth * .9)]);

    let durationTime = 1500;
    let animationDurationTime = 700;
    let index = 0;
    let dataEntry = data[index];
    let dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);
    console.log(dataValue);
    // 最大长度，即最后一个矩形的底边 y 值
    const maxHeight = (rect.marginV + rect.height) * (dataValue.length - 1) + rect.marginT;

    let comment = svg.append("text").attr("x", 0).attr("y", rect.marginT - font.height)
      .attr("fill", "grey").text(`${dataEntry.year}年`).style("font-size", "50");

    const groups = svg
      .selectAll("g")
      .data(dataValue).enter()
      .append("g")
      .style("cursor", "pointer")
      .on("click", () => update((++index) % data.length));

    let rects = groups.append("rect")
      .attr("x", rect.marginH + font.margin)
      .attr("height", rect.height)
      .attr("fill", (d, i) => colors[i % colors.length]);

    let labels = groups.append("text")
      .attr("x", rect.marginH)
      .style("font-size", `${font.height}px`);

    let totalLabels = groups.append("text")
      .attr("x", rect.marginH + font.margin)
      .style("font-size", `${font.height}px`);

    let iconImgs = groups.append("svg:image")
      // .attr("xlink:href", imgUrl)
      .attr("x", rect.marginH + font.margin)
      .attr("width", rect.height / 2)
      .attr("height", rect.height / 2);

    const axisX = svg.append("g")
      .attr("transform", `translate(${font.margin - 10}, ${maxHeight + rect.height + rect.marginV})`)
      .call(d3.axisBottom(scale));

    const resize = window.onresize = () => {
      chartWidth = document.documentElement.clientWidth - spaceWidth;
      chartHeight = document.documentElement.clientHeight - spaceHeight;
      svg.attr("width", chartWidth).attr("height", chartHeight);
      scale = d3.scaleLinear().domain([10, d3.max(values) * 1.2]).range([40, (chartWidth * .9)]);
      axisX.attr("transform", `translate(${font.margin - 10}, ${maxHeight + rect.height + rect.marginV})`)
        .call(d3.axisBottom(scale));
    };

    const scientificToNumber = (num) => {
      const str = num.toString();
      const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return str.replace(reg, "$1,");
    };

    const updateElements = () => {

      rects.data(dataValue, (d, i) => d.name).transition().duration(animationDurationTime)
        .attr("y", (_, i) => (rect.marginV + rect.height) * i + rect.marginT)
        .attr("width", d => scale(d.value));

      labels.data(dataValue, d => d.name).text(d => d.name).transition().duration(animationDurationTime)
        .attr("y", (_, i) => (rect.marginV + rect.height) * i + rect.marginT + rect.height / 2);

      totalLabels.data(dataValue, (d, i) => d.name).text(d => scientificToNumber(d.value)).transition().duration(animationDurationTime)
        .attr("x", d => scale(d.value) + rect.marginV + font.margin + 30)
        .attr("y", (_, i) => (rect.marginV + rect.height) * i + rect.marginT + rect.height / 2);

      iconImgs.data(dataValue, (d, i) => d.name).transition().duration(animationDurationTime)
        .attr("xlink:href", d => d.iconUrl)
        .attr("y", (_, i) => rect.marginT + (rect.marginV + rect.height) * i);

    };

    resize();

    updateElements();

    const update = (i) => {

      dataEntry = data[i];
      dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);

      comment.text(dataEntry.year);
      updateElements();
    };


    setInterval(() => update((++index) % data.length), durationTime);

  }

  drawChartBar = () => {
    // 画布大小
    const width = 800;
    const height = 400;

    // 在 body 里添加一个 SVG 画布    
    const svg = d3.select(`#${this.state.chartDomId}`)
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
    datay = _.shuffle(datay);

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
      .data(datay)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", (d, i) => {
        // return `translate(${xScale(i * barWidth)}, ${yScale(d)})`;
        const dx = (i + 1) * (barWidth);
        const dy = yScale(d);
        return `translate(${dx}, ${dy})`;
      });

    const rect = bar.append("rect")
      .attr("x", 1)
      .attr("width", barWidth)
      .attr("height", (d) => { return height - yScale(d) - padding.bottom; })
      .attr("stroke", "White")
      .attr("fill", "#f63").on('click', (d, i, obj) => {
        d3.select(obj[i]).transition().duration(1000)
          .attr("x", 100)
          .attr("fill", "yellow");
      });

    bar.append("text")
      .attr("dy", ".75em")
      .attr("y", 6)
      .attr("x", barWidth / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .text((d) => d);
  }

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

  componentWillUnmount() {
    this.unMounted = true;
    window.removeEventListener('resize', this.onResize);
    this.dispose();
  }

  onResize() {

  }

  dispose() {
  }

  snapChart() {
    h2c(document.body).then((canvas) => {
      document.body.appendChild(canvas);
    });
  }

  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate');
  //   console.log(this.props);
  //   return false;
  // }



  render = () => (
    <Wrapper>
      <div id={this.state.chartDomIdHor}></div>
      <div id={this.state.chartDomId}></div>
      <Wrapper>
        <Button
          type="primary"
          shape="round"
          size={'large'}
          onClick={() => {
            // alert('暂时装修中...！');
            this.snapChart();
          }}
        >
          test
        </Button>
      </Wrapper>
    </Wrapper>
  );
}
export default WebD3Chart;
