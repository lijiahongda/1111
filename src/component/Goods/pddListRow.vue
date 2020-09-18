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
            <div class='boxCell' v-for="(item,index) in pddListRowData" :key="index">
                <div class="goodsbox" @click.prevent="jumpPddProduct(item.info.goods_id)">
                    <div class="goodsleft">
                        <img :src="item.info.goods_image_url" class="goodsimg">
                    </div>
                    <div class="goodsright">
                        <div>
                            <div class="goods_name">
                                <div class="goodsIcon">拼多多</div>
                                {{item.info.goods_name}}
                            </div>
                            <div class="goodsyhjdiv">
                                <!--接口 discount 数据有问题！！！！！！！-->
                                <div class="goodsyhj" v-for="(content,num) in item.coupon.slice(0,1)" :key="num">
                                    {{content.coupon_discount}}元优惠券
                                </div>
                                <div class="goodspl">{{item.info.sales_tip}}人购买</div>
                            </div>
                        </div>
                        <div class="goodsright_bottom">
                            <div class="goodspricediv">
                                <div class="goodspicediv">
                                    <div class="goodspricenow">¥{{item.info.jh_price}}</div>
                                    <div class="goodspriceold">¥{{item.info.min_normal_price}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="buyIt">抢</div>
                        <!--@click.stop="jump_buy(item.link ? item.link : '')"-->
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script>
    export default {
        name: 'pddListRow',
        props: ['pddListRowData', 'goodsParams'],
        data() {
            return {}
        },
        methods: {
            // jump_buy(url) {
            // location.href = url;
            // },

            onLoad() {
                this.$nextTick(() => {
                    this.$emit('sendPage', {nowPage: this.goodsParams.page + 1})
                })
            },

            //跳转拼多多商品详情
            jumpPddProduct(goodsId) {
                // /goodsDetailCPS?goodsId='商品ID'&status=（3:京东；4:拼多多；5:淘宝；6:唯品会）
                this.$router.push({
                    path: '/goodsDetailCPS',
                    query: {
                        goodsId: goodsId,
                        status: 4
                    }
                })
            },
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
    }

    .goodsimg {
        width: 100%;
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
        color: #ED2E2E;
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
        margin-bottom: 4px;
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
        color: #ED2E2E;
        font-weight: bold;
        font-size: 18px;
    }

    .goodspriceold {
        font-size: 12px;
        color: #999999;
        text-decoration: line-through;
        margin-left: 2px;
    }

    .buyIt {
        width: 40px;
        height: 40px;
        background-color: #ED2E2E;
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