import React from 'react';
import ReactDOM from 'react-dom';
// 路由相关
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './configs/runConcent';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// 初始化路由和store
// export const history = createBrowserHistory();
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <HashRouter basename="/">
      {/* <Switch> */}
      <Route path="/" component={App} />
      {/* </Switch> */}
    </HashRouter>
  </ConfigProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
