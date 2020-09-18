import request from '@/services/request.js'

export function getNav(data) {
  return request({
    url: '/mall/V2/newsCategoryList',
    method: 'post',
    data,
    prefix: 'activity',
  })
}
export function getrecommendList(data) {
  return request({
    url: '/mall/V2/recommendList',
    method: 'post',
    data,
    prefix: 'activity',
  })
}
export function getGoodStore() {
  return request({
    // url: 'http://test-shop.yuelvhui.com/mall/hyk/indexTop',//'http://dev.yuetao-mall.com/mall/hyk/indexTop',
    url: '/mall/hyk/indexTop',
    method: 'get',
    prefix: 'shopyuelvhui',
  })
}
export function getGoodlist(data) {
  return request({
    // url: 'http://test-shop.yuelvhui.com/mall/hyk/indexConferenceHall',
    url: '/mall/hyk/indexConferenceHall',
    method: 'get',
    params:data,
    prefix: 'shopyuelvhui',
  })
}
