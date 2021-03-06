import React from 'react';
import _ from 'lodash';
import findIndex from 'lodash/findIndex';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import { ConfigProvider, Layout, Menu, Icon, Typography, Divider } from 'antd';

import {
  PieChartOutlined,
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

const { Title, Paragraph, Text } = Typography;

// 查找children里第一个path
const getPath = (menus = []) => {
  while (menus.length > 0) {
    const { path, children } = menus[0];
    if (path) return path;
    menus = children;
  }
  return 'not-found';
};
// 用于面包屑和边栏菜单展示
export const getPathQueue = (menus, pathname) => {
  // 递归函数
  const hasChild = (menu, paths) => {
    const { children, path } = menu;
    if (path === pathname) return paths.push(menu);
    if (!children) return false;
    const has = children.some(c => hasChild(c, paths));
    if (has) return paths.push(menu);
  };

  const paths = [];
  menus.forEach(i => hasChild(i, paths));
  return paths.reverse();
};

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      windowHeight: window.innerHeight,
      menuDefaultId: 0,
      selectedCurrnetKey: 0,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount(props) {
    this.settingMenuSelectedKey();
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleResize);
  // }

  // handleResize = () => {
  //   this.setState({ windowHeight: window.innerHeight });
  // }

  onSelect = () => {
    this.settingMenuSelectedKey();
  }

  settingMenuSelectedKey = () => {
    const { pathname, hash } = location;
    // const arrIndex = findIndex(menus, { path: hash.substring(1, hash.length) });
    const arrIndex = findIndex(menus, { path: pathname });
    this.setState({
      selectedCurrnetKey: arrIndex,
    });
  }

  render() {
    return (
      <>
        <Header className="site-layout-background">
          <div style={{ fontSize: '24px', color: '#fff' }}>{Global.title}</div>
        </Header>
        <Layout>
          <Sider
            // style={{ height: '100%' }}
            // style={{ height: 'calc(100vh - 64px)' }}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[this.state.selectedCurrnetKey.toString()]}
              defaultSelectedKeys={[this.state.menuDefaultId.toString()]}
              onSelect={this.onSelect}
            >
              {menus.map(({ name, icon, path, children }, index) => (
                <Menu.Item key={index} icon={icon} title=''>
                  <Link to={path || getPath(children)}>
                    <span>{name}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 240,
              }}
            >
              <Switch>
                {routes.map((props, index) => (
                  <Route key={index} {...props} />
                ))}
              </Switch>
            </Content>
            <Header className="site-layout-background">
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                },
              )}
            </Header>
          </Layout>
        </Layout>
      </>
    );
  }
}
export default Container;
