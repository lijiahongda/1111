<template>
    <div class="shop-car">
        <div v-if="shopCarList.length > 0 && isReady">
            <div class="list-box" v-for="(item,index) in shopCarList" :key="index">
                <div class="store-title">
                    <div :class="item.storechose ? 'choose choosen' : 'choose'" @click="handleStoreChose(index)"></div>
                    <img class="store-logo" :src="item.imgIcon" />
                    <span>{{item.name}}</span>
                </div>
                <van-swipe-cell class="list-boxs" v-for="(ele,idx) in item.data" :key="idx">
                    <div class="list" @click.stop="goodsDetail(ele)">
                        <div v-if="ele.selected == 1" class="choose choosen mt20" @click.stop="changeChosenStatus(ele.cartId,0,ele.channelId)"></div>
                        <div v-if="ele.selected == 0" class="choose mt20" @click.stop="changeChosenStatus(ele.cartId,1,ele.channelId)"></div>
                        <img class="goods-pic" :src="ele.goodCover" />
                        <div class="goods-info">
                            <div class="t-box">
                                <div class="tit">
                                    {{ele.goodName}}
                                </div>
                                <div class="guige">{{ele.goodSpec}}</div>
                                <div class="miaosha" v-if="ele.activityId">限时秒杀</div>
                            </div>
                            <div class="b-box">
                                <div class="price-box">
                                    <div class="old-price">官网价¥{{ele.goodPrice}}</div>
                                    <div class="new-price">
                                        <span class="icon">¥</span>
                                        <span v-if="!ele.activityId">{{ele.vipPric}}</span>
                                        <span v-else>{{ele.skPrice}}</span>
                                    </div>
                                </div>
                                <div class="goods-count">
                                    <div class="handle">
                                        <div class="edge" @click.stop="changeCount(ele.cartId,1,ele.goodNum)">-</div>
                                        <div class="count">{{ele.goodNum}}</div>
                                        <div class="add" @click.stop="changeCount(ele.cartId,0,ele.goodNum)">+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <van-button
                            square
                            text="删除"
                            type="danger"
                            class="delete-button"
                            @click="deleteCar(ele.cartId)"
                        />
                    </template>
                </van-swipe-cell>
            </div>
        </div> 
        <div class="no-goods" v-if="shopCarList.length == 0 && isReady">
            <img src="../../assets/images/no-goods.png">
            <div class="att">购物车竟然是空的</div>
            <div class="same" @click="findSame">去逛逛</div>
        </div>
        <div class="sx-box" v-if="loseList.length > 0">
            <div class="sx-title">
                <div class="le">失效宝贝({{loseList.length}})件</div>
                <div class="ri" @click="clearSXGoods">
                    <img class="icon" src="../../assets/images/delete.png" />
                    <span>清空失效商品</span>
                </div>
            </div>
            <van-swipe-cell class="list-boxs" v-for="(item,index) in loseList" :key="index">
                <div class="list">
                    <div class="sx">失效</div>
                    <img class="goods-pic" :src="item.goodCover" />
                    <div class="goods-info">
                        <div class="t-box">
                            <div class="tit">
                                {{item.goodName}}
                            </div>
                        </div>
                        <div class="b-box">
                            <div>很抱歉，商品下架啦！</div>
                            <!-- <div class="same" @click="findSame">找相似</div> -->
                        </div>
                    </div>
                </div>
                <template #right>
                    <van-button
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"
                        @click="deleteCar(item.cartId,true)"
                    />
                </template>
            </van-swipe-cell>
        </div>
        <div class="ulike" v-if="goodGoodsList.length > 0">
            <div class="ulike-tit">
                <img class="ulike-icon" src="../../assets/images/star1.png" />
                <span class="f1">推荐商品</span>
                <span class="f2">猜你喜欢</span>
            </div>
            <ul class="li-box">
                <li class="li" v-for="(item,index) in goodGoodsList" :key="index" @click="goodsDetail(item)">
                    <img class="cover" :src="item.goodCover" />
                    <div class="in">
                        <div class="in-tit">
                            {{item.goodName}}
                        </div>
                        <div class="pri-box">
                            <div class="new-pri">
                                <span class="spe">¥</span>
                                <span>{{item.goodVipPrice}}</span>
                            </div>
                            <div class="old-pri">¥{{item.goodPrice}}</div>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- <div class="btm">我也是有底线的~</div> -->
        </div>
        <div class="btm-handle">
            <!-- <div class="tp">
                <div>满59可免运费</div>
                <div class="coudan">
                    <span>凑单免运费</span>
                    <img class="ic" src="" />
                </div>
            </div> -->
            <van-submit-bar
                :price="totalMoney"
                :button-text="totalCount > 0 ? '结算(' + totalCount + ')' : '结算'"
                :button-color="totalCount > 0 ? '#BA3627' : '#999999'"
                @submit="onSubmit"
            >
                <van-checkbox v-model="allChecked" checked-color="#BA3627" @click="allStoreChose"
                    >全选</van-checkbox
                >
            </van-submit-bar>
        </div>
        <Nav></Nav>
    </div>
</template>

<script>
import Vue from "vue";
import { SwipeCell, Button, SubmitBar, Checkbox, Toast, Skeleton } from "vant";

Vue.use(SwipeCell).use(Button).use(SubmitBar).use(Checkbox).use(Toast).use(Skeleton);

import Nav from '@/component/Nav';
import { getShopCarList, getLoseGoods, getGoodGoods, handleGoodsCount, changeChoseStatus, deleteGoods } from "@/services/goods.js";

export default {
    data() {
        return {
            shopCarList: [], // 购物车列表
            loseList: [], // 失效商品列表
            goodGoodsList: [], // 推荐商品列表
            totalMoney: 0, // 总价格
            totalCount: 0, // 商品数量
            allChecked: true,
            isReady: false
        };
    },
    components: {
        Nav
    },
    methods: {
        getList(){ // 获取购物车列表
            let data = {
                uid: window.localStorage.getItem('uid') || ''
            }
            getShopCarList(data).then(res => {
                if(res.code == 200){
                    let money = 0
                    let count = 0
                    this.shopCarList = res.rest || []
                    this.shopCarList.forEach((item,index) => {
                        item.data = item.data || []
                        item.allMoney ? money += item.allMoney : null
                        item.storechose = true
                        item.data.forEach((ele,idx) => {
                            if(ele.selected == 0){
                                item.storechose = false
                            }
                        })
                        count += item.data.filter((ele,idx) => {return ele.selected == 1}).length
                    })
                    this.allChecked = true
                    this.shopCarList.forEach((item,index) => {
                        if(!item.storechose){
                            this.allChecked = false
                        }
                    })
                    this.totalMoney = money * 100
                    this.totalCount = count
                    this.isReady = true
                }
            })
        },
        getLoseGoods(){ // 获取失效列表
            let data = {
                uid: window.localStorage.getItem('uid') || ''
            }
            getLoseGoods(data).then(res => {
                if(res.code == 200){
                    this.loseList = res.data
                }
            })
        },
        getGoodGoods(){ // 获取推荐商品
            getGoodGoods().then(res => {
                if(res.code == 200){
                    if(res.data){
                        res.data.goodinfo = res.data.goodinfo || []
                        this.goodGoodsList = res.data.goodinfo
                    }
                }
            })
        },
        changeCount(cartId,type,count){ // 处理商品数量
            if(type == 1 && count == 1){
                Toast('不能再减少了呦')
                return
            }
            let data = {
                cartId: cartId,
                type: type, // 0：增加 1：减少
                uid: window.localStorage.getItem('uid') || '',
                channelId: 0
            }
            handleGoodsCount(data).then(res => {
                if(res.status == 200){
                    this.getList()
                }
            })
        },
        handleStoreChose(idx){ // 改变单个店铺中的商品选中状态
            this.shopCarList.forEach((item,index) => {
                if(index == idx){
                    item.data.forEach((e,i) => {
                        let select = item.storechose ? 0 : 1
                        this.changeChosenStatus(e.cartId,select,e.channelId)
                    })
                }
            })
        },
        changeChosenStatus(cartId,type,channelId){ // 改变商品选中状态
            let data = {
                uid: window.localStorage.getItem('uid') || '',
                cartId: cartId,
                type: type,
                channelId: channelId
            }
            changeChoseStatus(data).then(res => {
                if(res.status == 200){
                    this.getList()
                }
            })
        },
        allStoreChose(){ // 点击底部全选
            if(this.allChecked){
                this.shopCarList.forEach((item,index) => {
                    item.data.forEach((e,i) => {
                        this.changeChosenStatus(e.cartId,1,e.channelId)
                    })
                })
            }else{
                this.shopCarList.forEach((item,index) => {
                    item.data.forEach((e,i) => {
                        this.changeChosenStatus(e.cartId,0,e.channelId)
                    })
                })
            }
        },
        onSubmit() {
            if(this.totalCount <= 0){
                return
            }
            let mk = []
            this.shopCarList.forEach((item,index) => {
                item.data.forEach((e,i) => {
                    if(e.selected == 1){
                        mk.push(e.cartId)
                    }
                })
            })
            mk = mk.join(',')
            this.$router.push('/placeCaroder?cartId=' + mk)
        },
        clearSXGoods(){ // 清空失效商品
            this.loseList.forEach((item,index) => {
                this.deleteCar(item.cartId,true)
            })
        },
        deleteCar(cartId,bol){ // 删除购物车商品
            let data = {
                uid: window.localStorage.getItem('uid') || '',
                cartId: cartId
            }
            deleteGoods(data).then(res => {
                if(res.status == 200){
                    Toast('删除成功')
                    if(bol){
                        this.getLoseGoods()
                    }else{
                        this.getList()
                    }
                }
            })
        },
        goodsDetail(obj){
            if(obj.activityId){
                this.$router.push('/goodsDetailZY?goodsId=' + obj.goodId + '&skuid=' + (obj.product_sku_id || obj.skuId) + '&activityId=' + obj.activityId)
            }else{
                this.$router.push('/goodsDetailZY?goodsId=' + obj.goodId + '&skuid=' + (obj.product_sku_id || obj.skuId))
            }
        },
        findSame(){
            this.$router.replace('/')
        }
    },
    created() {},
    mounted() {
        this.getList()
        this.getLoseGoods()
        this.getGoodGoods()
    }
};
</script>

<style lang="less" scoped>
.shop-car {
    min-height: 100vh;
    background: #f6f6f6;
    padding-top: 10px;
    padding-bottom: 110px;
    .list-box {
        width: 100%;
        padding: 20px 0px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 8px;
        margin-bottom: 10px;
        .store-title {
            display: flex;
            align-items: center;
            font-size: 15px;
            color: #141414;
            margin-bottom: 20px;
            padding: 0px 12px;
            box-sizing: border-box;
            .store-logo {
                width: 24px;
                height: 24px;
                margin-right: 8px;
            }
        }
        .list-boxs {
            margin-bottom: 30px;
        }
        .list-boxs:last-child {
            margin-bottom: 0;
        }
        .list {
            width: 100%;
            border-radius: 8px;
            padding: 0px 12px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            background: #fff;
            .mt20 {
                margin-top: 20px;
            }
            .goods-pic {
                width: 95px;
                height: 95px;
                border-radius: 5px;
                margin: 0 10px;
            }
            .goods-info {
                width: 213px;
                height: 95px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .t-box {
                    font-weight: 500;
                    text-align: left;
                    .tit {
                        width: 200px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #141414;
                        font-size: 13px;
                    }
                    .guige {
                        color: #666666;
                        font-size: 12px;
                        margin: 3px 0;
                    }
                    .miaosha {
                        width: 58px;
                        height: 15px;
                        line-height: 15px;
                        text-align: center;
                        color: #bb3627;
                        font-size: 10px;
                        border: 1px solid #bb3627;
                        border-radius: 4px;
                    }
                }
                .b-box {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-align: left;
                    .price-box {
                        .old-price {
                            color: #999;
                            font-size: 12px;
                            text-decoration: line-through;
                        }
                        .new-price {
                            color: #bb3627;
                            font-size: 17px;
                            .icon {
                                font-size: 12px;
                            }
                        }
                    }
                    .handle {
                        .edge {
                            display: inline-block;
                            width: 28px;
                            height: 28px;
                            text-align: center;
                            line-height: 28px;
                            color: #666;
                            background: #f6f6f6;
                        }
                        .count {
                            display: inline-block;
                            width: 39px;
                            height: 28px;
                            text-align: center;
                            line-height: 28px;
                            color: #141414;
                            background: #f6f6f6;
                            margin: 0 2px;
                        }
                        .add {
                            display: inline-block;
                            width: 28px;
                            height: 28px;
                            text-align: center;
                            line-height: 28px;
                            color: #666;
                            background: #f6f6f6;
                        }
                        .forbidden {
                            color: #ddd;
                        }
                    }
                }
            }
        }
    }
    .no-goods {
        padding-bottom: 15px;
        img {
            width: 400px;
            height: 400px;
            margin: 10px auto;
        }
        .att {
            font-size: 16px;
            color: #999;
        }
        .same {
            width: 100px;
            height: 24px;
            border-radius: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 24px;
            background: #bb3627;
            color: #fff;
            margin: 10px auto;
        }
    }
    .sx-box {
        width: 100%;
        padding: 20px 0px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 8px;
        .sx-title {
            width: 100%;
            box-sizing: border-box;
            padding: 0 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            margin-bottom: 20px;
            .le {
                color: #141414;
            }
            .ri {
                display: flex;
                align-items: center;
                color: #999999;
                .icon {
                    width: 14px;
                    height: 16px;
                    margin-right: 6px;
                }
            }
        }
        .list-boxs {
            margin-bottom: 20px;
        }
        .list-boxs:last-child {
            margin-bottom: 0;
        }
        .list {
            width: 100%;
            border-radius: 8px;
            padding: 12px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            background: #f8f8f8;
            .sx {
                width: 28px;
                height: 21px;
                font-size: 12px;
                color: #fff;
                background: #bdbdbd;
                text-align: center;
                line-height: 21px;
                margin-top: 30px;
                border-radius: 3px;
            }
            .goods-pic {
                width: 95px;
                height: 95px;
                border-radius: 5px;
                margin: 0 10px;
            }
            .goods-info {
                width: 213px;
                height: 95px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .t-box {
                    font-weight: 500;
                    text-align: left;
                    .tit {
                        width: 95%;
                        text-align: justify;
                        color: #999999;
                        font-size: 13px;
                    }
                }
                .b-box {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    text-align: left;
                    font-size: 13px;
                    color: #141414;
                    .same {
                        width: 50px;
                        height: 24px;
                        border-radius: 12px;
                        box-sizing: border-box;
                        text-align: center;
                        line-height: 24px;
                        color: #bb3627;
                        border: 1px solid #bb3627;
                    }
                }
            }
        }
    }
    .ulike {
        width: 100%;
        box-sizing: border-box;
        padding: 20px 12px 0 12px;
        .ulike-tit {
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .ulike-icon {
                width: 21px;
                height: 21px;
                margin-right: 10px;
            }
            .f1 {
                font-size: 17px;
                color: #141414;
                margin-right: 5px;
            }
            .f2 {
                color: #999999;
                font-size: 14px;
            }
        }
        .li-box {
            margin-bottom: 20px;
            overflow: hidden;
            .li {
                width: 172px;
                height: 265px;
                border-radius: 9px;
                overflow: hidden;
                float: left;
                margin-bottom: 7px;
                .cover {
                    width: 100%;
                    height: 172px;
                }
                .in {
                    width: 100%;
                    height: 93px;
                    box-sizing: border-box;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: #fff;
                    .in-tit {
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        font-size: 14px;
                        color: #141414;
                    }
                }
                .pri-box {
                    display: flex;
                    align-items: flex-end;
                    .new-pri {
                        font-size: 17px;
                        color: #bb3627;
                        margin-right: 5px;
                        .spe {
                            font-size: 13px;
                        }
                    }
                    .old-pri {
                        font-size: 13px;
                        color: #999999;
                        text-decoration: line-through;
                    }
                }
            }
            .li:nth-child(2n + 1) {
                margin-right: 7px;
            }
        }
        .btm {
            font-size: 13px;
            color: #999;
        }
    }
    .choose {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #dddddd;
        margin-right: 10px;
    }
    .choosen {
        border: none;
        background: url("../../assets/images/choose.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 10px;
    }
    .delete-button {
        height: 100%;
    }
    .van-submit-bar {
        position: fixed;
        bottom: 50px !important;
        left: 0;
    }
    .btm-handle {
        width: 100%;
        height: 83px;
        position: fixed;
        bottom: 50px;
        left: 0;
        z-index: 99;
        .tp {
            width: 100%;
            height: 34px;
            background: #f9f0dc;
            box-sizing: border-box;
            padding: 0 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #333333;
            .coudan {
                display: flex;
                align-items: center;
                color: #bf9536;
                .ic {
                    width: 7px;
                    height: 11px;
                    margin-left: 6px;
                }
            }
        }
    }
}
</style>
