<template>
    <div class="main">
        <!-- <div class="searchmain">
            <div class="searchdiv">
                <img src="../../assets/images/search.png" class="fangdajing">
                <input type="text" placeholder="搜索品牌优惠卷 优惠下单" class="searchinput">
                <form action="/">
                    <van-search
                            :left-icon="require('../../assets/images/search.png')"
                            v-model="searchValue"
                            shape="round"
                            placeholder="搜索品牌优惠卷 优惠下单"
                            @search="pddSearch"/>
                </form>
            </div>
        </div> -->
        <div class="circlediv">
            <div class="circle"></div>
            <div class="headimgdiv">
                <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
                    <van-swipe-item v-for="(val,index) in pddBannerList.bannerData" :key="index">
                        <img :src="val.image_url" alt="">
                    </van-swipe-item>
                </van-swipe>
                <!--<img :src="pddBannerList.bannerData[0].image_url" alt="" class="headimg" @click.prevent="jumpOutPdd">-->
            </div>
        </div>
        <van-tabs v-model="active"
                  title-active-color="#F30002"
                  title-inactive-color="#141F33"
                  color="red"
                  line-width="76px"
                  @change="changePddTab">
            <!--            (item.classData.id)-->
            <van-tab v-for="item in pddBannerList.classData" :title='item.opt_name'></van-tab>
        </van-tabs>

        <div class="goodsList">
            <pddListRow :pddListRowData="goodsDetail"
                        :goodsParams="goodsParams"
                        @sendPage="changePage"
                        v-if="goodsDetail && goodsParams"></pddListRow>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Tab, Tabs, Toast, List, Cell, Search, Swipe, SwipeItem} from 'vant';
    import pddListRow from '@/component/Goods/pddListRow';
    import {pddHomeIndex, pddHomeSearch} from '@/services/api';

    Vue.use(Tab).use(Tabs).use(Toast).use(List).use(Cell).use(Search).use(Swipe).use(SwipeItem);
    export default {
        name: 'pdd-list',
        data() {
            return {
                active: 0,
                pddBannerList: {},
                goodsDetail: [],
                goodsParams: {
                    id: '',
                    page: 1,
                    pageSize: 10,
                    loading: false,
                    finished: false,
                    error: false,
                },
                searchValue: '',//搜索关键字
            }
        },
        methods: {
            jumpOutPdd() {
                // location.href = this.pddBannerList.bannerData[0].link;
            },

            changePage(e) {
                this.goodsParams.page = e.nowPage;
                this.getPddDetailList(this.goodsParams.id);
            },


            //获取banner信息
            getPddInfo() {
                pddHomeIndex().then(res => {
                    if (res.code == 200) {
                        this.pddBannerList = res.data;
                        this.goodsParams.id = res.data.classData[0].opt_id;
                        this.getPddDetailList(this.goodsParams.id);
                    }
                })
            },


            //获取商品列表
            getPddDetailList(sendId) {
                this.goodsParams.id = sendId;
                let newParams = {
                    id: this.goodsParams.id,
                    page: this.goodsParams.page,
                    pageSize: this.goodsParams.pageSize
                }
                pddHomeSearch(newParams).then(res => {
                    if (res.code == 200) {
                        if (res.data.data === null) {//没数据则加载完毕
                            this.goodsParams.finished = true;
                            return
                        }
                        if (res.data.length < 1 || !res.data) {
                            this.goodsParams.finished = true;
                            return
                        } else {
                            this.goodsDetail = this.goodsDetail.concat(res.data);
                        }
                        this.goodsParams.loading = false;
                    }
                }).catch(error => {
                    // console.log(error);
                    this.goodsParams.error = true;
                }).finally(() => {
                    this.goodsParams.loading = false;
                })
            },

            //tab切换商品list
            changePddTab(index) {
                // console.log(this.active);
                this.goodsDetail = [];
                this.goodsParams.id = this.pddBannerList.classData[index].opt_id;
                this.goodsParams.page = 1;
                this.getPddDetailList(this.goodsParams.id);
            },

            //拼多多首页搜索
            pddSearch(val) {
                if (val.trim()) {
                    //存储搜索历史_丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅丅___________
                    const newKeyList = JSON.parse(window.localStorage.getItem('searchHistoryKey'));
                    this.searchHistoryList = newKeyList.length >= 1 ? newKeyList : [];
                    if (this.searchHistoryList.indexOf(val) < 0) {
                        this.searchHistoryList.unshift(val);
                        let localObj = JSON.stringify(this.searchHistoryList);
                        window.localStorage.setItem('searchHistoryKey', localObj)
                    }
                    //存储搜索历史_丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄丄___________
                    this.$router.push({
                        path: '/goodsList',
                        query: {
                            searchKeyword: val,
                            fromPage: 'pddList'
                        }
                    })
                }
            },


        },
        components: {
            pddListRow,
        },
        beforeMount() {
        },
        mounted() {
            this.getPddInfo();
        }
    }
</script>
<style lang="less" scoped>
    .main {
        background: #F6F6F6;
    }

    .searchmain {
        background: #E03022;
        padding: 10px 14px;
    }

    .searchdiv {
        width: 350px;
        height: 34px;
        border-radius: 17px;
        /*background: #F0F2F5;*/

        .van-search {
            background-color: #E03022;
            padding: 0;
            /*padding-bottom: 0;*/
        }
    }

    .van-icon__image {
        float: left;
        width: 20px;
        height: 20px;
        margin-top: 7px;
        margin-left: 5px;
    }

    .fangdajing {
        float: left;
        width: 20px;
        height: 20px;
        margin-top: 7px;
        margin-left: 5px;
    }

    .searchinput {
        float: left;
        font-size: 13px;
        color: #999999;
        height: 34px;
        line-height: 34px;
        width: 300px;
        background: #F0F2F5;
    }


    .circlediv {
        width: 100%;
        overflow: hidden;
        text-align: center;
        background: #F5F6FD;
        height: 174px;
        position: relative;
        /*background-color: darkcyan;*/
    }

    .circle {
        width: 140%;
        height: 50px;
        background: #E03022;
        border-radius: 0 0 50% 50%;
        border-top: none;
        position: relative;
        left: -20%;
    }

    .headimgdiv {
        position: absolute;
        width: 346px;
        height: 150px;
        border-radius: 8px;
        left: 50%;
        top: 50%;
        /*bottom: 17px;*/
        transform: translate(-50%, -50%);
        /*left: 14px;*/
        /*top: 10px;*/
        /*background: blue;*/
    }

    .my-swipe {
        border-radius: 8px;
        overflow: hidden;

    }

    .my-swipe .van-swipe-item {
        border-radius: 8px;
        overflow: hidden;

        img {
            border-radius: 8px;
        }
    }

    /*.headimg {*/
    /*    width: 346px;*/
    /*    height: 150px;*/
    /*    border-radius: 8px;*/
    /*}*/

    /deep/ .van-tabs__nav {
        background: #F5F6FD;
    }

    /deep/ .van-tab {
        position: relative;
    }

    /deep/ .van-tab::after {
        position: absolute;
        content: "";
        height: 45%;
        width: 2px;
        background: #D2D7E0;
        right: 0;
        top: 27%;
    }

    /deep/ .van-tabs__line {

    }


    .goodsList {
        margin-top: 10px;
        width: 375px;
    }
</style>