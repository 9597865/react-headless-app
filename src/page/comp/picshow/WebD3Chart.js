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
  };


  drawChartBarHor = () => {
    const colors = ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'];

    const chartDatas = [
      { time: '2008', 北京: 2100, 天津: 5866, 河北: 22986, 山西: 21506, 内蒙古: 34869, 辽宁: 31739 },
      { time: '2009', 北京: 9600, 天津: 62574, 河北: 24581, 山西: 21522, 内蒙古: 39735, 辽宁: 35149 },
      { time: '2010', 北京: 7390, 天津: 72994, 河北: 2008, 山西: 26283, 内蒙古: 4747, 辽宁: 42355 },
      { time: '2011', 北京: 8580, 天津: 85213, 河北: 33969, 山西: 31357, 内蒙古: 57974, 辽宁: 50760 },
      { time: '2012', 北京: 7475, 天津: 93173, 河北: 36584, 山西: 33628, 内蒙古: 6886, 辽宁: 6409 },
      { time: '2013', 北京: 9468, 天津: 100105, 河北: 38909, 山西: 34984, 内蒙古: 67836, 辽宁: 56649 },
      { time: '2014', 北京: 9995, 天津: 105231, 河北: 39984, 山西: 34984, 内蒙古: 71046, 辽宁: 61996 },
      { time: '2015', 北京: 160907, 天津: 107960, 河北: 40255, 山西: 35070, 内蒙古: 71101, 辽宁: 65201 },
      { time: '2016', 北京: 260907, 天津: 207960, 河北: 80255, 山西: 55070, 内蒙古: 31101, 辽宁: 25201 },
      { time: '2017', 北京: 300907, 天津: 192960, 河北: 90255, 山西: 25070, 内蒙古: 51101, 辽宁: 65201 },
    ];

    const formatData = [
      { year: 2011, entities: [{ name: "A", value: 100 }, { name: "B", value: 50 }, { name: "C", value: 60 }, { name: "D", value: 20 }, { name: "E", value: 10 }] },
    ];

    let dataAllValues = [];

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
          dataAllValues.push(value);
        }
      });
      o.entities = entitiesArr;
      return o;
    });

    let spaceWidth = 500;
    let spaceHeight = 200;
    const initWidth = 840;
    const initHeight = 500;

    const padding = { left: 40, top: 10, right: 20, bottom: 20, space: 20 };

    let height = initHeight - padding.top - padding.bottom;
    let width = initWidth - padding.left - padding.right;

    const rectBox = { width: 50, height: 50, paddingLeft: 10, paddingTop: 10 };
    const xPadding = { left: 0 };
    const yPadding = { bottom: 40 };

    const rect = { height: 100, marginV: 10, marginH: 30, marginT: 80 };
    const font = { height: 20, margin: 80 };


    const svg = d3.select(`#${this.state.chartDomId}`)
      .append("svg")
      .attr("id", "chart")
      .attr("width", width)
      .attr("height", height)
      .style("padding-left", padding.left)
      .style("padding-right", padding.right)
      .style("padding-top", padding.top)
      .style("padding-bottom", padding.bottom);

    // 添加y轴坐标轴
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - padding.top - padding.bottom - padding.space, 0]);

    // 定义y轴
    let yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.format("d")); // 把x,xxx 的数据计数方式格式化，转化为不带逗号的格式

    // 添加x轴坐标轴

    // x轴比例尺
    let xScale = d3.scaleLinear()
      .domain([0, d3.max(dataAllValues)])
      .rangeRound([0, width - padding.left - padding.right]);

    // 定义x轴
    let xAxis = d3.axisBottom(xScale);

    // 添加x轴
    const posY = height - padding.top - padding.bottom - yPadding.bottom;

    // 添加
    // gridlines in x axis function
    const make_x_gridlines = () => {
      return d3.axisBottom(xScale);
    };


    let durationTime = 1500;
    let animationDurationTime = 700;
    let index = 0;
    let dataEntry = data[index];
    let entiObj = dataEntry["entities"];
    let dataValue = entiObj.sort((x, y) => y.value - x.value);
    let comment = svg.append("text").attr("x", width - 250).attr("y", posY - rectBox.paddingTop)
      .attr("fill", "grey").text(`${dataEntry.year}年`).style("font-size", "50");

    const groups = svg
      .selectAll("g")
      .data(dataValue, (d, i) => { }).enter()
      .append("g")
      .attr("class", "group")
      .style("cursor", "pointer")
      .on("click", () => { });

    let rects = groups.append("rect")
      .attr("x", 0)
      .attr("height", rectBox.height)
      .attr("fill", (d, i) => colors[i % colors.length]);

    let labels = groups.append("text")
      .attr("x", rectBox.width)
      .style("font-size", `${font.height}px`);

    let totalLabels = groups.append("text")
      .attr("x", rectBox.width)
      .style("font-size", `${font.height}px`);

    let iconImgs = groups.append("svg:image")
      .attr("x", 0)
      .attr("width", rectBox.width)
      .attr("height", rectBox.height);

    // add the X gridlines
    const grid = svg.append("g")
      .attr("id", "grid")
      .attr("transform", "translate(" + xPadding.left + "," + posY + ")")
      .call(make_x_gridlines()
        .tickSize(-posY)
        .tickFormat("")
      );
    // 添加y轴
    let axisX = svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + xPadding.left + "," + posY + ")")
      .call(xAxis);

    // let axisY = svg.append("g")
    //   .attr("class", "axis")
    //   .attr("transform", "translate(" + xPadding.left + "," + 0 + ")")
    //   .call(yAxis);

    const resize = window.onresize = () => {
      width = document.documentElement.clientWidth - spaceWidth;
      height = document.documentElement.clientHeight - spaceHeight;
      rectBox.height = height / data.length;
      svg.attr("width", height).attr("height", height);
      // xScale = d3.scaleLinear().domain([10, d3.max(values) * 1.2]).range([40, (height * .9)]);
      // axisX.attr("transform", `translate(${font.margin - 10}, ${maxHeight + rect.height + rect.marginV})`)
      // .call(d3.axisBottom(xScale));
    };

    const scientificToNumber = (num) => {
      const str = num.toString();
      const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return str.replace(reg, "$1,");
    };

    const updateElements = () => {

      const getPosY = (i) => posY - (rectBox.height + rectBox.paddingTop) * (entiObj.length - i);

      rects.data(dataValue, (d, i) => d.name).transition().duration(animationDurationTime).ease(d3.easeLinear)
        .attr("y", (_, i) => getPosY(i))
        .attr("transform", `translate(${rectBox.width}, 0)`)
        .attr("width", d => xScale(d.value));

      labels.data(dataValue, d => d.name).text(d => d.name).transition().duration(animationDurationTime).ease(d3.easeLinear)
        .attr("y", (_, i) => getPosY(i) + rectBox.height / 2);

      totalLabels.data(dataValue, (d, i) => d.name).text(d => scientificToNumber(d.value)).transition().duration(animationDurationTime).ease(d3.easeLinear)
        .attr("x", d => xScale(d.value) + rectBox.width + rectBox.paddingLeft)
        .attr("y", (_, i) => getPosY(i) + rectBox.height / 2);

      iconImgs.data(dataValue, (d, i) => d.name).transition().duration(animationDurationTime).ease(d3.easeLinear)
        .attr("xlink:href", d => d.iconUrl)
        .attr("y", (_, i) => getPosY(i));;

    };

    // resize();

    // updateElements();

    const update = (i) => {

      dataEntry = data[i];
      dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);

      comment.text(`${dataEntry.year}年`);

      updateElements();
      // clearInterval(intervalId);

      index++;
      if (index >= data.length) {
        index = 0;
        clearInterval(intervalId);

        setTimeout(() => {
          intervalId = setInterval(() => update(index), durationTime);
        }, 3000);
      }

    };


    let intervalId = setInterval(() => update(index), durationTime);

  }

  scientificToNumber = (num) => {
    const str = num.toString();
    const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
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
