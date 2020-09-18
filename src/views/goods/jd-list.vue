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
                            @search="jdSearch"/>
                </form>
            </div>
        </div> -->
        <div class="circlediv">
            <div class="circle"></div>
            <div class="headimgdiv">
                <img :src="jdBannerList.bannerData[0].img_url" alt="" class="headimg" @click.prevent="jumpOutJd">
            </div>
        </div>
        <van-tabs v-model="active"
                  title-active-color="#F30002"
                  title-inactive-color="#141F33"
                  color="red"
                  line-width="76px"
                  @change="changeJdTab">
            <!--            (item.classData.id)-->
            <van-tab v-for="item in jdBannerList.classData" :title='item.class_name'></van-tab>
        </van-tabs>

        <div class="goodsList">
            <JdListRow :JdListRowData="goodsDetail"
                       :goodsParams="goodsParams"
                       @sendPage="changePage"
                       v-if="goodsDetail && goodsParams"></JdListRow>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Tab, Tabs, Toast, List, Cell, Search} from 'vant';
    import JdListRow from '@/component/Goods/jdListRow';
    import {jdHomeIndex, jdHomeSearch} from '@/services/api';

    Vue.use(Tab).use(Tabs).use(Toast).use(List).use(Cell).use(Search);
    export default {
        name: 'jd-list',
        data() {
            return {
                active: 0,
                jdBannerList: {},
                goodsDetail: [],
                goodsParams: {
                    classId: '',
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
            jumpOutJd() {
                location.href = this.jdBannerList.bannerData[0].link;
            },
            getJdInfo() {
                jdHomeIndex().then(res => {
                    if (res.code == 200) {
                        this.jdBannerList = res.data;
                        this.goodsParams.classId = res.data.classData[0].id;
                        this.getJdDetailList(this.goodsParams.classId);
                    }
                })
            },

            //获取商品列表
            getJdDetailList(sendId) {
                this.goodsParams.classId = sendId;
                let newParams = {
                    classId: this.goodsParams.classId,
                    page: this.goodsParams.page,
                    pageSize: this.goodsParams.pageSize
                }
                jdHomeSearch(newParams).then(res => {
                    if (res.code == 200) {
                        if (res.data === null) {//没数据则加载完毕
                            this.goodsParams.finished = true;
                            return
                        }
                        if (res.data.length < 1 || !res.data) {
                            this.goodsParams.finished = true;
                            return
                        } else {
                            this.goodsDetail = this.goodsDetail.concat(res.data);
                        }
                        // this.goodsDetail = res.data;
                        // this.goodsParams.loading = false;
                    }
                }).catch(error => {
                    this.goodsParams.error = true;
                }).finally(() => {
                    this.goodsParams.loading = false;
                })
            },

            changePage(e) {
                this.goodsParams.page = e.nowPage;
                this.getJdDetailList(this.goodsParams.classId);
            },

            //tab切换商品list
            changeJdTab(index) {
                this.goodsDetail = [];
                this.goodsParams.classId = this.jdBannerList.classData[index].id;
                this.goodsParams.page = 1;
                this.getJdDetailList(this.goodsParams.classId);
            },

            //京东首页搜索
            jdSearch(val) {
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
                            fromPage: 'jdList'
                        }
                    })
                }
            },


        },
        components: {
            JdListRow,
        },
        beforeMount() {
        },
        mounted() {
            this.getJdInfo();
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
        /*background-color: black;*/

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
        /*float: left;*/
        position: absolute;
        top: 9px;
        left: 12px;
        width: 20px;
        height: 20px;
        /*margin-top: 7px;*/
        /*margin-left: 5px;*/
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
        height: 170px;
        position: relative;
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /*left: 14px;*/
        /*top: 10px;*/
        /*background: blue;*/
    }

    .headimg {
        width: 346px;
        height: 150px;
        border-radius: 8px;
    }

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