import React, { useState, useImperativeHandler, Component } from 'react';
// import { register, useConcent } from 'concent';
import { Button, Typography } from 'antd';
import styled from 'styled-components';

/** player documemt */
// https://video-react.js.org/components/player/
import 'video-react/dist/video-react.css';
import { Player, ControlBar, BigPlayButton } from 'video-react';
import LRC from 'lrc.js';
import moment from 'moment';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const WrapperSpan = styled.span`
  margin-left: 16px;
`;

const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
};

// @register()
class WebRateVideo extends React.Component {
  // $$setup(ctx) {
  //   ctx.on('someEvent', (name) => {
  //     console.log('trigger nameChanged flag1 callback');
  //   });
  // }

  constructor(props, context) {
    super(props, context);
    const { videoUrl, timeRate, width, height } = props;
    this.state = {
      timeRate,
      videoUrl,
      videoWidth: width,
      videoHeight: height,
      paused: true,
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

  getLyrics = () => {
    const lyr = this.state.timeRate;
    const lyrList = lyr.map(item => `[${item.t}]${item.r}`);
    const lyrString = lyrList.join('\r\n');
    const lyrics = LRC.parse(lyrString);
    return lyrics;
  };

  getRate = currentTime => this.lyrics.currentLine(currentTime);

  createInit() {
    this.lyrics = this.getLyrics();
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));

    this.load();
  }

  componentDidMount = () => {
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
    // 否则，对于state不进行任何操作
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

  setMuted = muted => () => {
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

  changeCurrentTime = seconds => () => {
    const { player } = this.player.getState();
    this.player.seek(player.currentTime + seconds);
  };

  seek = seconds => () => {
    this.player.seek(seconds);
  };

  changePlaybackRateRate = steps => () => {
    const { player } = this.player.getState();
    this.player.playbackRate = player.playbackRate + steps;
  };

  changeVolume = steps => () => {
    const { player } = this.player.getState();
    this.player.volume = player.volume + steps;
  };

  changeSource = name => () => {
    if (name === 'jiaozhen') {
      this.setState({
        source: this.state.videoUrl,
      });
    } else {
      this.setState({
        source: sources[name],
      });
    }
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
      </Wrapper>
      <Wrapper style={{ fontSize: 25 }}>
        <WrapperSpan>
          播放时间:
          {moment(this.state.currentTime * 1000).format('mm:ss.SSS')}
        </WrapperSpan>
        <WrapperSpan>倍速:x{this.state.playbackRate}</WrapperSpan>
      </Wrapper>
      {/*
        <div className="py-3">
          <Button onClick={this.play} className="mr-3">
            play()
          </Button>
          <Button onClick={this.pause} className="mr-3">
            pause()
          </Button>
          <Button onClick={this.load} className="mr-3">
            load()
          </Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeCurrentTime(10)} className="mr-3">
            currentTime += 10
          </Button>
          <Button onClick={this.changeCurrentTime(-10)} className="mr-3">
            currentTime -= 10
          </Button>
          <Button onClick={this.seek(50)} className="mr-3">
            currentTime = 50
          </Button>
        </div>

        <div className="pb-3">
          <Button onClick={this.changePlaybackRateRate(1)} className="mr-3">
            playbackRate++
          </Button>
          <Button onClick={this.changePlaybackRateRate(-1)} className="mr-3">
            playbackRate--
          </Button>
          <Button onClick={this.changePlaybackRateRate(0.1)} className="mr-3">
            playbackRate+=0.1
          </Button>
          <Button onClick={this.changePlaybackRateRate(-0.1)} className="mr-3">
            playbackRate-=0.1
          </Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeVolume(0.1)} className="mr-3">
            volume+=0.1
          </Button>
          <Button onClick={this.changeVolume(-0.1)} className="mr-3">
            volume-=0.1
          </Button>
          <Button onClick={this.setMuted(true)} className="mr-3">
            muted=true
          </Button>
          <Button onClick={this.setMuted(false)} className="mr-3">
            muted=false
          </Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeSource('jiaozhen')} className="mr-3">
            cross较真视频
          </Button>
          <Button onClick={this.changeSource('sintelTrailer')} className="mr-3">
            Sintel teaser
          </Button>
          <Button onClick={this.changeSource('bunnyTrailer')} className="mr-3">
            Bunny trailer
          </Button>
          <Button onClick={this.changeSource('bunnyMovie')} className="mr-3">
            Bunny movie
          </Button>
          <Button onClick={this.changeSource('test')} className="mr-3">
            Test movie
          </Button>
        </div>
        */}
    </div>
  );
}
export default WebRateVideo;
