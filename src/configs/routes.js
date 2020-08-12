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
    path: '/snap',
    exact: true,
    component: loadable(() => import('../page/WebSnap')),
  },
  {
    path: '/ratevideo',
    exact: true,
    component: loadable(() => import('../page/WebRateVideo')),
  },
  {
    path: '/chartvideoplayer',
    exact: true,
    component: loadable(() => import('../page/WebChartVideoPlayer')),
  },


];

// routes.push({
//   render: (props) => <Exception type="404" />,
// });

export default routes;
