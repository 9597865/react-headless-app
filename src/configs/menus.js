/**
 *  菜单配置文件
 *  支持多级嵌套
 *  默认key是name, 不要有重复的name
 */
import React from 'react';
import {
  PieChartOutlined,
  BarChartOutlined,
  CameraOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  InstagramOutlined,
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
  {
    icon: <InstagramOutlined />,
    name: '热力图播放器',
    path: '/chartvideoplayer',
  },
  {
    icon: <BarChartOutlined />,
    name: '动态图表排行',
    path: '/webd3chart',
  },
];
