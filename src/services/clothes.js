import request from '@/services/request.js'

//好衣库会场商品列表头部
export function getClothesHallTop(data) {
    return request({
        // url: 'http://test-shop.yuelvhui.com/mall/hyk/getConferenceHallInfo',
        url: '/mall/hyk/getConferenceHallInfo',
        method: 'get',
        params: data,
        prefix: 'shopyuelvhui'
    })
}

//好衣库会场商品列表底部
export function getClothesHallMain(data) {
    return request({
        // url: 'http://test-shop.yuelvhui.com/mall/hyk/getConferenceHallProductList',
        url: '/mall/hyk/getConferenceHallProductList',
        method: 'get',
        params: data,
        prefix: 'shopyuelvhui'
    })
}

//获取好衣库商品列表头部
export function getClothesHeader(data) {
    return request({
        // url: 'http://test-shop.yuelvhui.com/mall/hyk/getproductType',
        url: '/mall/hyk/getproductType',
        method: 'get',
        params: data,
        prefix: 'shopyuelvhui'
    })
}

//获取好衣库搜索商品列表底部 【商品列表】
export function getClothesMain(data) {
    return request({
        // url: 'http://test-shop.yuelvhui.com/mall/hyk/getSearchTypeProductList',
        url: '/mall/hyk/getSearchTypeProductList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

// 判断淘宝授权
export function switchTaoBaoAuth_new(data){
    return request({
        url:'/outside/tbkAuthCheck',
        method:"post",
        data,
    })
}
