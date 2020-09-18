export default [{
  path: '/cps',
  name: 'cps',
  component: () => import('@/views/cps/index'), //懒加载方式
  meta: {
    // title: 'cps',
    // requireAuth: true, //是否需要登录
  }
}]