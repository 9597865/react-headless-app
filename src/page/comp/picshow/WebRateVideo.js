import React, { useState, useImperativeHandler, Component } from 'react';
// import { register, useConcent } from 'concent';
import { Button, Typography } from 'antd';
import styled from 'styled-components';

/** player documemt */
// https://video-react.js.org/components/player/
import 'video-react/dist/video-react.css';
import { Player, ControlBar, BigPlayButton } from 'video-react';

const Wrapper = styled.div`
  margin-bottom: 16px;
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


    const { videoUrl } = props;

    this.state = {
      // source: sources.bunnyMovie,
      timeCut: [
        { t: '00:03.59', r: 5 },
        { t: '00:25.97', r: 3 },
        { t: '00:33.91', r: 1 },
        { t: '00:40.59', r: 5 },
      ],
      source: videoUrl,
      videoUrl,
      paused: true,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  useRef() {
    const node = this.myRef.current;
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }
  myName = () => alert('xiaohesong')
  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    const { currentTime } = state;
    this.setTimeCheckProgress(currentTime);
    this.setState({
      player: state,
      playbackRate: this.player.playbackRate,
      currentTime,
    });
  }

  /**
   * 对时间点进行操作
   * @param {*} currentTime
   */
  setTimeCheckProgress(currentTime) {
    if (currentTime > 3 && currentTime < 25) {
      this.player.playbackRate = 5;
      this.forceUpdate();
    } else {
      this.player.playbackRate = 1;
      this.forceUpdate();
    }
  }

  isPause() {
    return this.state.paused;
  }

  play() {
    this.player.play();
    this.setState({
      paused: false,
    });
  }

  pause() {
    this.player.pause();
    this.setState({
      paused: true,
    });
  }

  load() {
    this.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  }

  changeSource(name) {
    return () => {
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
  }

  render() {
    return (
      <div>
        <Wrapper>
          <Player
            fluid={false}
            width={'100%'}
            height={500}
            playsInline
            poster=''
            ref={(player) => {
              this.player = player;
            }}
          // autoPlay
          >
            <BigPlayButton position="center" />
            <source src={this.state.source} />
            <ControlBar autoHide={false} />
          </Player>
        </Wrapper>
        <Wrapper>
          paused:{`${this.state.paused}`}
        </Wrapper>
        <Wrapper>
          播放时间:{Math.round(this.state.currentTime)}
        </Wrapper>
        <Wrapper style={{ fontSize: 25 }}>
          倍速:{Math.round(this.state.playbackRate)}

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
        <pre>
          {/* <PrismCode className="language-json">
            {JSON.stringify(this.state.player, null, 2)}
          </PrismCode> */}
        </pre>
      </div >
    );
  }
}
export default WebRateVideo;
