<template>
    <div class="goods-detail" v-if="isReady">
        <!-- 顶部和底部 -->
        <openApp :goodsStatus="goodsStatus" :goodsInfo="goodsInfo" />
        <!-- banner图片 -->
        <van-swipe :autoplay="3000" indicator-color="#ED2E2E">
            <van-swipe-item
                v-for="(image, index) in goodsInfo.banner"
                :key="index"
            >
                <img class="banner" v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
        <!-- 商品价格，商品名称，商品描述 -->
        <goodsInfo
            :flashInfo="{}"
            :goodsStatus="goodsStatus"
            :goodsInfo="goodsInfo"
        />
        <!-- 商品详情 -->
        <div class="goods-detail-info" v-if="goodsInfo.goodContent">
            <div class="tit">商品详情</div>
            <div style="width:100%" v-html="goodsInfo.goodContent" v-if="goodsStatus != 6 && goodsStatus != 7"></div>
            <div v-else style="width:100%">
                <img style="width:100%" v-for="(item,index) in goodsInfo.goodContent" :key="index" :src="item">
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload } from "vant";

Vue.use(Swipe).use(SwipeItem).use(Lazyload);

import { getJDGoodsDetail, getPDDGoodsDetail, getTBGoodsDetail, getWPHGoodsDetail,getSNGoodsDetail } from "@/services/goods.js";
import OpenApp from "@/component/GoodsDetail/goodsTopBtm";
import goodsInfo from "@/component/GoodsDetail/goodsInfo";

export default {
    components: {
        OpenApp,
        goodsInfo
    },
    data() {
        return {
            goodsStatus: 3, // 1:自营详情；2:秒杀详情；3:京东详情；4:拼多多详情；5:淘宝详情；6:唯品会详情
            goodsId: "", // 产品ID
            codeNumber: '', // 分享码
            room_id:"",//关系id
            live_id:"",//直播间id
            live_people_id:"",//主播id
            uid: 0, // 用户ID
            goodsInfo: {}, // 商品信息
            supplier_code:"",//苏宁渠道
            isReady: false, // 详情接口是否请求完成
        };
    },
    methods: {
        getJDGoodsDetail() {
            // 获取京东详情
            let data = {
                goods_id: this.goodsId,
                codeNumber:this.codeNumber,
                room_id:this.room_id,
                live_id:this.live_id,
                live_people_id:this.live_people_id,
                liveId: 0,
                liveMid: 0,
                channel_id: 100,
                type: 2, // 1 app 2 h5 3 小程序
                uid: this.uid, // 用户ID
            };
            getJDGoodsDetail(data).then((res) => {
                if (res.code == 200) {
                    let obj = {
                        banner: res.data.goods_image || [],
                        goodName: res.data.goods_name || "",
                        goodsInfo: res.data.goods_desc || '',
                        channelIcon:"https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-02-23/09/yuelvhuiI9ee3xGzmq1582420967.png",
                        goodPrice: res.data.original_price,
                        goodVipPrice: res.data.jd_price,
                        goodContent: res.data.detailed,
                        coupon: res.data.coupon,
                        buy_url: res.data.buy_url
                    };
                    this.goodsInfo = obj;
                    this.isReady = true;
                }else{
                    this.$router.go(-1);
                }
            });
        },
        getPDDGoodsDetail() {
            // 获取拼多多详情
            let data = {
                goods_id: this.goodsId,
                channel_id: 98,
                codeNumber:this.codeNumber,
                room_id:this.room_id,
                live_id:this.live_id,
                live_people_id:this.live_people_id,
                type: 2, // 1 app 2 h5 3 小程序
                uid: this.uid, // 用户ID
            };
            getPDDGoodsDetail(data).then((res) => {
                if (res.code == 200) {
                    let obj = {
                        banner: res.data.info && (res.data.info.goods_gallery_urls || []),
                        goodName: res.data.info && (res.data.info.goods_name || ""),
                        goodsInfo: res.data.info && (res.data.info.goods_desc || ''),
                        goodPrice: res.data.info && (res.data.info.jh_price || ''),
                        goodVipPrice: res.data.info && (res.data.info.min_normal_price || ''),
                        goodContent: res.data.info && (res.data.info.goods_gallery_urls_info || ''),
                        coupon: {
                            discount: res.data.coupon.length && (res.data.coupon[0].coupon_discount || 0),
                            use_end_time: res.data.coupon.length && (res.data.coupon[0].coupon_end_time || '2100-01-01')
                        },
                        buy_url: res.data.buy_url
                    };
                    this.goodsInfo = obj;
                    this.isReady = true;
                }else{
                    this.$router.go(-1);
                }
            });
        },
        getTBGoodsDetail(){
            // 获取淘宝商品详情
            let data = {
                id: this.goodsId,
                codeNumber:this.codeNumber,
                room_id:this.room_id,
                live_id:this.live_id,
                live_people_id:this.live_people_id,
                mid: this.uid
            }
            getTBGoodsDetail(data).then(res => {
                if(res.code == 200){
                    let obj = {
                        banner: res.data.item && (res.data.item[0].small_images.string || []),
                        goodName: res.data.item && (res.data.item[0].title || ''),
                        goodsInfo: res.data.item && (res.data.item[0].nick || ''),
                        goodPrice: res.data.item && (res.data.item[0].reserve_price || 0),
                        goodVipPrice: res.data.item && (res.data.item[0].zk_final_price || 0),
                        goodContent: res.data.item && (res.data.item[0].string_info || ''),
                        buy_url: res.data.item && (res.data.item[0].item_url || ''),
                    };
                    this.goodsInfo = obj;
                    this.isReady = true;
                }else{
                    this.$router.go(-1);
                }
            })
        },
        getWPHGoodsDetail(){
            // 获取唯品会详情
            let data = {
                goods_id: this.goodsId,
                codeNumber:this.codeNumber,
                room_id:this.room_id,
                live_id:this.live_id,
                live_people_id:this.live_people_id,
                uid: this.uid
            }
            getWPHGoodsDetail(data).then(res => {
                if(res.code == 200){
                    let obj = {
                        banner: res.data && (res.data.goods_image || []),
                        goodName: res.data && (res.data.goods_name || ''),
                        goodsInfo: res.data && (res.data.goods_desc || ''),
                        goodPrice: res.data && (res.data.original_price || 0),
                        goodVipPrice: res.data && (res.data.wph_price || 0),
                        goodContent: res.data && (res.data.detailed || []),
                        buy_url: res.data && (res.data.buy_url || ''),
                    };
                    this.goodsInfo = obj;
                    this.isReady = true;
                }else{
                    this.$router.go(-1);
                }
            })
        },
        getSNGoodsDetail(){
            // 获取苏宁详情
            let data = {
                goods_id: this.goodsId,
                codeNumber:this.codeNumber,
                room_id:this.room_id,
                live_id:this.live_id,
                live_people_id:this.live_people_id,
                supplier_code:this.supplier_code,
                uid: this.uid,
                version:"v2"
            }
            getSNGoodsDetail(data).then(res => {
                if(res.code == 200){
                    let obj = {
                        banner: res.data && (res.data.goods_image || []),
                        goodName: res.data && (res.data.goods_name || ''),
                        goodsInfo: res.data && (res.data.goods_desc || ''),
                        goodPrice: res.data && (res.data.original_price || 0),
                        goodVipPrice: res.data && (res.data.price || 0),
                        goodContent: res.data && (res.data.detailed || []),
                        buy_url: res.data && (res.data.jump_sn || ''),
                    };
                    this.goodsInfo = obj;
                    this.isReady = true;
                }else{
                    this.$router.go(-1);
                }
            })
        }
    },
    mounted() {
        this.$store.commit('changeInterceptUrl',window.location.href)
        // this.$store.dispatch('loginIntercept',this.$route.query)
        let _sgoodsstatus = Number(this.$route.query.status || 3); // 1:自营详情；2:秒杀详情；3:京东详情；4:拼多多详情；5:淘宝详情；6:唯品会详情；7:苏宁详情
        this.goodsStatus=_sgoodsstatus;
        this.goodsId=this.$route.query.goodsId || this.$route.query.id ||  ""; // 产品ID
        this.codeNumber=this.$store.state.codeNumber || ""; // codeID
        this.room_id=this.$store.state.room_id || ""; // 关系ID
        this.live_id=this.$store.state.live_id || ""; // 直播间ID
        this.live_people_id=this.$store.state.live_people_id || ""; // 主播ID
        this.supplier_code = this.$route.query.supplier_code||"";//苏宁渠道
        this.uid=window.localStorage.getItem("uid") || 0; // 用户ID
        switch(_sgoodsstatus){
            case 3:
                this.getJDGoodsDetail();
                break;
            case 4:
                this.getPDDGoodsDetail();
                break;
            case 5:
                this.getTBGoodsDetail();
                break;
            case 6:
                this.getWPHGoodsDetail();
                break;
            case 7:
                this.getSNGoodsDetail();
                break;
            default:
                this.getJDGoodsDetail();
        }
    },
};
</script>

<style lang="less" scoped>
.goods-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 75px;
    overflow-x: hidden;
    background: #f5f7fa;
    .banner {
        width: 100%;
        height: 357px;
        background: #999;
    }
    .line {
        width: 100%;
        height: 7px;
        background: #f8f8f8;
    }
    .goods-detail-info {
        width: 100%;
        background: #fff;
        .tit {
            width: 100%;
            height: 38px;
            line-height: 38px;
            text-align: center;
            font-size: 15px;
            color: #141414;
        }
        ::v-deep img {
            display: block;
            width: 100%;
        }
    }
}
</style>
