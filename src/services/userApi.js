import request from '@/services/request.js'

/**
 * 获取手机验证码
 * */
export function sendNewByWeChat(data) {
  return request({
    url: '/app/auth/sendNewByWeChat',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 * 获取邮箱验证码
 * */
export function sendSmsCode(data) {
  return request({
    url: '/app/auth/sendSmsCode',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 * 获取语音验证码文案
 * */
export function voiceSendTips() {
  return request({
    url: '/app/auth/voiceSendTips',
    method: 'post',
    prefix: 'yuetaoGroup'
  })
}

/**
 * 获取邮箱验证码
 * */
export function sendVoiceVerifyCode(data) {
  return request({
    url: '/app/auth/sendVoiceVerifyCode',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 * 判断是否是老用户
 * */
export function isCheckUserRegister(data) {
  return request({
    url: '/app/isCheckUserRegister',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 * 登录
 * */
export function verifyAndRegister(data) {
  return request({
    url: '/app/auth/verifyAndRegister',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}
/**
 * 绑定手机注册
 * */
export function Registers(data) {
  return request({
    url: '/app/member/register',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}


/**
 * 绑定邮箱注册
 * */
export function smsRegister(data) {
  return request({
    url: '/app/auth/smsRegister',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 * 邮箱绑定手机
 * */
export function bindMobile(data) {
  return request({
    url: '/app/auth/bindMobile',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 * 退出
 * */
export function loginOut(data) {
  return request({
    url: '/app/auth/loginOut',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 * 获取邀请码用户信息
 * */
// export function getParentInfo(data) {
// 	return request({
// 		url: '/app/member/v4/getParentInfo',
// 		method: 'get',
// 		data,
// 		prefix:'yuetaoGroup'
// 	})
// }

// 获取邀请人信息
export function getshowTip(code) {
  return request({
    url: 'app/member/v4/getParentInfo/' + code,
    method: 'get',
    prefix: 'yuetaoGroup'
  })
}

// 绑定邀请人
export function memberRegister(data) {
  return request({
    url: '/app/member/register',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 * 微信授权第一步
 * */
export function getWxAppId(data) {
  return request({
    url: '/hf/getWxAppId',
    method: 'post',
    data,
    prefix: 'yuelvhui'
  })
}

/**
 * 微信授权第二步
 * */
export function getCodeByOpenid(data) {
  return request({
    url: '/app/getCodeByOpenid',
    method: 'post',
    data,
    prefix: 'yuelvhui',
    headers: {
      hideError: true
    }
  })
}




/**
 * 获取用户优惠券
 * */


/**
 * 获取用户收货地址
 * */
export function addressH5List(data) {
  return request({
    url: '/app/mall/address/h5List',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

/**
 *添加用户收货地址
 * */
export function addressH5Create(data) {
  return request({
    url: '/app/mall/address/h5Create',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}



// --------------------------------------------------------------------
// 个人中心页
// 个人中心用户详情
export function MemberInfo(data) {
  return request({
    url: '/app/h5/MemberInfo',
    method: 'post',
    data,
    prefix: 'yuelvhui'
  })
}
// 个人中心收益
export function revenueStatistics(data) {
  return request({
    url: '/app/h5/revenueStatistics',
    method: 'post',
    data,
    prefix: 'yuelvhui'
  })
}

// 商品排行前10
export function getSalesRankingList(data) {
  return request({
    url: '/stall/getSalesRankingList',
    method: 'post',
    data,
    prefix: 'shopyuelvhui'
  })
}
// 优惠券查询
export function couponGroupMember(data) {
  return request({
    url: '/app/h5/couponList',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

// 个人设置页
//修改姓名
export function truename(data) {
  return request({
    url: '/app/member/basic/update/truename',
    method: 'post',
    data,
    prefix: 'yuelvhui'
  })
}
//修改昵称
export function nickname(data) {
  return request({
    url: '/app/member/basic/update/nickname',
    method: 'post',
    data,
    prefix: 'yuelvhui'
  })
}
//修改性别
export function gender(data) {
  return request({
    url: '/app/member/basic/update/gender',
    method: 'post',
    data,
    prefix: 'yuelvhui'
  })
}



// 下单页面
// 普通商品结算
export function getProuctBlanceInfoV4(data) {
  return request({
    url: '/mall/getProuctBlanceInfoV4',
    method: 'post',
    data,
    prefix: 'shopyuelvhui'
  })
}

// 普通商品下单
export function createOrderByProductV4(data) {
  return request({
    url: '/mall/createOrderByProductV4',
    method: 'post',
    data,
    prefix: 'shopyuelvhui'
  })
}

// 秒杀商品结算
export function flashBalanceNew(data) {
  return request({
    url: '/mall/flashBalanceNew',
    method: 'post',
    data,
    prefix: 'shopyuelvhui'
  })
}

// 秒杀商品下单
export function createFlashOrderNew(data) {
  return request({
    url: 'mall/createFlashOrderNew',
    method: 'post',
    data,
    prefix: 'shopyuelvhui'
  })
}

// 购物车商品结算
export function getCartBlanceInfoV4(data) {
  return request({
    url: '/mall/cart/getCartBlanceInfoV4',
    method: 'post',
    data,
    prefix: 'shopyuelvhui'
  })
}

// 购物车商品下单
export function createOrderByCartV4(data) {
  return request({
    url: '/mall/createOrderByCartV4',
    method: 'post',
    data,
    prefix: 'shopyuelvhui'
  })
}

// 支付
export function newMallPayV4(data) {
  return request({
    url: '/app/newMallPayV4',
    method: 'post',
    data,
    prefix: 'yuelvhui'
  })
}





// ---------------------------
// 获取商品规格
export function getProductBuyDatailV4(data) {
  return request({
    url: '/mall/getProductBuyDatailV4',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

// 获取商品规格
export function getProductSkuDatail(data) {
  return request({
    url: '/mall/getProductSkuDatail',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

// 凑单详情
export function getActivityCategoryInfo(data) {
  return request({
    url: '/mall/V3/getActivityCategoryInfo',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}
// 凑单列表
export function newActivityList(data) {
  return request({
    url: '/mall/V3/newActivityList',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

// 购物车列表
export function ShoplistV4(data) {
  return request({
    url: '/mall/cart/listV4',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

// 加入购物车列表
export function ShopcreateV4(data) {
  return request({
    url: '/mall/cart/createV4',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}


// 领券接口
export function getCoupon(data) {
  return request({
    url: 'mall/sendCoupon',
    method: 'post',
    data,
    prefix: 'shopyuelvhui'
  })
}

// 地址选择省
export function getProvince(data) {
  return request({
    url: '/app/mall/jd/getProvince',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

// 地址选择市
export function getCity(data) {
  return request({
    url: '/app/mall/jd/getCity',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

// 地址选择区
export function getArea(data) {
  return request({
    url: '/app/mall/jd/getArea',
    method: 'post',
    data,
    prefix: 'yuetaoGroup'
  })
}

