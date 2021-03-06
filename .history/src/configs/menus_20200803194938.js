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
    name: '图片转场服务-alpha',
    path: '/',
  },
  {
    icon: <VideoCameraOutlined />,
    name: '图片转场服务-beta',
    path: '/websnap',
  },

];
