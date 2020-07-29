import React from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import { ConfigProvider, Layout, Menu, Icon } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import '@/App.css';

import { routes, menus } from '@/configs';

import Global from '@/configs/global';

// import "antd/dist/antd.css";
const { Header, Sider, Content } = Layout;

// 查找children里第一个path
const getPath = (menus = []) => {
  while (menus.length > 0) {
    const { path, children } = menus[0];
    if (path) return path;
    menus = children;
  }
  return 'not-found';
};

class Container extends React.Component {
  state = {
    collapsed: true,
    windowHeight: window.innerHeight,
    menuDefaultId: 0,
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
        <Header className="site-layout-background">
          <div style={{ fontSize: '24px', color: '#fff' }}>{Global.title}</div>
        </Header>
        <Layout>
          <Sider
            style={{ height: 'calc(100vh - 64px)' }}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[this.state.menuDefaultId.toString()]}
            >
              {menus.map(({ name, icon, path, children }, index) => (
                <Menu.Item key={index} icon={icon}>
                  <Link to={path || getPath(children)}>
                    <span>{name}</span>
                  </Link>
                </Menu.Item>
              ))}
              {/* <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background">
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                },
              )}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 240,
              }}
            >
              <Switch>
                {routes.map((props, index) => <Route key={index} {...props} />)}
                {console.log(routes)}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}
export default Container;
