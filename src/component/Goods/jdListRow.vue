<template>
    <div>
        <van-list
                v-model="goodsParams.loading"
                :finished="goodsParams.finished"
                finished-text="已加载完毕"
                offset="300"
                :error.sync="goodsParams.error"
                error-text="请求失败，点击重新加载"
                :immediate-check="false"
                @load="onLoad">
            <!--van-cell 第一、二项不渲染 无 data-v-xxxxx 故改为div-->
            <div class='boxCell' v-for="(item,index) in JdListRowData" :key="index">
                <div class="goodsbox" @click.prevent="jumpJdProduct(item.goodsInfo.goods_id)">
                    <div class="goodsleft">
                        <img :src="item.goodsInfo.goods_image" class="goodsimg">
                    </div>
                    <div class="goodsright">
                        <div>
                            <div class="goods_name">
                                <div class="goodsIcon">JD</div>
                                {{item.goodsInfo.goods_name}}
                            </div>
                            <div class="goodsyhjdiv">
                                <div class="goodsyhj" v-if="item.coupon.discount">{{item.coupon.discount}}元优惠券</div>
                                <div class="goodspl">已售{{item.goodsInfo.sale_num}}件</div>
                                <!--                        {{item.coupon.discount}}-->
                            </div>
                        </div>
                        <div class="goodsright_bottom">
                            <div class="goodspricediv">
                                <div class="goodspicediv">
                                    <div class="goodspricenow">¥{{item.goodsInfo.jd_price}}</div>
                                    <div class="goodspriceold">¥{{item.goodsInfo.original_price}}</div>
                                </div>

                            </div>
                            <div class="goodsExtend" @click.stop="jump_buy(item.coupon.link)">
                                推广赚¥{{item.commission_info.earn_price}}
                            </div>
                        </div>
                        <!-- <div class="buyIt" @click.prevent="jump_buy(item.coupon.link)">抢</div>-->
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script>
    import {jdHomeSearch} from '@/services/api';
    export default {
        name: 'jdListRow',
        props: ['JdListRowData', 'goodsParams'],
        data() {
            return {

            }
        },
        methods: {
            jump_buy(url) {
                location.href = url;
            },
            onLoad() {
                this.$nextTick(() => {
                    this.$emit('sendPage', {nowPage: this.goodsParams.page + 1})
                })
            },
            //跳转京东商品详情
            jumpJdProduct(goodsId) {
                // /goodsDetailCPS?goodsId='商品ID'&status=（3:京东；4:拼多多；5:淘宝；6:唯品会）
                this.$router.push({
                    path: '/goodsDetailCPS',
                    query: {
                        goodsId: goodsId,
                        status: 3
                    }
                })
            }
        },
        mounted() {

        }
    }
</script>
<style lang="less" scoped>
    .boxCell {
        margin-bottom: 8px;
        border-radius: 8px;
        background: #ffffff;
        padding: 12px 14px;
    }

    .boxCell::after {
        border-bottom: none;
    }

    .goodsbox {
        background: #ffffff;
        /*width: 375px;*/
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        width: inherit;
    }

    .goodsleft {
        width: 140px;
        height: 140px;
        /*border:1px solid red;*/

        .goodsimg {
            height: 100%;
            max-width: 100%;
            /*max-height: inherit;*/
        }
    }

    .goodsright {
        width: 195px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        // flex-direction: column;
        align-content: space-between;
    }

    .goodsIcon {
        display: inline-block;
        /*width: 20px;*/
        height: 20px;
        line-height: 20px;
        padding: 0 2px;
        margin-right: 3px;
        border-radius: 1px;
        background: rgba(221, 39, 39, 1);
        color: #fff;
        font-weight: bold;
    }

    .goods_name {
        color: #141414;
        font-size: 15px;
        margin-top: 4px;
        height: 38px;
        line-height: 20px;
        /*font-weight: bold;*/
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .goodsyhjdiv {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 4px;
    }

    .goodsyhj {
        background: url("../../assets/images/yhj.png") no-repeat;
        background-size: 82px 22px;
        width: 82px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        font-size: 12px;
        color: #ed2e2e;
    }

    .goodspl {
        font-size: 12px;
        color: #999999;
        margin-left: 5px;
    }

    .goodsright_bottom {
        width: 100%;
    }

    .goodspricediv {
        /*margin-top: 5px;*/
        margin-bottom: 2px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .goodspicediv {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .goodspricenow {
        color: #ed2e2e;
        font-weight: bold;
        font-size: 18px;
    }

    .goodspriceold {
        font-size: 12px;
        color: #999999;
        text-decoration: line-through;
        margin-left: 2px;
    }

    .goodsExtend {
        width: 89px;
        text-align: center;
        height: 22px;
        line-height: 22px;
        border-radius: 11px;
        border: 1px solid rgba(237, 46, 46, 1);

        /*width:73px;*/
        /*height:17px;*/
        font-size: 12px;
        /*font-family:PingFangSC-Regular,PingFang SC;*/
        font-weight: 400;
        color: rgba(237, 46, 46, 1);
    }

    .buyIt {
        width: 40px;
        height: 40px;
        background-color: #ed2e2e;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        position: absolute;
        right: 0;
        bottom: 0;
    }
</style>