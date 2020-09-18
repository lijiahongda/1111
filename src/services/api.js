import request from '@/services/request'

/**
 * 根据code码获取用户信息
 * */
export function getCodeByUserInfo(data) {
    return request({
        url: '/h5/openWebSite/getCodeByUserInfo',
        method: 'post',
        data,
        prefix: ''
    })
}

/**
 * 首页/顶部分类
 * */
export function getIndexHeadType(data) {
    return request({
        url: '/stall/H5Index',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 首页/秒杀
 * */
export function miaosha(data) {
    return request({
        url: '/stall/getFlashGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 首页/惊喜不断
 * */
export function jingxi(data) {
    return request({
        url: '/stall/getJDSalesVolumeGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 首页/拼团
 * */
export function pintuan(data) {
    return request({
        url: '/stall/channelGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 首页/都买了
 * */
export function allbuy(data) {
    return request({
        url: '/stall/getToppingGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 首页/新人专属推荐
 * */
export function newpeople(data) {
    return request({
        url: '/stall/indexNewPeopleGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * /jd/ 京东联盟数据列表
 * */
export function jdHomeIndex(data) {
    return request({
        url: '/outside/jdHomeIndex',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * /jd/ 京东联盟--品类商品列表
 * */
export function jdHomeSearch(data) {
    return request({
        url: '/outside/jdHomeSearchGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 高佣产品
 * */
export function highShare(data) {
    return request({
        url: '/stall/getHighShare',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}


/**
 * /pdd/ 拼多多联盟数据列表
 * */
export function pddHomeIndex(data) {
    return request({
        url: '/outside/pddHomeIndex',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 直播banner
 * */
export function videobanner(data) {
    return request({
        url: '/app/live/getLiveBanner',
        method: 'post',
        data,
        prefix: 'yuelvhui'
    })
}

/**
 * /jd/ 拼多多--分类商品列表
 * */
export function pddHomeSearch(data) {
    return request({
        url: '/outside/pdd/v1/queryGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 直播列表
 * */
export function videolist(data) {
    return request({
        url: '/app/live/getContentList',
        method: 'post',
        data,
        prefix: 'yuelvhui'
    })
}

/**
 * /jd/ 京东联盟--首页搜索
 * */
export function jdIndexSearch(data) {
    return request({
        url: '/stall/jd/searchGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * /搜索历史信息&&商品搜索页信息
 * */
export function goodsSearchHistory(data) {
    return request({
        url: '/mall/getNewKeyWords2?',
        method: 'get',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * /首页搜索
 * */
export function newEndSearchData(data) {
    return request({
        url: '/mall/search/v2/keyword/newEndSearchData3',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 食品生鲜分类详情
 * */
export function freshSearch(data) {
    return request({
        url: '/mall/search/v2/keyword',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 京东商品搜索
 * */
export function jdSearch(data) {
    return request({
        url: '/stall/jd/searchGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}

/**
 * 拼多多商品搜索
 * */
export function pddSearch(data) {
    return request({
        url: '/stall/pdd/searchGoodsList',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}


/**
 * 点击淘宝商品详情判断授权
 * */
export function switchTaoBaoAuth(data) {
    return request({
        url: '/outside/taobk/v1/checkJurisdiction',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}
/**
 * 判断用户身份
 * */
export function getUserShenFen(data) {
    return request({
        url: '/stall/isUserIdentity',
        method: 'post',
        data,
        prefix: 'shopyuelvhui'
    })
}