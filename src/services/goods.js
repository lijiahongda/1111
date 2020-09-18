import request from '@/services/request.js'

// 获取自营商品详情
export function getZyGoodsDetail(data) {
	return request({
		url: '/mall/getProductBuyDatailV4',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取秒杀商品详情
export function getMsGoodsDetail(data) {
	return request({
		url: '/mall/flashDetail',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取京东商品详情
export function getJDGoodsDetail(data) {
	return request({
		url: '/outside/jdGoodsInfo',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取拼多多商品详情
export function getPDDGoodsDetail(data) {
	return request({
		url: '/outside/pddGoodsInfo',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取淘宝商品详情
export function getTBGoodsDetail(data) {
	return request({
		url: '/outside/tbkdetail',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取唯品会商品详情
export function getWPHGoodsDetail(data) {
	return request({
		url: '/outside/wph/getGoodDetail',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取苏宁商品详情
export function getSNGoodsDetail(data) {
	return request({
		url: '/outside/suning/getGoodsDetail',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取商品详情顶部文案
export function textData(data) {
	return request({
		url: '/mall/h5DataList',
		method: 'post',
		data,
        prefix:'',
        headers: {
            hideLoading: true
        }
	})
}

// 获取预估成长值文案
export function growthValueRemind(data) {
	return request({
		url: '/mall/getGrowthValueRemind',
		method: 'get',
		data,
		prefix:''
	})
}

// 获取评论列表
export function commentList(data) {
	return request({
		url: '/mall/productCommentList',
		method: 'post',
		data,
		prefix:''
	})
}

// 加入购物车
export function addShopCar(data) {
	return request({
		url: '/mall/cart/createV4',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取购物车列表
export function getShopCarList(data) {
	return request({
		url: '/mall/cart/listV4',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取失效商品列表
export function getLoseGoods(data) {
	return request({
		url: '/mall/cart/getLoseEfficacyCartList',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取推荐商品列表
export function getGoodGoods(data) {
	return request({
		url: '/mall/V2/getAboutShopCart',
		method: 'post',
		data,
		prefix:''
	})
}

// 处理购物车商品数量
export function handleGoodsCount(data) {
	return request({
		url: '/mall/cart/updateV4',
		method: 'post',
		data,
        prefix:''
	})
}

// 改变购物车选中状态
export function changeChoseStatus(data) {
	return request({
		url: '/mall/cart/updateCartStatus',
		method: 'post',
		data,
		prefix:''
	})
}

// 删除购物车商品
export function deleteGoods(data) {
	return request({
		url: '/mall/cart/delete',
		method: 'post',
		data,
		prefix:''
	})
}

// 获取微信配置信息
export function getWxConfig(data) {
	return request({
		url: '/app/newWechatShareH5',
		method: 'get',
		params: data,
		prefix:''
	})
}

// 规格改变时，获取商品信息
export function skuChangeInfo(data) {
	return request({
		url: '/mall/getProductSkuDatail',
		method: 'post',
		data,
        prefix:'',
        headers: {
            hideLoading: true
        }
	})
}
