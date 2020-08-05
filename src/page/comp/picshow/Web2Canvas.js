
import React, { useState, useEffect } from 'react';
import { Result, Button, Typography } from 'antd';
import styled from 'styled-components';
import loadjs from 'loadjs';
import loadImage from 'img-load';
import { setState } from 'concent';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;
loadjs(['./css/base.css', './js/three.js', './js/dat-gui.js', './js/sketch.js', './js/demo1.js', './js/gsap.js'], 'web2canvas', {
  async: false,
});

function Web2Canvas(props) {
  const { picList } = props;
  const [showpic, setShowpic] = useState(true);
  useEffect(() => {
    loadPic(picList);
  }, [picList]);

  ;
  loadjs.ready('web2canvas', () => {

  });


  const loadDemoStyle = () => {
    // loadjs.reset();
  };

  const loadPic = async (pics) => {
    const promiseList = pics.map(item => loadImage(item));
    await Promise.all(promiseList);
    // setTimeout(() => {
    //   setShowpic(true);
    // }, 1500);
  };

  return (
    <>
      {`${showpic}`}
      {/* <Wrapper id="content" className="content" style={{ display: showpic ? 'block' : 'none' }} > */}
      <Wrapper id="content" className="content">
        <Wrapper id="slider" data-images={JSON.stringify(props.picList)} data-displacement="" />
      </Wrapper >
      <Wrapper>
        {/* <Button onClick={() => {
          setShowpic(!showpic);
        }}>
          Click me
        </Button> */}
      </Wrapper>
    </>
  );
}
export default Web2Canvas;

