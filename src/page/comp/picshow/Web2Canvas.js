
import React, { useState, useEffect } from 'react';
import { Result, Button, Typography } from 'antd';
import styled from 'styled-components';
import loadjs from 'loadjs';
import loadImage from 'img-load';
import { setState } from 'concent';
import Iframe from 'react-iframe';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

// loadjs(['./css/base.css',
//         './js/three.js',
// './js/dat-gui.js', './js/sketch.js', './js/demo1.js', './js/gsap.js'], 'web2canvas', {
//   async: false,
// });

function Web2Canvas(props) {
  const { picList } = props;
  const [showpic, setShowpic] = useState(true);

  useEffect(() => {
    loadPic(picList);
  }, [picList]);

  const loadPic = async (pics) => {
    const promiseList = pics.map(item => loadImage(item));
    await Promise.all(promiseList);
  };

  return (
    <>
      {/* <Wrapper id="content" className="content">
        <Wrapper id="slider" data-images={JSON.stringify(props.picList)} data-displacement="" />
      </Wrapper > */}
      <Wrapper >
        <Iframe
          frameBorder='0'
          url="http://video.cross.webdev.com/h5/work/headlessWeb/gl/page.html?sid=3&img0=images/01.jpg&img1=images/02.jpg&w=375&h=667"
          width="450px"
          height="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative" />
      </Wrapper >
    </>
  );
}
export default Web2Canvas;

