/**
 * 约定 state 用 getInitialState函数 初始化 state
 */
export default function getInitialState() {
  return {
    current: 1,
    total: 0,
    pageSize: 10,
  };
}
