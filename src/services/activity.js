import request from '@/services/request.js'

export function getActivityList(data) {
    return request({
        url: '/mall/V3/newActivityList',
        method: 'post',
        data,
        prefix: 'activity'
    })
}

//领券专区
export function voucherList(data) {
    return request({
        url: '/mall/V2/getCouponList',
        method: 'post',
        data,
        prefix: 'center'
    })
}

//领取优惠券
export function postVouchers(data) {
    return request({
        url: '/mall/sendCoupon',
        method: 'post',
        data,
        prefix: 'center'
    })
}

//获取cps
export function getcpsInfo(data) {
    return request({
        url: '/outside/shareJumpUrl',
        method: 'post',
        data,
        prefix: 'center'
    })
}


//白拿活动
// 获取白拿类型
export function getActivityCategoryInfo(data) {
    return request({
        url: '/mall/V3/getActivityCategoryInfo',
        method: 'post',
        data,
        prefix: 'yuetaoGroup'
    })
}

// 获取白拿列表
export function newActivityList(data) {
    return request({
        url: '/mall/V3/newActivityList',
        method: 'post',
        data,
        prefix: 'yuetaoGroup'
    })
}

// CPS列表
export function getCpsActiveList(data) {
    return request({
        url: '/mall/activity/getCpsActiveList',
        method: 'post',
        data,
        prefix: 'yuetaoGroup'
    })
}

// 会场专属大礼包领取
export function lingQuLibao(data) {
    return request({
        url: '/mall/bindCoupon',
        method: 'post',
        data,
        prefix: 'yuetaoGroup'
    })
}

// 会场专属大礼包判断是否已领取
export function isGetDaLiBao(data) {
    return request({
        url: '/mall/isBindCoupon',
        method: 'post',
        data,
        prefix: 'yuetaoGroup'
    })
}

//分享
export function sharePage(data) {
    return request({
        url: data,
        method: 'get',
        prefix: 'yuetaoGroup'
    })
}

// 高德活动--领取大礼包
export function lingQuGaoDeLibao(data) {
    return request({
        url: '/mall/bindActivityCoupon',
        method: 'post',
        data,
        prefix: 'yuetaoGroup'
    })
}

// 高德活动--查看是否已经领取大礼包
export function isGetGaoDeDaLiBao(data) {
    return request({
        url: '/mall/isActivityBindCoupon',
        method: 'post',
        data,
        prefix: 'yuetaoGroup'
    })
}

// 高德活动--获取随机codeNumber
export function getCodeNumber(data) {
    return request({
        url: '/mall/shareUser',
        method: 'post',
        data,
        prefix: 'yuetaoGroup'
    })
}




//领券中心--2020.09.04
//获取领劵中心头部
export function getNewCoupon(data) {
    return request({
        // url: 'http://test-shop.yuelvhui.com/mall/coupon/getReceiveCentrumTop',
        url: '/mall/coupon/getReceiveCentrumTop',
        method: 'post',
        data,
        // prefix: 'center'
    })
}

//获取自营优惠卷
export function getYTCoupon(data) {
    return request({
        url: '/mall/V4/getSelfCouponIndex',
        method: 'post',
        data
    })
}

//获取cps优惠卷
export function getCPSCoupon(data) {
    return request({
        url: '/mall/V4/getCpsCouponIndex',
        method: 'post',
        data
    })
}

//限时秒杀
export function getNowDateCoupon(data) {
    return request({
        url: '/mall/coupon/getNowDateSeckillList',
        method: 'post',
        data
    })
}

//领取优惠卷 卷包
export function getCouponBag(data) {
    return request({
        // http://dev.yuetao-mall.com
        url: '/mall/coupon/receiveCoupons',
        method: 'post',
        data
    })
}

//获取已领取优惠卷包
export function getHasCoupon(data) {
    return request({
        // http://dev.yuetao-mall.com
        url: '/mall/V2/getCouponList',
        method: 'post',
        data
    })
}

//领取单张优惠卷
export function getSingleCoupon(data) {
    return request({
        // https://shop.yuelvhui.com
        url: '/mall/sendCoupon',
        method: 'post',
        data
    })
}



