import React from 'react';
import loadable from 'react-loadable';

// 通用的过场组件
const loadingComponent = (props) => {
  if (props.error) {
    return <div>Error!<button onClick={ props.retry }>retry</button></div>;
  } if (props.pastDelay) {
    return <div>Loading...</div>;
  }
  return null;
};
// 过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader, loading = loadingComponent) => loadable({
  loader,
  loading,
});
