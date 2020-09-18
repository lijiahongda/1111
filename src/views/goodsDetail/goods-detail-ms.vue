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
        <goodsInfo :flashInfo="flashInfo" :goodsStatus="goodsStatus" :goodsInfo="goodsInfo" />
        <div class="line"></div>
        <!-- 成长值，规格，区域，运费 -->
        <goodsHandle :goodsInfo="goodsInfo" />
        <!-- 商品评论 -->
        <div v-if="goodsInfo.comment.result.length > 0">
            <AssessList
                :comment="goodsInfo.comment"
                :goodsID="goodsInfo.product_id"
                :showMore="true"
            />
        </div>
        <div class="line" v-if="goodsInfo.comment.result.length > 0"></div>
        <!-- 商品详情 -->
        <div class="goods-detail-info">
            <div class="tit">商品详情</div>
            <div style="width:100%" v-html="goodsInfo.goodContent"></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload } from "vant";

Vue.use(Swipe).use(SwipeItem).use(Lazyload);

import { getMsGoodsDetail } from "@/services/goods.js";
import OpenApp from "@/component/GoodsDetail/goodsTopBtm";
import goodsInfo from "@/component/GoodsDetail/goodsInfo";
import goodsHandle from "@/component/GoodsDetail/goodsHandle";
import AssessList from "@/component/GoodsDetail/assessList";

export default {
    components: {
        OpenApp,
        goodsInfo,
        goodsHandle,
        AssessList,
    },
    data() {
        return {
            goodsStatus: 2, // 1:自营详情；2:秒杀详情；3:京东详情；4:拼多多详情；5:淘宝详情；6:唯品会详情
            goodsId: this.$route.query.goodsId ||this.$route.query.product_id || "", // 产品ID
            skuId: this.$route.query.skuid ||this.$route.query.product_sku_id || 0, // 产品规格ID
            activityId: this.$route.query.activityId || 0, // 活动ID
            room_id: this.$store.state.room_id || 0, // 关系ID
            uid: window.localStorage.getItem("uid") || 0, // 用户ID
            goodsInfo: {}, // 商品信息
            flashInfo: {}, // 秒杀信息
            isReady: false // 详情接口是否请求完成
        };
    },
    methods: {
        getGoodsDetail() {
            // 获取秒杀详情
            let data = {
                goodsId: this.goodsId, // 产品ID
                skuId: this.skuId, // 产品规格ID
                room_id:this.room_id,
                activityId: this.activityId, // 活动ID
                uid: this.uid, // 用户ID
            };
            getMsGoodsDetail(data).then((res) => {
                if (res.code === 200) {
                    res.productInfo.banner = res.productInfo.banner || [];
                    res.productInfo.saleList = res.productInfo.saleList || [];
                    res.productInfo.comment = res.productInfo.comment || {};
                    this.flashInfo = res.FlashGoodsInfo;
                    this.goodsInfo = res.productInfo;
                    this.isReady = true;
                }else{
                    this.$router.go(-1);
                }
            });
        }
    },
    mounted() {
        this.$store.commit('changeInterceptUrl',window.location.href)
        // this.$store.dispatch('loginIntercept',this.$route.query)
        this.getGoodsDetail();
    }
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
