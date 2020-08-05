// 路由配置文件
import loadable from '@/utils/loadable';
const routes = [
  //   {
  //     path: "/headlessctrl",
  //     exact: true,
  //     render: (props) => <Redirect to="/headlessctrl" />,
  //   },
  {
    path: '/',
    exact: true,
    component: loadable(() => import('../page/HeadLessCtrl')),
  },
  {
    path: '/websnap',
    exact: true,
    component: loadable(() => import('../page/WebSnap')),
  },
  {
    path: '/webratevideo',
    exact: true,
    component: loadable(() => import('../page/WebRateVideo')),
  },
];

// routes.push({
//   render: (props) => <Exception type="404" />,
// });

export default routes;
