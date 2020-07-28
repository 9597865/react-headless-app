/* eslint-disable */

/**
 *  CRA2.X 配置 proxy, 代理到本地启动的mocker服务
 */
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  // // 以下走mock
  // app.use(proxy('/api/auth', { target: 'http://localhost:3721/' }));
  // app.use(proxy('/api/chart', { target: 'http://localhost:3721/' }));
  // app.use(proxy('/api/todos', { target: 'http://localhost:3721/' }));
  // app.use(proxy('/api/user', { target: 'http://localhost:3721/' }));
  // app.use(proxy('/api/leah', { target: 'http://localhost:3721/' }));
  // app.use(proxy('/api/lists', { target: 'http://localhost:3721/' }));
  // // 其他的走后端
  // app.use(proxy('/api', { target: 'http://localhost:3001/' }));

  app.use(proxy("/api", { target: "http://localhost:3721/" }));
  // express upload api
  app.use(proxy("/express", { target: "http://localhost:8020/" }));
  app.use(proxy("/txcloud", { target: "http://49.232.70.246/" }));
  console.log("-----------代理到本地启动的mocker服务----------");
};
