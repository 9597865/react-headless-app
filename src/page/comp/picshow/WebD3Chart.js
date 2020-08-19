/** player documemt */
// https://video-react.js.org/components/player/

import React from "react";
import { Typography, Button, Divider } from "antd";
import styled from "styled-components";
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
    // this.drawChartBarHor();
    // this.drawChartBar();

    this.dChart();

    // let len = this.state.chartConfig.datas[0].length;
    // let times = 0;
    // let durationTime = 1000;
    // setInterval(() => {
    //   console.log(times);
    //   if (times >= len) times = 0;
    //   times++;
    // }, durationTime);

  };


  dChart = () => {

    // 画布大小
    const chartWidth = 900;
    const chartHeight = 600;

    const colors = ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'];

    const chartDatas = this.state.chartConfig.list;

    const formatData = [
      // const data = [
      { year: 2011, entities: [{ name: "A", value: 100 }, { name: "B", value: 50 }, { name: "C", value: 60 }, { name: "D", value: 20 }, { name: "E", value: 10 }] },
      { year: 2012, entities: [{ name: "A", value: 110 }, { name: "B", value: 56 }, { name: "C", value: 80 }, { name: "D", value: 18 }, { name: "E", value: 20 }] },
      { year: 2013, entities: [{ name: "A", value: 105 }, { name: "B", value: 78 }, { name: "C", value: 60 }, { name: "D", value: 21 }, { name: "E", value: 10 }] },
      { year: 2014, entities: [{ name: "A", value: 120 }, { name: "B", value: 80 }, { name: "C", value: 60 }, { name: "D", value: 21 }, { name: "E", value: 5 }] },
      { year: 2015, entities: [{ name: "A", value: 115 }, { name: "B", value: 62 }, { name: "C", value: 60 }, { name: "D", value: 19 }, { name: "E", value: 30 }] },
      { year: 2016, entities: [{ name: "A", value: 90 }, { name: "B", value: 93 }, { name: "C", value: 60 }, { name: "D", value: 16 }, { name: "E", value: 50 }] },
      { year: 2017, entities: [{ name: "A", value: 110 }, { name: "B", value: 71 }, { name: "C", value: 60 }, { name: "D", value: 20 }, { name: "E", value: 90 }] },
      { year: 2018, entities: [{ name: "A", value: 105 }, { name: "B", value: 45 }, { name: "C", value: 60 }, { name: "D", value: 20 }, { name: "E", value: 120 }] }
    ];

    let values = [];
    const data = chartDatas.map((item, index) => {
      // const newdata = chartDatas.map((item, index) => {
      const groupKeys = Object.keys(item);
      let entitiesArr = [];
      const o = {};
      const arr = groupKeys.map((key, i) => {
        const value = item[key];
        if (key === 'time') {
          o.year = value;
        } else {
          entitiesArr.push({ name: key, value: value });
          values.push(value);
        }
        // console.log(key + '----> ' + item[key]);
      });
      o.entities = entitiesArr;
      return o;
    });
    // 设定与矩形和字体相关的样式
    const rect = { height: 40, marginV: 10, marginH: 10, marginT: 40 };
    const font = { height: 20, margin: 35 };

    // 在 body 里添加一个 SVG 画布    
    const svg = d3.select(`#${this.state.chartDomIdHor}`)
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    // const svg = d3.select("svg").append("g");
    const scale = d3.scaleLinear().domain([10, d3.max(values)]).range([40, chartWidth]);
    // 每次取出一个元素 依数值大小将 entities 进行排序
    let index = 0;
    let dataEntry = data[index];
    let dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);

    // 最大长度，即最后一个矩形的底边 y 值
    const maxHeight = (rect.marginV + rect.height) * (dataValue.length - 1) + rect.marginT;
    // 右下角年份
    let comment = svg.append("text").attr("x", 0).attr("y", 30)
      .attr("fill", "grey").text(dataEntry.year).style("font-size", "30");
    // 绑定该年数据
    const groups = svg
      .selectAll("g")
      .data(dataValue).enter()
      .append("g")
      .style("cursor", "pointer")
      .on("click", () => update((++index) % data.length));

    // 名称标签 以及矩形
    let rects = groups.append("rect")
      .attr("x", rect.marginH + font.margin)
      .attr("height", rect.height)
      .attr("fill", (d, i) => colors[i % colors.length]);
    let labels = groups.append("text").text(d => d.name)
      .attr("x", rect.marginH)
      .style("font-size", `${font.height}px`);

    svg.append("g")
      .attr("transform", `translate(${rect.marginH}, ${maxHeight + rect.height + rect.marginV})`)
      .call(d3.axisBottom(scale));

    function updateElements() {
      labels.data(dataValue, d => d.name).transition().duration(600)
        .attr("y", (_, i) => (rect.marginV + rect.height) * i + rect.marginT + rect.height / 2);

      rects.data(dataValue, d => d.name).transition().duration(600)
        .attr("y", (_, i) => (rect.marginV + rect.height) * i + rect.marginT)
        .attr("width", d => scale(d.value));
    }

    updateElements();

    function update(i) {

      dataEntry = data[i];
      dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);

      comment.text(dataEntry.year);
      updateElements();
    }

    setInterval(() => update((++index) % data.length), 1000);
  }

  drawChartBarHor = () => {


    // 画布大小
    const width = 900;
    const height = 600;

    // 画布周边的空白
    const padding = { left: 50, right: 30, top: 20, bottom: 20 };
    const barWidth = 50;
    let barHeight = 50;


    // datay = datay.sort(() => Math.random() - 0.5);
    // 
    const colors = ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'];
    const labelYArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    const datay = [317309, 35149, 42355, 50760, 56649, 61996, 65201];



    // 在 body 里添加一个 SVG 画布    
    const svg = d3.select(`#${this.state.chartDomIdHor}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // x轴
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(datay)])
      .range([padding.left, width]);

    const xAxis = d3.axisBottom().scale(xScale).ticks(labelYArr.length);

    const translateY = height - padding.bottom;

    svg.append('g')
      .call(xAxis)
      .attr("transform", `translate(${0}, ${translateY})`)
      .selectAll("text")
      .attr("dx", 0);

    // y轴     
    // const yScale = d3.scaleLinear()
    //   .domain([0, d3.max(datay)])
    //   .range([height - padding.bottom - padding.top, 0]);
    let yScale = d3.scaleBand().domain(labelYArr).range([height, 0]);

    const yAxis = d3.axisLeft()
      .scale(yScale);
    svg.append('g')
      .attr("transform", `translate(${padding.left} , ${padding.bottom})`)
      .call(yAxis);

    const bar = svg.selectAll(".bar")
      .data(datay)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", (d, i) => {
        const y = (height - (i + 1) * (barHeight + padding.bottom));
        return `translate(${padding.left}, ${(y)})`;
      });

    const rect = bar.append("rect")
      .attr("x", 2)
      .attr("width", (d) => xScale(d))
      .attr("height", barHeight)
      .attr("stroke", "White")
      .attr("fill", "#cc3").on('click', (d, i, obj) => {
        d3.select(obj[i]).transition().duration(1000)
          .attr("y", 100)
          .attr("fill", "yellow");
      });

    bar.append("text")
      .attr("dy", ".75em")
      .attr("y", 6)
      .attr("x", 100)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .text((d) => d);


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
            alert('暂时装修中...！');
          }}
        >
          test
        </Button>
      </Wrapper>
    </Wrapper>
  );
}
export default WebD3Chart;
