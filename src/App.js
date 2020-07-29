import React from "react";
// 可以自由选择 BrowserRouter HashRouter
import { Switch, Route, HashRouter } from "react-router-dom";
import { ConnectRouter } from "react-router-concent";
import "antd/dist/antd.css";
import { ConfigProvider, Layout, Menu } from "antd";
// 布局组件
import LayoutBasic from "@/layouts/Basic";
class App extends React.Component {
  state = {
    collapsed: false,
    windowHeight: window.innerHeight,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // componentDidMount() {
  //   window.addEventListener('resize', this.handleResize);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleResize);
  // }

  // handleResize = () => {
  //   this.setState({ windowHeight: window.innerHeight });
  // }

  render() {
    return (
      <>
        <LayoutBasic />
      </>
      // <HashRouter>
      //   <ConnectRouter />
      //   <ConfigProvider locale={zhCN}>
      //     <Switch>
      //       <Route path="/" component={Layout} />
      //     </Switch>
      //   </ConfigProvider>
      // </HashRouter>
    );
  }
}

export default App;
