/**
 *  菜单配置文件
 *  支持多级嵌套
 *  默认key是name, 不要有重复的name
 */
import React from 'react';
import {
  PictureOutlined,
  //  UserOutlined,
  VideoCameraOutlined,
  //   UploadOutlined,
} from '@ant-design/icons';
export default [
  {
    icon: <PictureOutlined />,
    name: '图片转场服务alpha',
    path: '/',
  },
  {
    icon: <VideoCameraOutlined />,
    name: '图片转场服务beta',
    path: '/beta',
  },
  //   {
  //     icon: <UploadOutlined />,
  //     name: "项目管理",
  //     path: "/projectList",
  //   },
];
