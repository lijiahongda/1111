import request from '@/services/request'

/**
 * 直播详情
 * */
export function videodetail(data) {
    return request({
        url: 'https://open.daren.tech/app/LiveVideo/getRoomDetails',
        method: 'post',
        headers: {
            hideError: true
        },
        params: data
    })
}

/**
 * 直播商品
 * */
export function liveShopInfo(data) {
    return request({
        url: 'https://open.daren.tech/app/LiveGoods/getLiveShoppingList',
        method: 'post',
        headers: {
            hideError: true,
            hideLoading: true
        },
        params: data
    })
}

/**
 * 约朋友的海报
 * */
export function appointmentPoster(data) {
    return request({
        url: 'https://open.daren.tech/app/share/liveNoticeShare',
        method: 'post',
        data
    })
}

/**
 * 预约
 * */
export function followAct(data) {
    return request({
        url: 'https://open.daren.tech/app/focus/toFollow',
        method: 'get',
        params: data
    })
}
