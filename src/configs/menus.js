/**
 *  菜单配置文件
 *  支持多级嵌套
 *  默认key是name, 不要有重复的name
 */
import React from 'react';
import {
  CameraOutlined,
  PictureOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
export default [
  {
    icon: <PictureOutlined />,
    name: '图片转场服务-alpha',
    path: '/',
  },
  {
    icon: <CameraOutlined />,
    name: '图片转场服务-beta',
    path: '/snap',
  },
  {
    icon: <VideoCameraOutlined />,
    name: '变速播放器-beta',
    path: '/ratevideo',
  },
];
