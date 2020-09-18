export default [
{
    path: '/strategy',
    name: 'strategy',
    component: () => import('@/views/strategy'),
    meta: {
      title: '攻略',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/oderSky',
    name: 'odersky',
    component: () => import('@/views/user/oderSky'),
    meta: {
      title: '支付结果',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/oderdetail',
    name: 'oderdetail',
    component: () => import('@/views/user/oderdetail'),
    meta: {
      title: '支付结果',
      requireAuth: true,
      keepAlive: false,
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user'),
    meta: {
      title: '个人中心',
      requireAuth: true,
      keepAlive: true,
    }
  },
  {
    path: '/placeOder',
    name: 'placeOder',
    component: () => import('@/views/user/placeOder'),
    meta: {
      title: '提交订单',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/placeModer',
    name: 'placeModer',
    component: () => import('@/views/user/placeModer'),
    meta: {
      title: '提交订单',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/placeCaroder',
    name: 'placeCaroder',
    component: () => import('@/views/user/placeCaroder'),
    meta: {
      title: '提交订单',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('@/views/user/coupon'),
    meta: {
      title: '优惠券',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/addressList',
    name: 'addressList',
    component: () => import('@/views/user/addressList'),
    meta: {
      title: '选择地址',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/editAddress',
    name: 'editAddress',
    component: () => import('@/views/user/editAddress'),
    meta: {
      title: '编辑地址',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login'),
    meta: {
      title: '登录',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/slogin',
    name: 'slogin',
    component: () => import('@/views/login/slogin'),
    meta: {
      title: '注册',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/sharelogin'),
    meta: {
      title: '注册',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/user/setting'),
    meta: {
      title: '设置',
      requireAuth: true,
      keepAlive: true,
    }
  },
  {
    path: '/couoderlist',
    name: 'couoderlist',
    component: () => import('@/views/user/couOrderlist'),
    meta: {
      title: '白拿凑单列表',
      requireAuth: true,
      keepAlive: true,
    }
  },
  {
    path: '/cpsopo',
    name: 'cpsopo',
    component: () => import('@/views/activity/Cpsopo'),
    meta: {
      title: '混合cps',
      requireAuth: true,
      keepAlive: true,
    }
  }
]