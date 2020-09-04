/** player documemt */
// https://video-react.js.org/components/player/

import React from "react";
import { Typography, Modal, Button, Divider, List, Card, Image } from "antd";
import styled from "styled-components";
import Iframe from 'react-iframe';
import './d3Style.css';
import {
  LoadingOutlined,
} from '@ant-design/icons';
const Wrapper = styled.div`
  margin-bottom: 16px;
`;

class WebD3Chart extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { width, height } = props;
    const cardData = [
      {
        title: '柱状图排序',
        imgUrl: require('@/assets/images/chart_type/img_index.png'),
        webUrl: 'http://video.cross.webdev.com/h5/work/headlessWeb/chart/index_bar_img.html'
      },
      {
        title: '柱状图排序',
        imgUrl: require('@/assets/images/chart_type/img_bar.png'),
        webUrl: 'http://video.cross.webdev.com/h5/work/headlessWeb/chart/index_bar.html'
      },
      {
        title: '柱状图排序-黑色',
        imgUrl: require('@/assets/images/chart_type/img_bar.png'),
        webUrl: 'http://video.cross.webdev.com/h5/work/headlessWeb/chart/template/bar_sort_black.html'
      },
      {
        title: '折线图',
        imgUrl: require('@/assets/images/chart_type/img_line.png'),
        webUrl: 'http://video.cross.webdev.com/h5/work/headlessWeb/chart/index_line.html'
      },
    ];
    this.state = {
      chartDomId: 'chartBarContainer',
      chartDomIdHor: 'chartBarContainer_hor',
      chartConfig: {},
      listData: cardData,
      width: 870,
      height: 540,
      title: '',
      visible: false,
    };
  }

  componentDidMount = () => {
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

  handleOk = () => {
    this.setState({
      visible: false
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  onClose(e) {
    console.log(e.target);
  }

  onClickCardItem = (item) => {
    this.setState({
      title: item.title,
      chartWebUrl: item.webUrl,
      visible: true
    });
  }

  render = () => (
    <Wrapper>
      <Modal
        width={this.state.width}
        height={this.state.height}
        title={this.state.title}
        data-backdrop="static"
        visible={this.state.visible}
        closable={true}
        maskClosable={true}
        destroyOnClose={true}
        maskStyle={{ backgroundColor: 'rgba(0,0,0,.8)' }}
        footer={
          [] // 设置footer为空，去掉 取消 确定默认按钮
        }
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Iframe
          frameBorder='0'
          url={this.state.chartWebUrl}
          width={this.state.width - 40}
          height={this.state.height}
          id="myId"
          display="initial"
          position="relative"
        />
        {/* <LoadingOutlined /> */}
      </Modal>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={this.state.listData}
        renderItem={item => (
          <List.Item>
            <Card title={item.title} height={360} hoverable
              style={{ width: '100%', height: '360px', overflow: 'hidden' }}
              onClick={() => this.onClickCardItem(item)}
            >
              <div style={{ height: '240px', overflow: 'hidden', backgroundImage: `url(${item.imgUrl})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
            </Card>
          </List.Item>
        )}
      />

    </Wrapper>
  );
}
export default WebD3Chart;
