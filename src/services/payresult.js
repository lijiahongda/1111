import request from '@/services/request'

/**
 * 获取推荐商品
 * */
export function getRecommendGoods(data) {
	return request({
		url: '/mall/V2/recommendGoodsByOrderSn',
		method: 'post',
		data,
		prefix:'jile'
	})
}
/**
 * 支付结果
 * */
export function getPayResult(data) {
	return request({
		url: '/app/mall/getOrderDetailV4',
		method: 'post',
		data,
		prefix:'jile'
	})
}
/**
 * 订单详情
 * */
export function getOrderDetail(data) {
	return request({
		url: '/app/member/myOrder/detail',
		method: 'post',
		data,
		prefix:'jile'
	})
}
/**
 * 红包详情
 * */
export function getHbDetail(data) {
	return request({
		url: '/coupon/info',
		method: 'post',
		data,
		prefix:'jile'
	})
}
/**
 * 领取红包
 * */
export function getHb(data) {
	return request({
		url: '/coupon/receive',
		method: 'post',
		data,
		prefix:'jile'
	})
}
/**
 * 获取分享内容
 * */
export function getShareContent(data) {
	return request({
		url: '/share/wapMallProductShareV4',
		method: 'post',
		data,
		prefix:'jile'
	})
}


