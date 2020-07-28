/**
 * 负责载入各个模块对应的model，启动concent的脚本
 */
import { run } from "concent";
import loadingPlugin from "concent-plugin-loading";
//import * as models from "models";
import { message } from "antd";

// const store = Object.keys(models).reduce((store, moduleName) => {
//   console.log(` ****** load module[${moduleName}]`);
//   store[moduleName] = models[moduleName];
//   return store;
// }, {});

const store = {};
run(store, {
  errorHandler: (err) => {
    console.error(err);
    message.warn(err.message);
  },
  plugins: [loadingPlugin],
  middlewares: [
    (info, next) => {
      console.warn(info);
      next();
    },
  ],
});
