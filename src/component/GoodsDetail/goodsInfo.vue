<template>
    <div>
        <div class="miaosha-box" v-if="goodsStatus == 2">
            <div class="price">
                <div class="n-price">
                    <span class="msj">秒杀价</span>
                    <span class="m-icon">¥</span>
                    <span class="count">{{flashInfo.goodVipPrice}}</span>
                </div>
                <div class="o-price">官网价¥{{flashInfo.goodPrice}}</div>
            </div>
            <div class="times">
                <div class="ms-txt"></div>
                <div class="times-box">
                    <span class="tim">{{countDownHour}}</span> : <span class="tim">{{countDownMinute}}</span> :
                    <span class="tim">{{countDownSecond}}</span>
                </div>
            </div>
        </div>
        <div class="goods-info">
            <div class="price-info" v-if="goodsStatus != 2">
                <div class="price">
                    <div class="price-now">
                        <span class="special">¥</span>
                        <span>{{ goodsInfo.goodVipPrice }}</span>
                    </div>
                    <div class="price-old">¥{{ goodsInfo.goodPrice }}</div>
                </div>
                <div class="handle">
                    <!-- <div class="love">
                        <img
                            class="icon-love"
                            src="../../assets/images/icon-love.png"
                        />
                        <div>收藏</div>
                    </div>
                    <div class="share">
                        <img
                            class="icon-share"
                            src="../../assets/images/icon-share.png"
                        />
                        <div>分享</div>
                    </div> -->
                </div>
            </div>
            <div class="goods-title">
                <img
                    v-if="goodsInfo.channelIcon"
                    style="vertical-align: middle;"
                    class="types"
                    :src="goodsInfo.channelIcon"
                />
                <span style="vertical-align: middle;">{{
                    goodsInfo.goodName
                }}</span>
            </div>
            <p class="p">{{ goodsInfo.goodsInfo }}</p>
            <!-- 秒杀不展示悦淘优选 -->
            <div class="attention" v-if="goodsStatus == 1 || goodsStatus == 2">
                <img class="sd" src="../../assets/images/shan-dian.png" />
                <span>悦淘优选·闪电发货·极速退货·七天无理由退换货</span>
            </div>
        </div>
        <div class="cps-box" v-if="(goodsStatus == 3 || goodsStatus == 4) && goodsInfo.coupon.discount && goodsInfo.coupon.use_end_time" @click="toOutside(goodsInfo.buy_url)">
            <div class="cps-coupon">
                <div class="price">
                    <span class="spe">¥</span>
                    <span>{{goodsInfo.coupon.discount}}</span>
                </div>
                <div class="inf">
                    <div class="spe">优惠券</div>
                    <div>有效期到{{goodsInfo.coupon.use_end_time}}</div>
                </div>
                <div class="get-coupon">立即领取</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant"; // 提示框

Vue.use(Toast)
export default {
    props: {
        goodsInfo: { // 商品详情数据
            type: Object,
            default: {}
        },
        goodsStatus: { // 1:自营详情；2:秒杀详情；3:京东详情；4:拼多多详情；5:淘宝详情；6:唯品会详情
            type: Number,
            default: 1
        },
        flashInfo: { // 秒杀信息
            type: Object,
            default: {}
        }
    },
    methods: {
        startTimer (totalSecond) {
            let that = this
            // 倒计时
            var totalSecond = totalSecond;
            var interval = setInterval(function () {
                // 秒数
                var second = totalSecond;
                // 小时位
                var hr = Math.floor((second) / 3600);
                var hrStr = hr.toString();
                if (hrStr.length == 1) hrStr = '0' + hrStr;
                // 分钟位
                var min = Math.floor((second - hr * 3600) / 60);
                var minStr = min.toString();
                if (minStr.length == 1) minStr = '0' + minStr;
                // 秒位
                var sec = second - hr * 3600 - min * 60;
                var secStr = sec.toString();
                if (secStr.length == 1) secStr = '0' + secStr;
                this.countDownHour = hrStr
                this.countDownMinute = minStr
                this.countDownSecond = secStr
                totalSecond--;
                if (totalSecond < 0) {
                    Toast('秒杀商品已抢光')
                    clearInterval(interval);
                    setTimeout(() => {
                        window.history.go(-1)
                    }, 1000)
                    this.countDownHour = '00'
                    this.countDownMinute = '00'
                    this.countDownSecond = '00'
                }
            }.bind(this), 1000);
        },
        toOutside(url){
            // 点击去购买
            if (window.localStorage.getItem("uid")) {
                window.location.href = url
            } else {
                this.$store.dispatch("loginIntercept", this.$route.query);
            }
            
        }
    },
    mounted(){
        if(this._props.goodsStatus == 2){
            let data = this._props.flashInfo
            if (data.state == 1) {
                this.startTimer(data.startTime - data.nowTime)
            } else {
                this.startTimer(data.endTime - data.nowTime)
            }
        }
    },
    data() {
        return {
            countDownHour: '00',
            countDownMinute: '00',
            countDownSecond: '00'
        };
    },
    created() {},
};
</script>

<style lang="less" scoped>
.miaosha-box {
    width: 100%;
    height: 70px;
    background: #ff001c;
    display: flex;
    justify-content: space-between;
    .price {
        width: 234px;
        height: 70px;
        background: #ff001c;
        box-sizing: border-box;
        padding-left: 18px;
        padding-top: 5px;
        color: #fff;
        .n-price {
            height: 45px;
            display: flex;
            align-items: center;
            .msj {
                font-size: 13px;
                margin-right: 11px;
            }
            .m-icon {
                font-weight: bold;
                font-size: 20px;
            }
            .count {
                font-weight: bold;
                font-size: 30px;
            }
        }
        .o-price {
            font-size: 14px;
            text-align: left;
        }
    }
    .times {
        width: 141px;
        height: 70px;
        background-image: url("../../assets/images/miaosha-bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        .ms-txt {
            width: 81px;
            height: 22px;
            background: url("../../assets/images/xsms.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            right: 14px;
            top: 8px;
        }
        .times-box {
            position: absolute;
            right: 14px;
            bottom: 5px;
            .tim {
                display: inline-block;
                width: 22px;
                height: 22px;
                font-size: 13px;
                color: #fff;
                border-radius: 4px;
                background: #201e1d;
                line-height: 22px;
            }
        }
    }
}
.goods-info {
    width: 100%;
    padding: 9px 12px;
    background: #fff;
    .price-info {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        .price {
            display: flex;
            align-items: center;
            .price-now {
                display: inline-block;
                color: #ff001c;
                font-size: 21px;
                margin-right: 11px;
                .special {
                    font-size: 14px;
                }
            }
            .price-old {
                display: inline-block;
                color: #999999;
                font-size: 13px;
                text-decoration: line-through;
            }
        }
        .handle {
            font-size: 10px;
            color: #999;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .love {
                .icon-love {
                    width: 15px;
                    height: 14px;
                    margin-bottom: 2.5px;
                }
                // margin-right: 22px;
            }
            .share {
                .icon-share {
                    width: 13px;
                    height: 13px;
                    margin-bottom: 5px;
                }
            }
        }
    }
    .goods-title {
        font-size: 14px;
        color: #141414;
        text-align: justify;
        margin-bottom: 12px;
        display: flex;
        justify-content: flex-start;
        align-items: start;
        .types {
            width: 16px;
            margin-right: 5px;
        }
    }
    .p {
        width: 100%;
        font-size: 11px;
        color: #999999;
        text-align: left;
        margin-bottom: 5px;
    }
    .attention {
        width: 100%;
        height: 30px;
        background: #ffe9e9;
        border-radius: 5px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 11px;
        font-size: 13px;
        color: #ff001b;
        margin-top: 13px;
        .sd {
            width: 20px;
            height: 20px;
        }
    }
}
.cps-box {
    width: 100%;
    height: 106px;
    background: #f5f7fa;
    box-sizing: border-box;
    padding: 8px 14px;
    .cps-coupon {
        width: 100%;
        height: 78px;
        background: url("../../assets/images/coupon-bg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        .price {
            font-size: 26px;
            color: #ed2e2e;
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
            font-weight: bold;
            .spe {
                font-size: 16px;
            }
        }
        .inf {
            color: #ed2e2e;
            font-size: 12px;
            position: absolute;
            left: 108px;
            top: 50%;
            transform: translateY(-50%);
            .spe {
                font-size: 15px;
                margin-bottom: 4px;
                text-align: left;
            }
        }
        .get-coupon {
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #feffed;
            font-size: 14px;
            position: absolute;
            right: 13px;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 15px;
            background: linear-gradient(
                180deg,
                rgba(247, 91, 91, 1) 0%,
                rgba(237, 46, 46, 1) 100%
            );
        }
    }
}
</style>
