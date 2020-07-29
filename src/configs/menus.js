/**
 *  菜单配置文件
 *  支持多级嵌套
 *  默认key是name, 不要有重复的name
 */
import React from 'react';
import {
  UserOutlined,
  //   VideoCameraOutlined,
  //   UploadOutlined,
} from '@ant-design/icons';
export default [
  {
    icon: <UserOutlined />,
    name: '截图服务',
    path: '/',
  },
  //   {
  //     icon: <VideoCameraOutlined />,
  //     name: "我创建的",
  //     path: "/chartList",
  //   },
  //   {
  //     icon: <UploadOutlined />,
  //     name: "项目管理",
  //     path: "/projectList",
  //   },
];
