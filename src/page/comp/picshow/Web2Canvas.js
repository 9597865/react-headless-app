
import React, { useState, useEffect } from 'react';
import { Result, Button, Typography } from 'antd';
import styled from 'styled-components';
import loadjs from 'loadjs';
import loadImage from 'img-load';
import { setState } from 'concent';
// loadjs.ready('web2canvas', () => {
//   /* foo.js & bar.js loaded */
//   console.log('web2canvas');
// });
// console.log(loadjs);
const Wrapper = styled.div`
  margin-bottom: 16px;
`;

loadjs(['./css/base.css', './js/three.js', './js/dat-gui.js', './js/sketch.js', './js/demo1.js', './js/gsap.js'], 'web2canvas', {
  async: false,
});
loadjs.ready('web2canvas', () => {

});

function Web2Canvas(props) {
  const { picList } = props;
  // const [count, setCount] = useState(0);
  const [showpic, setShowpic] = useState(false);
  useEffect(() => {
    loadPic(picList);
  }, [picList, props]);

  const loadDemoStyle = () => {
    // loadjs.reset();
  };

  const loadPic = async (pics) => {
    const promiseList = pics.map(item => loadImage(item));
    await Promise.all(promiseList);
    setShowpic(true);
  };

  return (
    <>
      <Wrapper id="content" className="content" style={{ display: showpic ? 'block' : 'none' }} >
        <Wrapper id="slider" data-images={JSON.stringify(props.picList)} data-displacement="" />
      </Wrapper >
      {`${showpic}`}
      <Wrapper>
        <Button onClick={() => {
          setShowpic(!showpic);
        }}>
          Click me
        </Button>
      </Wrapper>
    </>
  );
}
export default Web2Canvas;

