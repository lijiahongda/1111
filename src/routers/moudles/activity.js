export default [{
  path: '/acthds',
  name: 'acthds',
  component: () => import('@/views/activity/index'), //懒加载方式
  meta: {
    title: '活动'
  }
}, {
  path: '/voucherCenter',
  name: 'voucherCenter',
  component: () => import('@/views/activity/voucherCenter'), //懒加载方式
  meta: {
    title: '领券中心'
  }
}, {//新版领劵中心
    path: '/newCoupons',
    name: 'newCoupon',
    component: () => import('@/views/activity/newCoupon'), //懒加载方式
    meta: {
      title: '领券中心'
    }
  },{
  path: '/TakeWithoutPaying',
  name: 'takewithoutpaying',
  component: () => import('@/views/activity/TakeWithoutPaying'), //懒加载方式
  meta: {
    title: '每月白拿'
  }
}, {
  path: '/dalibao',
  name: 'dalibao',
  component: () => import('@/views/activity/dalibao/index'), //懒加载方式
  meta: {
    title: '会场专享大礼包'
  }
}, {
  path: '/dalibaolist',
  name: 'list',
  component: () => import('@/views/activity/dalibao/list'), //懒加载方式
  meta: {
    title: '会场专享大礼包'
  }
}, {
  path: '/gaode',
  name: 'gaode',
  component: () => import('@/views/activity/gaode/index'), //懒加载方式
  meta: {
    title: '七夕新人大礼包'
  }
}, {
  path: '/gaodelist',
  name: 'gaodelist',
  component: () => import('@/views/activity/gaode/gaodelist'), //懒加载方式
  meta: {
    title: '七夕新人大礼包'
  }
}]