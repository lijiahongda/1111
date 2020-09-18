/**
 * @description: 路由
 * 
 */

import Vue from 'vue';
import Router from 'vue-router';
import goodsDetailPublic from './moudles/goodsDetailPublic'
import cps from './moudles/cps'
import activity from './moudles/activity'
import ada from './moudles/ada'


Vue.use(Router);

const routes = [{
    path: '/',
    name: 'index',
    component: () => import('@/views/index'),
    meta: {
      title: '悦淘商城', // 标题
      requireAuth: false, // 登录权限
      keepAlive: false,
    },
    children: [{
      path: '/',
      name: 'recommend',
      component: () => import('@/views/recommend'),
      meta: {
        title: '悦淘商城', // 标题
        requireAuth: false, // 登录权限
        keepAlive: false,
      }
    }]
  },
  {
    path: '/fresh',
    name: 'fresh',
    component: () => import('@/views/fresh'),
    meta: {
      title: '生鲜', // 标题
      requireAuth: false, // 登录权限
      keepAlive: false,
    }
  },
  {
    path: '/house',
    name: 'house',
    component: () => import('@/views/house'),
    meta: {
      title: '家居', // 标题
      requireAuth: false, // 登录权限
      keepAlive: false,
    }
  },
  {
    path: '/fresh',
    name: 'fresh',
    component: () => import('@/views/fresh'),
    meta: {
      title: '生鲜', // 标题
      requireAuth: false, // 登录权限
      keepAlive: false,
    }
  },
  {
    path: '/beauty',
    name: 'beauty',
    component: () => import('@/views/beauty'),
    meta: {
      title: '美妆', // 标题
      requireAuth: false, // 登录权限
      keepAlive: false,
    }
  }, {
    path: '/goodStore',
    name: 'goodStore',
    component: () => import('@/views/goodStore'),
    meta: {
      title: '大牌清仓', // 好衣库
      requireAuth: false, // 登录权限
      keepAlive: false,
    }
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component: () => import('@/views/goods/goods-list'), //懒加载方式
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/clothes',
    name: 'clothes',
    component: () => import('@/views/goods/clothes'), //懒加载方式
    meta: {
      title: ''
    }
  },
  {
    path: '/clothesHall',
    name: 'clothesHall',
    component: () => import('@/views/goods/clothesHall'), //懒加载方式
    meta: {
      title: ''
    }
  },
  {
    path: '/gaoyong',
    name: 'gaoyong',
    component: () => import('@/views/goods/gaoyong-list'), //懒加载方式
    meta: {
      title: '高佣商品'
    }
  },
  {
    path: '/jd',
    name: 'jd',
    component: () => import('@/views/goods/jd-list'), //懒加载方式
    meta: {
      title: '京东'
    }
  },
  {
    path: '/pdd',
    name: 'pdd',
    component: () => import('@/views/goods/pdd-list'), //懒加载方式
    meta: {
      title: '拼多多'
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error'), //懒加载方式
    meta: {
      title: '404页'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart'),
    meta: {
      title: '购物车',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video/index'),
    meta: {
      title: '直播',
      requireAuth: true,
      keepAlive: false,
    }
  },
  {
    path: '/videodetail',
    name: 'videodetail',
    component: () => import('@/views/video/detail'),
    meta: {
      title: '直播详情',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '/livedetail',
    name: 'livedetail',
    component: () => import('@/views/live/live'),
    meta: {
      title: '直播详情',
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: '*',
    redirect: 'error',
  },
  ...goodsDetailPublic,
  ...cps,
  ...activity,
  ...ada
];

const router = new Router({
  mode: 'history',
  // mode: 'hash',
  routes
})

export default router;